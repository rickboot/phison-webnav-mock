"use client";

import Link from "next/link";
import Image from "next/image";
import { utilityNav } from "@/data/nav";
import { useNavVersion } from "./NavVersionProvider";

export default function Footer() {
  const { version } = useNavVersion();
  const topNav = version.sections;

  const footerColumns = [
    {
      links: [
        { label: "About us", href: "/company/about-phison" },
        { label: "Investor Relations", href: "/company/investor-relations" },
        { label: "ESG", href: "/company/esg" },
        { label: "Careers", href: "/company/careers" },
        { label: "Newsroom", href: "/resources/newsroom" },
      ],
    },
    {
      links: topNav.slice(0, 3).map((s) => ({
        label: s.label,
        href: s.href === "#" ? "/" : s.href,
      })),
    },
    {
      links: (
        topNav.find((s) => s.id === "solutions")?.groups?.[0]?.items.slice(0, 5) ||
        topNav.find((s) => s.id === "solutions")?.items?.slice(0, 5) ||
        topNav.find((s) => s.id === "applications")?.groups?.[0]?.items.slice(0, 5) ||
        topNav.find((s) => s.id === "storage-components")?.groups?.[0]?.items.slice(0, 5) ||
        topNav[0]?.groups?.[0]?.items.slice(0, 5) ||
        topNav[0]?.items?.slice(0, 5) ||
        []
      ).map((item) => ({
        label: item.label,
        href: item.href === "#" ? "/" : item.href,
      })),
    },
    {
      links: [
        { label: "Blog", href: "/resources/blog" },
        { label: "Contact", href: utilityNav.contactSales.href },
        { label: "Product Finder", href: utilityNav.productFinder.href },
        { label: "Support", href: "/support" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-columns">
          {footerColumns.map((col, i) => (
            <div key={i}>
              <ul>
                {col.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-brand">
            <Image
              src="/Phison-SVG.svg"
              alt="PHISON"
              width={146}
              height={28}
              className="footer-logo"
            />
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} PHISON Electronics Corp. — IA Prototype ({version.label})
        </p>
      </div>
    </footer>
  );
}
