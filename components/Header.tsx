"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavVersionId } from "@/data/nav-versions";
import { useNavVersion } from "./NavVersionProvider";
import MegaMenu from "./MegaMenu";
import NavEditorPanel from "./NavEditorPanel";
import { utilityNav } from "@/data/nav";

export default function Header() {
  const {
    version,
    versions,
    versionId,
    setVersionId,
    editorOpen,
    setEditorOpen,
  } = useNavVersion();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [versionOpen, setVersionOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const versionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const topNav = version.sections;

  const openMenu = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(id);
    setVersionOpen(false);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) {
        setVersionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setVersionOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const activeSection = topNav.find((s) => s.id === activeMenu);

  const selectVersion = (id: NavVersionId) => {
    setVersionId(id);
    setVersionOpen(false);
    setActiveMenu(null);
    setMobileSection(null);
  };

  return (
    <>
      {activeMenu && (
        <div
          className="nav-overlay fixed inset-0 bg-black/20 z-40 hidden lg:block"
          style={{ top: "90px" }}
          onClick={() => setActiveMenu(null)}
          aria-hidden
        />
      )}

      <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-phison-border">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <Image
              src="/Phison-SVG.svg"
              alt="PHISON"
              width={160}
              height={31}
              className="header-logo-img"
              priority
            />
          </Link>

          <nav
            className="header-nav hidden lg:flex"
            onMouseLeave={closeMenu}
          >
            {version.showHome && (
              <div className="nav-item">
                <Link
                  href="/"
                  className="nav-link"
                  onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
                >
                  Home
                </Link>
              </div>
            )}
            {topNav.map((section) => (
              <div key={`${versionId}-${section.id}`} className="nav-item">
                {section.linkOnly ? (
                  <Link
                    href={section.href}
                    className="nav-link"
                    onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onMouseEnter={() => openMenu(section.id)}
                    onClick={() => setActiveMenu(activeMenu === section.id ? null : section.id)}
                    className={`nav-link ${
                      activeMenu === section.id ? "nav-link-active" : ""
                    }`}
                    aria-expanded={activeMenu === section.id}
                  >
                    {section.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="header-utils hidden lg:flex items-center">
            {version.showProductFinder && (
              <Link
                href={utilityNav.productFinder.href}
                className="util-link"
                onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
              >
                {utilityNav.productFinder.label}
              </Link>
            )}
            {version.showContact && (
              <Link
                href={utilityNav.contactSales.href}
                className="util-link"
                onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
              >
                {utilityNav.contactSales.label}
              </Link>
            )}
            <div className="nav-version-wrap" ref={versionRef}>
              <button
                className="lang-pill"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={versionOpen}
                onClick={() => {
                  setVersionOpen((o) => !o);
                  setActiveMenu(null);
                }}
              >
                {version.label}
                <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {versionOpen && (
                <ul className="nav-version-menu" role="listbox" aria-label="Navigation version">
                  {versions.map((v) => (
                    <li key={v.id} role="option" aria-selected={v.id === versionId}>
                      <button
                        type="button"
                        className={`nav-version-option ${v.id === versionId ? "is-active" : ""}`}
                        onClick={() => selectVersion(v.id)}
                      >
                        <span className="nav-version-option-label">{v.label}</span>
                        <span className="nav-version-option-desc">{v.description}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span
              role="button"
              tabIndex={0}
              className={`nav-edit-toggle${editorOpen ? " is-active" : ""}`}
              onClick={() => {
                setVersionId("custom");
                setEditorOpen(true);
                setVersionOpen(false);
                setActiveMenu(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setVersionId("custom");
                  setEditorOpen(true);
                  setVersionOpen(false);
                  setActiveMenu(null);
                }
              }}
            >
              Edit Custom
            </span>
            <button className="search-btn" aria-label="Search" type="button">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <button
            className="header-mobile-toggle lg:hidden p-2 text-phison-gray-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {activeSection && (
          <div onMouseEnter={cancelClose} onMouseLeave={closeMenu}>
            <MegaMenu section={activeSection} onClose={() => setActiveMenu(null)} />
          </div>
        )}

        <NavEditorPanel />

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-[90px] bg-white z-40 overflow-y-auto border-t border-phison-border">
            <div className="px-5 py-4">
              <div className="mb-4 pb-4 border-b border-phison-border">
                <p className="text-xs font-semibold text-phison-muted uppercase tracking-wide mb-2">Nav version</p>
                <div className="flex flex-wrap gap-2">
                  {versions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => selectVersion(v.id)}
                      className={`px-3 py-1.5 text-sm font-semibold rounded border ${
                        v.id === versionId
                          ? "border-phison-orange text-phison-navy bg-phison-gray"
                          : "border-phison-border text-phison-gray-text"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-phison-navy"
                  onClick={() => {
                    setVersionId("custom");
                    setEditorOpen(true);
                    setMobileOpen(false);
                  }}
                >
                  Edit Custom
                </button>
              </div>

              {version.showHome && (
                <Link href="/" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-phison-gray-text border-b border-phison-border">
                  Home
                </Link>
              )}
              {topNav.map((section) => (
                <div key={section.id} className="border-b border-phison-border">
                  {section.linkOnly ? (
                    <Link
                      href={section.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-semibold text-phison-gray-text"
                    >
                      {section.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileSection(mobileSection === section.id ? null : section.id)}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-phison-gray-text"
                      >
                        {section.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileSection === section.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileSection === section.id && (
                        <div className="pb-3 pl-3 space-y-0.5">
                          {section.href && section.href !== "#" && (
                            <Link href={section.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-phison-orange">
                              All {section.label}
                            </Link>
                          )}
                          {section.groups
                            ? section.groups.flatMap((g) =>
                                g.items.length === 0
                                  ? [{ label: g.title, href: "#", description: "" }]
                                  : g.items
                              ).map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={(e) => {
                                    if (item.href === "#") e.preventDefault();
                                    setMobileOpen(false);
                                  }}
                                  className="block py-2 text-sm text-phison-gray-text"
                                >
                                  {item.label}
                                </Link>
                              ))
                            : (section.items || []).map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={(e) => {
                                    if (item.href === "#") e.preventDefault();
                                    setMobileOpen(false);
                                  }}
                                  className="block py-2 text-sm text-phison-gray-text"
                                >
                                  {item.label}
                                </Link>
                              ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              {version.showProductFinder && (
                <Link
                  href={utilityNav.productFinder.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold text-phison-gray-text border-b border-phison-border"
                >
                  {utilityNav.productFinder.label}
                </Link>
              )}
              {version.showContact && (
                <Link
                  href={utilityNav.contactSales.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold text-phison-gray-text border-b border-phison-border"
                >
                  {utilityNav.contactSales.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
