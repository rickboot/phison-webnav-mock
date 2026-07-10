import type { NavGroup, NavItem, NavSection } from "@/data/nav";
import { rick1 } from "@/data/nav-versions";

export const CUSTOM_OUTLINE_STORAGE_KEY = "phison-nav-custom-outline";
export const NAV_SHARE_HASH_PREFIX = "nav=";

export function sectionsToOutline(sections: NavSection[], showHome = false): string {
  const pad = (level: number) => "\t".repeat(level);
  const lines: string[] = [];
  if (showHome) lines.push("Home");

  for (const section of sections) {
    lines.push(section.label);
    if (section.linkOnly) continue;

    if (section.items?.length) {
      for (const item of section.items) {
        lines.push(`${pad(1)}${item.label}`);
      }
      continue;
    }

    if (section.groups?.length) {
      for (const group of section.groups) {
        lines.push(`${pad(1)}${group.title}`);
        for (const item of group.items) {
          lines.push(`${pad(2)}${item.label}`);
        }
      }
    }
  }

  return lines.join("\n") + "\n";
}

/** First-use Custom outline — seeded from Rick 1. */
export const DEFAULT_CUSTOM_OUTLINE =
  `# Custom nav (seeded from Rick 1 — Storage + AI Solutions)
# Indent with Tab. Up to 3 levels. Lines starting with # are comments.
# A top-level "Home" adds a Home link. Edit, then Apply.
#
` + sectionsToOutline(rick1, true);

/** @deprecated use DEFAULT_CUSTOM_OUTLINE */
export const EMPTY_OUTLINE_STARTER = DEFAULT_CUSTOM_OUTLINE;

type OutlineNode = {
  label: string;
  line: number;
  children: OutlineNode[];
};

export type ParseError = {
  line: number;
  message: string;
};

export type ParsedCustomNav = {
  sections: NavSection[];
  showHome: boolean;
};

export type ParseResult =
  | { ok: true; parsed: ParsedCustomNav; outline: string }
  | { ok: false; errors: ParseError[] };

function slugify(label: string): string {
  const base = label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "section";
}

function leaf(label: string): NavItem {
  return { label, href: "#", description: "" };
}

