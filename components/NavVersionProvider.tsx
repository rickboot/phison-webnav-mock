"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  defaultNavVersionId,
  getNavVersion,
  navVersions,
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

const STORAGE_KEY = "phison-nav-version";
const OUTLINE_EVENT = "phison-nav-outline";
const VERSION_EVENT = "phison-nav-version";

type NavVersionContextValue = {
  versionId: NavVersionId;
  version: NavVersionConfig;
  versions: NavVersionConfig[];
  setVersionId: (id: NavVersionId) => void;
  outline: string;
  editorOpen: boolean;
  setEditorOpen: (open: boolean) => void;
  applyOutline: (text: string) => ParseResult;
  getShareUrl: (text: string) => string;
};

const NavVersionContext = createContext<NavVersionContextValue | null>(null);

function isValidVersionId(id: string | null): id is NavVersionId {
  return !!id && navVersions.some((v) => v.id === id);
}

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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidVersionId(stored)) return stored;
    if (stored) localStorage.removeItem(STORAGE_KEY);
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
      description: "Your outline",
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

export function NavVersionProvider({ children }: { children: React.ReactNode }) {
  const versionId = useSyncExternalStore(
    subscribeVersion,
    readStoredVersion,
    () => defaultNavVersionId
  );

  const outline = useSyncExternalStore(
    subscribeOutline,
    readOutlineSnapshot,
    () => DEFAULT_CUSTOM_OUTLINE
  );

  const [editorOpen, setEditorOpen] = useState(false);

  const setVersionId = useCallback((id: NavVersionId) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(VERSION_EVENT));
  }, []);

  const applyOutline = useCallback(
    (text: string): ParseResult => {
      const result = parseNavOutline(text);
      if (!result.ok) return result;
      writeStoredOutline(text);
      window.dispatchEvent(new Event(OUTLINE_EVENT));
      setVersionId("custom");
      return result;
    },
    [setVersionId]
  );

  const getShareUrl = useCallback((text: string) => {
    if (typeof window === "undefined") return "";
    return buildShareUrl(text, window.location.origin, window.location.pathname);
  }, []);

  const customConfig = useMemo(() => buildCustomConfig(outline), [outline]);

  const versions = useMemo(
    () => navVersions.map((v) => (v.id === "custom" ? customConfig : v)),
    [customConfig]
  );

  const version = useMemo(() => {
    if (versionId === "custom") return customConfig;
    return getNavVersion(versionId);
  }, [versionId, customConfig]);

  const value = useMemo(
    () => ({
      versionId,
      version,
      versions,
      setVersionId,
      outline,
      editorOpen,
      setEditorOpen,
      applyOutline,
      getShareUrl,
    }),
    [
      versionId,
      version,
      versions,
      setVersionId,
      outline,
      editorOpen,
      applyOutline,
      getShareUrl,
    ]
  );

  return (
    <NavVersionContext.Provider value={value}>{children}</NavVersionContext.Provider>
  );
}

export function useNavVersion() {
  const ctx = useContext(NavVersionContext);
  if (!ctx) {
    throw new Error("useNavVersion must be used within NavVersionProvider");
  }
  return ctx;
}
