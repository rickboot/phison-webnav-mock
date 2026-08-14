import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export type SharedNavMeta = {
  id: string;
  name: string;
  createdAt: string;
};

export type SharedNavRecord = SharedNavMeta & {
  outline: string;
};

type FileStore = {
  index: SharedNavMeta[];
  outlines: Record<string, string>;
};

const INDEX_KEY = "phison:nav:index";
const outlineKey = (id: string) => `phison:nav:outline:${id}`;
const FILE_STORE_PATH = path.join(process.cwd(), ".data", "shared-navs.json");

export const RESERVED_NAV_IDS = new Set(["current", "rick", "custom"]);

export function slugifyNavName(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "nav";
}

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Redis preferred; local `.data/` file when not on Vercel and Redis unset. */
function useFileStore(): boolean {
  return !getRedis() && process.env.VERCEL !== "1";
}

export function isSharedNavStoreConfigured(): boolean {
  return getRedis() !== null || useFileStore();
}

async function readFileStore(): Promise<FileStore> {
  try {
    const raw = await fs.readFile(FILE_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as FileStore;
    return {
      index: parsed.index || [],
      outlines: parsed.outlines || {},
    };
  } catch {
    return { index: [], outlines: {} };
  }
}

async function writeFileStore(store: FileStore): Promise<void> {
  await fs.mkdir(path.dirname(FILE_STORE_PATH), { recursive: true });
  await fs.writeFile(FILE_STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function listSharedNavs(): Promise<SharedNavMeta[]> {
  const redis = getRedis();
  if (redis) {
    const index = (await redis.get<SharedNavMeta[]>(INDEX_KEY)) || [];
    return [...index].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (useFileStore()) {
    const store = await readFileStore();
    return [...store.index].sort((a, b) => a.name.localeCompare(b.name));
  }
  return [];
}

export async function getSharedNav(
  id: string,
): Promise<SharedNavRecord | null> {
  const redis = getRedis();
  if (redis) {
    const outline = await redis.get<string>(outlineKey(id));
    if (outline == null) return null;
    const index = (await redis.get<SharedNavMeta[]>(INDEX_KEY)) || [];
    const meta = index.find((n) => n.id === id);
    if (!meta) {
      return {
        id,
        name: id,
        createdAt: new Date(0).toISOString(),
        outline,
      };
    }
    return { ...meta, outline };
  }

  if (useFileStore()) {
    const store = await readFileStore();
    const outline = store.outlines[id];
    if (outline == null) return null;
    const meta = store.index.find((n) => n.id === id);
    return {
      id,
      name: meta?.name || id,
      createdAt: meta?.createdAt || new Date(0).toISOString(),
      outline,
    };
  }

  return null;
}

export type CreateSharedNavResult =
  | { ok: true; nav: SharedNavRecord }
  | { ok: false; status: 409 | 400 | 503; message: string };

export async function createSharedNav(
  name: string,
  outline: string,
): Promise<CreateSharedNavResult> {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 60) {
    return {
      ok: false,
      status: 400,
      message: "Name must be 1–60 characters",
    };
  }

  const id = slugifyNavName(trimmed);
  if (RESERVED_NAV_IDS.has(id)) {
    return {
      ok: false,
      status: 409,
      message: `“${trimmed}” is reserved. Choose another name.`,
    };
  }

  const redis = getRedis();
  if (redis) {
    const index = (await redis.get<SharedNavMeta[]>(INDEX_KEY)) || [];
    if (index.some((n) => n.id === id)) {
      return {
        ok: false,
        status: 409,
        message: `A shared nav named “${trimmed}” already exists. Choose a new name.`,
      };
    }
    const existing = await redis.get(outlineKey(id));
    if (existing != null) {
      return {
        ok: false,
        status: 409,
        message: `A shared nav named “${trimmed}” already exists. Choose a new name.`,
      };
    }

    const createdAt = new Date().toISOString();
    const meta: SharedNavMeta = { id, name: trimmed, createdAt };
    await redis.set(outlineKey(id), outline);
    await redis.set(INDEX_KEY, [...index, meta]);
    return { ok: true, nav: { ...meta, outline } };
  }

  if (useFileStore()) {
    const store = await readFileStore();
    if (store.index.some((n) => n.id === id) || store.outlines[id] != null) {
      return {
        ok: false,
        status: 409,
        message: `A shared nav named “${trimmed}” already exists. Choose a new name.`,
      };
    }
    const createdAt = new Date().toISOString();
    const meta: SharedNavMeta = { id, name: trimmed, createdAt };
    store.index.push(meta);
    store.outlines[id] = outline;
    await writeFileStore(store);
    return { ok: true, nav: { ...meta, outline } };
  }

  return {
    ok: false,
    status: 503,
    message:
      "Shared nav storage is not configured. Add Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) on Vercel.",
  };
}