function uniqueIds(labels: string[]): string[] {
  const seen = new Map<string, number>();
  return labels.map((label) => {
    const base = slugify(label);
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}

/** Leading indent: tabs preferred (1 tab = 1 level). Spaces also work with any consistent width. */
function measureLeading(raw: string): {
  tabs: number;
  spaces: number;
  contentIndex: number;
} {
  let i = 0;
  let tabs = 0;
  let spaces = 0;
  while (raw[i] === "\t") {
    tabs += 1;
    i += 1;
  }
  while (raw[i] === " ") {
    spaces += 1;
    i += 1;
  }
  return { tabs, spaces, contentIndex: i };
}

function detectSpaceUnit(spaceWidths: number[]): number {
  const positives = spaceWidths.filter((n) => n > 0);
  if (positives.length === 0) return 2;
  return Math.min(...positives);
}

function buildTree(lines: { line: number; level: number; label: string }[]): {
  roots: OutlineNode[];
  errors: ParseError[];
} {
  const errors: ParseError[] = [];
  const roots: OutlineNode[] = [];
  const stack: { level: number; node: OutlineNode }[] = [];

  for (const row of lines) {
    if (row.level > 2) {
      errors.push({
        line: row.line,
        message: "Maximum depth is 3 (section → group → item)",
      });
      continue;
    }

    while (stack.length && stack[stack.length - 1].level >= row.level) {
      stack.pop();
    }

    if (row.level > 0) {
      const parent = stack[stack.length - 1];
      if (!parent || parent.level !== row.level - 1) {
        errors.push({
          line: row.line,
          message: "Skipped indent level — check nesting",
        });
        continue;
      }
    }

    const node: OutlineNode = { label: row.label, line: row.line, children: [] };
    if (row.level === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }
    stack.push({ level: row.level, node });
  }

  return { roots, errors };
}

function sectionFromNode(node: OutlineNode, id: string): NavSection {
  const { label, children } = node;

  if (children.length === 0) {
    return {
      id,
      label,
      href: "#",
      landingDescription: "",
      linkOnly: true,
    };
  }

  const hasGrandchildren = children.some((c) => c.children.length > 0);

  if (!hasGrandchildren) {
    return {
      id,
      label,
      href: "#",
      landingDescription: "",
      items: children.map((c) => leaf(c.label)),
    };
  }

  const groups: NavGroup[] = children.map((c) => {
    if (c.children.length === 0) {
      return { title: c.label, items: [] };
    }
    return {
      title: c.label,
      items: c.children.map((g) => leaf(g.label)),
    };
  });

  return {
    id,
    label,
    href: "#",
    landingDescription: "",
    groups,
  };
}

export function parseNavOutline(text: string): ParseResult {
  const errors: ParseError[] = [];
  const pending: {
    line: number;
    tabs: number;
    spaces: number;
    label: string;
  }[] = [];

  const rawLines = text.replace(/\r\n/g, "\n").split("\n");
  rawLines.forEach((raw, i) => {
    const line = i + 1;
    const trimmedRight = raw.replace(/\s+$/, "");
    if (!trimmedRight.trim()) return;
    if (trimmedRight.trimStart().startsWith("#")) return;

    const { tabs, spaces, contentIndex } = measureLeading(trimmedRight);
    const label = trimmedRight.slice(contentIndex).trim();
    if (!label) return;

    if (tabs > 0 && spaces > 0) {
      errors.push({
        line,
        message: "Don't mix tabs and spaces on the same line",
      });
      return;
    }

    pending.push({ line, tabs, spaces, label });
  });

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  if (pending.length === 0) {
    return {
      ok: false,
      errors: [
        {
          line: 1,
          message: "Add at least one top-level section (or uncomment the examples)",
        },
      ],
    };
  }

  const spaceOnly = pending.filter((p) => p.tabs === 0);
  const spaceUnit = detectSpaceUnit(spaceOnly.map((p) => p.spaces));

  const rows: { line: number; level: number; label: string }[] = [];
  for (const p of pending) {
    if (p.tabs > 0) {
      rows.push({ line: p.line, level: p.tabs, label: p.label });
      continue;
    }
    if (p.spaces % spaceUnit !== 0) {
      errors.push({
        line: p.line,
        message: `Indent with Tab (preferred), or consistent spaces (multiples of ${spaceUnit})`,
      });
      continue;
    }
    rows.push({ line: p.line, level: p.spaces / spaceUnit, label: p.label });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const { roots, errors: treeErrors } = buildTree(rows);
  errors.push(...treeErrors);

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  let showHome = false;
  const sectionNodes: OutlineNode[] = [];
  for (const root of roots) {
    if (root.label.toLowerCase() === "home" && root.children.length === 0) {
      showHome = true;
      continue;
    }
    if (root.label.toLowerCase() === "home" && root.children.length > 0) {
      errors.push({
        line: root.line,
        message: '"Home" cannot have nested items — use it as a top-level link only',
      });
      continue;
    }
    sectionNodes.push(root);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  if (!showHome && sectionNodes.length === 0) {
    return {
      ok: false,
      errors: [{ line: 1, message: "Custom nav needs at least one section" }],
    };
  }

  const ids = uniqueIds(sectionNodes.map((n) => n.label));
  const sections = sectionNodes.map((n, i) => sectionFromNode(n, ids[i]));

  return {
    ok: true,
    outline: text,
    parsed: {
      sections,
      showHome,
    },
  };
}

export function encodeOutlineForShare(outline: string): string {
  const bytes = new TextEncoder().encode(outline);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const b64 =
    typeof btoa !== "undefined"
      ? btoa(binary)
      : Buffer.from(outline, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeOutlineFromShare(encoded: string): string | null {
  try {
    const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    const binary =
      typeof atob !== "undefined"
        ? atob(b64 + pad)
        : Buffer.from(b64 + pad, "base64").toString("binary");
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function readOutlineFromLocationHash(hash: string): string | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw.startsWith(NAV_SHARE_HASH_PREFIX)) return null;
  return decodeOutlineFromShare(raw.slice(NAV_SHARE_HASH_PREFIX.length));
}

export function buildShareUrl(outline: string, origin: string, pathname: string): string {
  return `${origin}${pathname}#${NAV_SHARE_HASH_PREFIX}${encodeOutlineForShare(outline)}`;
}

export function readStoredOutline(): string {
  try {
    const stored = localStorage.getItem(CUSTOM_OUTLINE_STORAGE_KEY);
    if (stored != null) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_CUSTOM_OUTLINE;
}

export function writeStoredOutline(outline: string) {
  try {
    localStorage.setItem(CUSTOM_OUTLINE_STORAGE_KEY, outline);
  } catch {
    /* ignore */
  }
}
