"use client";

import Link from "next/link";
import { NavSection } from "@/data/nav";

type MegaMenuProps = {
  section: NavSection;
  onClose: () => void;
};

export default function MegaMenu({ section, onClose }: MegaMenuProps) {
  const hasGroups = section.groups && section.groups.length > 0;
  const isLive = section.megaStyle === "live";
  const groups = section.groups || [];
  const hasColumnTitles = groups.some((g) => g.title.trim().length > 0);

  if (isLive) {
    // Live Applications uses 3 flex slots (2 link columns + empty spacer)
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
          <div className={`grid gap-x-10 gap-y-6 ${section.groups!.length > 4 ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-2 lg:grid-cols-3"}`}>
            {section.groups!.map((group) => (
              <div key={group.title || "col"}>
                {group.items.length === 0 ? (
                  <Link
                    href={group.title ? "#" : section.href}
                    onClick={(e) => {
                      if ((group.title ? "#" : section.href) === "#") e.preventDefault();
                      onClose();
                    }}
                    className="text-[0.8125rem] font-semibold text-phison-navy hover:text-phison-orange transition-colors"
                  >
                    {group.title}
                  </Link>
                ) : (
                  <>
                    {group.title.trim() && (
                      <h3 className="text-[0.75rem] font-bold text-phison-navy uppercase tracking-wide mb-3">
                        {group.title}
                      </h3>
                    )}
                    <ul className="mega-menu-subnav space-y-0.5 pl-4">
                      {group.items.map((item) => (
                        <li key={`${group.title}-${item.label}`}>
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              if (item.href === "#") e.preventDefault();
                              onClose();
                            }}
                            className="group block py-1.5"
                          >
                            <span className="text-[0.8125rem] font-medium text-phison-navy group-hover:text-phison-orange transition-colors">
                              {item.label}
                            </span>
                            {item.description ? (
                              <span className="block text-[0.6875rem] text-phison-muted mt-0.5 leading-relaxed line-clamp-2">
                                {item.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
            {section.items!.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href === "#") e.preventDefault();
                  onClose();
                }}
                className="group block py-2"
              >
                <span className="text-[0.8125rem] font-medium text-phison-navy group-hover:text-phison-orange transition-colors">
                  {item.label}
                </span>
                {item.description ? (
                  <span className="block text-[0.6875rem] text-phison-muted mt-0.5 leading-relaxed">
                    {item.description}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
