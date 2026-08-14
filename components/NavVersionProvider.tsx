"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  defaultNavVersionId,
  getNavVersion,
  isBuiltinNavVersionId,
  navVersions,
  normalizeNavVersionId,
  type NavVersionConfig,
  type NavVersionId,
} from "@/data/nav-versions";
import {
  buildShareUrl,
  DEFAULT_CUSTOM_OUTLINE,
  parseNavOutline,
  readOutlineFromLocationHash,
  readStoredOutline,
  writeStoredOutline,
  type ParseResult,
} from "@/lib/nav-outline";
import type { SharedNavMeta } from "@/lib/shared-navs";

const STORAGE_KEY = "phison-nav-version";
const OUTLINE_EVENT = "phison-nav-outline";
const VERSION_EVENT = "phison-nav-version";
const SHARED_CACHE_PREFIX = "phison-nav-shared:";

type NavVersionContextValue = {
  versionId: NavVersionId;
  version: NavVersionConfig;
  versions: NavVersionConfig[];
  setVersionId: (id: NavVersionId) => void;
  selectVersion: (id: NavVersionId) => Promise<void>;
  outline: string;
  editorOpen: boolean;
  setEditorOpen: (open: boolean) => void;
  applyOutline: (text: string) => ParseResult;
  saveSharedNav: (
    name: string,
    outline: string,
  ) => Promise<{ ok: true; id: string } | { ok: false; message: string }>;
  deleteSharedNav: (
    id: string,
  ) => Promise<{ ok: true } | { ok: false; message: string }>;
  getShareUrl: (text: string) => string;
  sharedConfigured: boolean;
  sharedLoading: boolean;
  refreshSharedNavs: () => Promise<void>;
};

const NavVersionContext = createContext<NavVersionContextValue | null>(null);

function consumeShareHashOnce(): void {
  if (typeof window === "undefined") return;
  const fromHash = readOutlineFromLocationHash(window.location.hash);
  if (fromHash == null) return;

  const flagKey = "phison-nav-hash-consumed";
  try {
    if (sessionStorage.getItem(flagKey) === window.location.hash) return;
    sessionStorage.setItem(flagKey, window.location.hash);
  } catch {
    /* ignore */
  }

  writeStoredOutline(fromHash);
  try {
    localStorage.setItem(STORAGE_KEY, "custom");
  } catch {
    /* ignore */
  }
}

function readStoredVersion(): NavVersionId {
  consumeShareHashOnce();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const normalized = normalizeNavVersionId(raw);
    if (normalized) {
      if (raw !== normalized) localStorage.setItem(STORAGE_KEY, normalized);
      return normalized;
    }
    if (raw) localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return defaultNavVersionId;
}

function readOutlineSnapshot(): string {
  consumeShareHashOnce();
  return readStoredOutline();
}

function subscribeVersion(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(VERSION_EVENT, handler);
  window.addEventListener(OUTLINE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(VERSION_EVENT, handler);
    window.removeEventListener(OUTLINE_EVENT, handler);
  };
}

function subscribeOutline(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(OUTLINE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(OUTLINE_EVENT, handler);
  };
}

function buildCustomConfig(outline: string): NavVersionConfig {
  const result = parseNavOutline(outline);
  if (result.ok) {
    return {
      id: "custom",
      label: "Custom",
      description: "Local draft",
      sections: result.parsed.sections,
      showHome: result.parsed.showHome,
    };
  }
  return {
    id: "custom",
    label: "Custom",
    description: "Edit outline, then Apply",
    sections: [],
    showHome: false,
  };
}

function buildSharedConfig(
  meta: SharedNavMeta,
  outline: string | null,
): NavVersionConfig {
  if (outline) {
    const result = parseNavOutline(outline);
    if (result.ok) {
      return {
        id: meta.id,
        label: meta.name,
        description: "Shared library",
        sections: result.parsed.sections,
        showHome: result.parsed.showHome,
        shared: true,
      };
    }
  }
  return {
    id: meta.id,
    label: meta.name,
    description: "Shared library",
    sections: [],
    showHome: false,
    shared: true,
  };
}

