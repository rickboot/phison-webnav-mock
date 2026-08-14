"use client";

import Link from "next/link";
import { useState } from "react";
import { NavGroup, NavItem, NavSection } from "@/data/nav";

type MegaMenuProps = {
  section: NavSection;
  onClose: () => void;
};

function itemHasChildren(item: NavItem): boolean {
  return Boolean(item.children?.length);
}

function MenuLink({
  label,
  href,
  onClose,
  weight = "medium",
  className = "",
}: Readonly<{
  label: string;
  href: string;
  onClose: () => void;
  weight?: "medium" | "semibold" | "bold";
  className?: string;
}>) {
  const weightClass =
    weight === "bold"
      ? "font-bold"
      : weight === "semibold"
        ? "font-semibold"
        : "font-medium";

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href === "#") e.preventDefault();
        onClose();
      }}
      className={`block py-1 text-[0.8125rem] transition-colors ${weightClass} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}

/** One top-level pillar: title + flat links and/or subhead blocks. */
function PillarColumn({
  item,
  onClose,
}: Readonly<{ item: NavItem; onClose: () => void }>) {
  const kids = item.children || [];

  return (
    <div className="mega-menu-pillar min-w-0">
      <MenuLink
        label={item.label}
        href={item.href}
        onClose={onClose}
        weight="bold"
        className="mega-menu-pillar-title"
      />
      <div className="mt-1 mb-3 h-0.5 w-8 bg-phison-orange" aria-hidden />

      {kids.length === 0 ? null : (
        <div className="space-y-0.5">
          {kids.map((child) => {
            if (!itemHasChildren(child)) {
              return (
                <MenuLink
                  key={child.label}
                  label={child.label}
                  href={child.href}
                  onClose={onClose}
                />
              );
            }

            return (
              <div key={child.label} className="space-y-1 mt-2 first:mt-0">
                <p className="text-[0.6875rem] font-bold uppercase tracking-wide text-phison-muted">
                  {child.label}
                </p>
                <ul className="space-y-0.5">
                  {(child.children || []).map((leaf) => (
                    <li key={leaf.label}>
                      <MenuLink
                        label={leaf.label}
                        href={leaf.href}
                        onClose={onClose}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Hub-selected category: pillars when nested, multi-col link grid when flat. */
function CategoryPanel({
  group,
  onClose,
}: Readonly<{ group: NavGroup; onClose: () => void }>) {
  const hasNested = group.items.some(itemHasChildren);

  if (!hasNested) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-1">
        {group.items.map((item) => (
          <MenuLink
            key={item.label}
            label={item.label}
            href={item.href}
            onClose={onClose}
          />
        ))}
      </div>
    );
  }

  const pillarCount = group.items.length;
  let gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (pillarCount === 1) gridClass = "grid-cols-1 max-w-md";
  else if (pillarCount === 2) gridClass = "grid-cols-1 sm:grid-cols-2";
  else if (pillarCount >= 4) gridClass = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";

  return (
    <div className={`grid gap-x-10 gap-y-8 ${gridClass}`}>
      {group.items.map((item) => (
        <PillarColumn key={item.label} item={item} onClose={onClose} />
      ))}
    </div>
  );
}

/** Classic multi-group column (shallow trees / mixed hub+columns). */
function GroupColumn({
  group,
  onClose,
  showTitle = true,
}: Readonly<{
  group: NavGroup;
  onClose: () => void;
  showTitle?: boolean;
}>) {
  const hasNested = group.items.some(itemHasChildren);

  if (hasNested) {
    return <CategoryPanel group={group} onClose={onClose} />;
  }

  return (
    <div>
      {showTitle && group.title.trim() ? (
        <h3 className="text-[0.75rem] font-bold text-phison-navy uppercase tracking-wide mb-3">
          {group.title}
        </h3>
      ) : null}
      <ul className="space-y-0.5">
        {group.items.map((item) => (
          <li key={`${group.title}-${item.label}`}>
            <MenuLink
              label={item.label}
              href={item.href}
              onClose={onClose}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MegaMenu({
  section,
  onClose,
}: Readonly<MegaMenuProps>) {
  const hasGroups = section.groups && section.groups.length > 0;
  const isLive = section.megaStyle === "live";
  const groups = section.groups || [];
  const hasColumnTitles = groups.some((g) => g.title.trim().length > 0);

  const titledGroups = groups.filter((g) => g.title.trim());
  const hasLeafPeers = groups.some(
    (g) => g.items.length === 0 && g.title.trim(),
  );
  const hubLinks =
    hasLeafPeers || titledGroups.length > 1
      ? titledGroups
      : groups.filter((g) => g.items.length === 0 && g.title.trim());
  const allColumns = groups.filter((g) => g.items.length > 0);
  const hubFiltersColumns =
    hubLinks.length > 1 &&
    allColumns.length > 1 &&
    !hasLeafPeers &&
    allColumns.every((g) => g.title.trim());

  const [activeHub, setActiveHub] = useState(
    () => hubLinks[0]?.title ?? "",
  );
  const columns = hubFiltersColumns
    ? allColumns.filter((g) => g.title === activeHub)
    : allColumns;
  const columnCount = columns.length;
  let columnGridClass = "grid-cols-2 lg:grid-cols-3";
  if (columnCount === 1) columnGridClass = "grid-cols-1";
  else if (columnCount > 4) columnGridClass = "grid-cols-2 xl:grid-cols-3";

  if (isLive) {
    const showSpacer = !hasColumnTitles && groups.length === 2;

    return (
      <div className="live-mega">
        <div className="live-mega-submenu">
          {!hasColumnTitles && (
            <p className="live-mega-title">{section.label}</p>
          )}
          <div className="live-mega-flex">
            {groups.map((group, i) => (
              <div key={`${group.title || "col"}-${i}`} className="live-mega-block">
                {group.title.trim() ? (
                  <p className="live-mega-title">{group.title}</p>
                ) : null}
                <ul>
                  {group.items.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link href={item.href} onClick={onClose}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {showSpacer && <div className="live-mega-block" aria-hidden />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mega-menu-enter absolute left-0 right-0 top-full bg-phison-gray border-t border-phison-border z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="mega-menu-title">{section.label}</p>
          {section.landingDescription ? (
            <p className="text-[0.8125rem] text-phison-gray-text max-w-xl leading-relaxed">
              {section.landingDescription}
            </p>
          ) : null}
          {section.href && section.href !== "#" ? (
            <Link
              href={section.href}
              onClick={onClose}
              className="inline-block mt-3 text-[0.8125rem] font-semibold text-phison-navy hover:text-phison-orange transition-colors"
            >
              View all {section.label} →
            </Link>
          ) : null}
        </div>

        {hasGroups ? (
          <div className="flex flex-col gap-6">
            {hubLinks.length > 0 && (
              <div className="mega-menu-hub flex flex-wrap items-center gap-x-6 gap-y-2">
                {hubLinks.map((group) => {
                  const isActive =
                    hubFiltersColumns && group.title === activeHub;
                  return (
                    <button
                      key={group.title}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        if (hubFiltersColumns) {
                          setActiveHub(group.title);
                          return;
                        }
                        onClose();
                      }}
                      className={`text-[0.8125rem] font-semibold transition-colors ${
                        isActive
                          ? "underline underline-offset-4 decoration-phison-orange decoration-2"
                          : ""
                      }`}
                    >
                      {group.title}
                    </button>
                  );
                })}
              </div>
            )}

            {columns.length > 0 &&
              (hubFiltersColumns ? (
                <CategoryPanel group={columns[0]} onClose={onClose} />
              ) : (
                <div className={`grid gap-x-10 gap-y-6 ${columnGridClass}`}>
                  {columns.map((group) => (
                    <GroupColumn
                      key={group.title || "col"}
                      group={group}
                      onClose={onClose}
                    />
                  ))}
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
            {section.items!.map((item) => (
              <MenuLink
                key={item.label}
                label={item.label}
                href={item.href}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
