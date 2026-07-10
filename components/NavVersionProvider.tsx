"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  defaultNavVersionId,
  getNavVersion,
  navVersions,
  type NavVersionConfig,
  type NavVersionId,
} from "@/data/nav-versions";

const STORAGE_KEY = "phison-nav-version";

type NavVersionContextValue = {
  versionId: NavVersionId;
  version: NavVersionConfig;
  versions: NavVersionConfig[];
  setVersionId: (id: NavVersionId) => void;
};

const NavVersionContext = createContext<NavVersionContextValue | null>(null);

function isValidVersionId(id: string | null): id is NavVersionId {
  return !!id && navVersions.some((v) => v.id === id);
}

function readStoredVersion(): NavVersionId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidVersionId(stored)) return stored;
    // Drop unrecognized / legacy ids (e.g. old "new1" / "new2")
    if (stored) localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return defaultNavVersionId;
}

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("phison-nav-version", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("phison-nav-version", handler);
  };
}

export function NavVersionProvider({ children }: { children: React.ReactNode }) {
  const versionId = useSyncExternalStore(
    subscribe,
    readStoredVersion,
    () => defaultNavVersionId
  );

  const setVersionId = useCallback((id: NavVersionId) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event("phison-nav-version"));
  }, []);

  const value = useMemo(
    () => ({
      versionId,
      version: getNavVersion(versionId),
      versions: navVersions,
      setVersionId,
    }),
    [versionId, setVersionId]
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