function readCachedSharedOutline(id: string): string | null {
  try {
    return localStorage.getItem(SHARED_CACHE_PREFIX + id);
  } catch {
    return null;
  }
}

function writeCachedSharedOutline(id: string, outline: string) {
  try {
    localStorage.setItem(SHARED_CACHE_PREFIX + id, outline);
  } catch {
    /* ignore */
  }
}

function clearCachedSharedOutline(id: string) {
  try {
    localStorage.removeItem(SHARED_CACHE_PREFIX + id);
  } catch {
    /* ignore */
  }
}

export function NavVersionProvider({ children }: { children: React.ReactNode }) {
  const versionId = useSyncExternalStore(
    subscribeVersion,
    readStoredVersion,
    () => defaultNavVersionId,
  );

  const outline = useSyncExternalStore(
    subscribeOutline,
    readOutlineSnapshot,
    () => DEFAULT_CUSTOM_OUTLINE,
  );

  const [editorOpen, setEditorOpen] = useState(false);
  const [sharedMeta, setSharedMeta] = useState<SharedNavMeta[]>([]);
  const [sharedOutlines, setSharedOutlines] = useState<Record<string, string>>(
    {},
  );
  const [sharedConfigured, setSharedConfigured] = useState(false);
  const [sharedLoading, setSharedLoading] = useState(true);

  const refreshSharedNavs = useCallback(async () => {
    try {
      const res = await fetch(`/api/navs?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) {
        setSharedConfigured(false);
        return;
      }
      const data = (await res.json()) as {
        navs: SharedNavMeta[];
        configured: boolean;
      };
      setSharedConfigured(data.configured);
      setSharedMeta(data.navs || []);
    } catch {
      setSharedConfigured(false);
    } finally {
      setSharedLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSharedNavs();
  }, [refreshSharedNavs]);

  const setVersionId = useCallback((id: NavVersionId) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(VERSION_EVENT));
  }, []);

  const loadSharedOutline = useCallback(async (id: string) => {
    const cached = readCachedSharedOutline(id);
    if (cached) {
      setSharedOutlines((prev) => ({ ...prev, [id]: cached }));
    }
    try {
      const res = await fetch(`/api/navs/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as { nav: { outline: string } };
      writeCachedSharedOutline(id, data.nav.outline);
      setSharedOutlines((prev) => ({ ...prev, [id]: data.nav.outline }));
    } catch {
      /* ignore */
    }
  }, []);

  const selectVersion = useCallback(
    async (id: NavVersionId) => {
      setVersionId(id);
      if (!isBuiltinNavVersionId(id) && id !== "custom") {
        await loadSharedOutline(id);
      }
    },
    [setVersionId, loadSharedOutline],
  );

  useEffect(() => {
    if (!isBuiltinNavVersionId(versionId) && versionId !== "custom") {
      void loadSharedOutline(versionId);
    }
  }, [versionId, loadSharedOutline]);

  const applyOutline = useCallback(
    (text: string): ParseResult => {
      const result = parseNavOutline(text);
      if (!result.ok) return result;
      writeStoredOutline(text);
      window.dispatchEvent(new Event(OUTLINE_EVENT));
      setVersionId("custom");
      return result;
    },
    [setVersionId],
  );

  const saveSharedNav = useCallback(
    async (name: string, text: string) => {
      const parsed = parseNavOutline(text);
      if (!parsed.ok) {
        return {
          ok: false as const,
          message: parsed.errors[0]
            ? `Line ${parsed.errors[0].line}: ${parsed.errors[0].message}`
            : "Invalid outline",
        };
      }

      try {
        const res = await fetch("/api/navs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, outline: text }),
        });
        const data = (await res.json()) as {
          message?: string;
          nav?: { id: string; name: string; outline: string; createdAt: string };
        };
        if (!res.ok || !data.nav) {
          return {
            ok: false as const,
            message: data.message || "Could not save shared nav",
          };
        }

        writeStoredOutline(text);
        window.dispatchEvent(new Event(OUTLINE_EVENT));
        writeCachedSharedOutline(data.nav.id, data.nav.outline);
        setSharedOutlines((prev) => ({
          ...prev,
          [data.nav!.id]: data.nav!.outline,
        }));
        // Optimistic: show in dropdown immediately (don't wait on list fetch)
        setSharedMeta((prev) => {
          if (prev.some((n) => n.id === data.nav!.id)) return prev;
          return [
            ...prev,
            {
              id: data.nav!.id,
              name: data.nav!.name,
              createdAt: data.nav!.createdAt,
            },
          ];
        });
        setVersionId(data.nav.id);
        void refreshSharedNavs();
        return { ok: true as const, id: data.nav.id };
      } catch {
        return {
          ok: false as const,
          message: "Network error while saving shared nav",
        };
      }
    },
    [refreshSharedNavs, setVersionId],
  );

  const deleteSharedNav = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/navs/${encodeURIComponent(id)}`, {
          method: "DELETE",
          cache: "no-store",
        });
        const data = (await res.json()) as { message?: string };
        if (!res.ok) {
          return {
            ok: false as const,
            message: data.message || "Could not delete shared nav",
          };
        }
        clearCachedSharedOutline(id);
        setSharedMeta((prev) => prev.filter((n) => n.id !== id));
        setSharedOutlines((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        if (versionId === id) setVersionId("current");
        void refreshSharedNavs();
        return { ok: true as const };
      } catch {
        return {
          ok: false as const,
          message: "Network error while deleting shared nav",
        };
      }
    },
    [refreshSharedNavs, setVersionId, versionId],
  );

  const getShareUrl = useCallback((text: string) => {
    if (typeof window === "undefined") return "";
    return buildShareUrl(
      text,
      window.location.origin,
      window.location.pathname,
    );
  }, []);

  const customConfig = useMemo(() => buildCustomConfig(outline), [outline]);

  const sharedConfigs = useMemo(
    () =>
      sharedMeta.map((meta) =>
        buildSharedConfig(
          meta,
          sharedOutlines[meta.id] ?? readCachedSharedOutline(meta.id),
        ),
      ),
    [sharedMeta, sharedOutlines],
  );

  const versions = useMemo(() => {
    const builtins = navVersions.map((v) =>
      v.id === "custom" ? customConfig : v,
    );
    // Current, Rick, shared…, Custom last
    const head = builtins.filter((v) => v.id !== "custom");
    const custom = builtins.find((v) => v.id === "custom")!;
    return [...head, ...sharedConfigs, custom];
  }, [customConfig, sharedConfigs]);

  const version = useMemo(() => {
    if (versionId === "custom") return customConfig;
    if (isBuiltinNavVersionId(versionId)) return getNavVersion(versionId);
    return (
      sharedConfigs.find((v) => v.id === versionId) ||
      buildSharedConfig(
        { id: versionId, name: versionId, createdAt: "" },
        sharedOutlines[versionId] ?? readCachedSharedOutline(versionId),
      )
    );
  }, [versionId, customConfig, sharedConfigs, sharedOutlines]);

  const value = useMemo(
    () => ({
      versionId,
      version,
      versions,
      setVersionId,
      selectVersion,
      outline,
      editorOpen,
      setEditorOpen,
      applyOutline,
      saveSharedNav,
      deleteSharedNav,
      getShareUrl,
      sharedConfigured,
      sharedLoading,
      refreshSharedNavs,
    }),
    [
      versionId,
      version,
      versions,
      setVersionId,
      selectVersion,
      outline,
      editorOpen,
      applyOutline,
      saveSharedNav,
      deleteSharedNav,
      getShareUrl,
      sharedConfigured,
      sharedLoading,
      refreshSharedNavs,
    ],
  );

  return (
    <NavVersionContext.Provider value={value}>
      {children}
    </NavVersionContext.Provider>
  );
}

export function useNavVersion() {
  const ctx = useContext(NavVersionContext);
  if (!ctx) {
    throw new Error("useNavVersion must be used within NavVersionProvider");
  }
  return ctx;
}
