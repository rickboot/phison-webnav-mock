"use client";

import Link from "next/link";
import { useState } from "react";

const row1 = [
  {
    id: "gaming",
    label: "Gaming",
    overlay: "/phison-original/gaming-overlay.webp",
    background: "/phison-original/gaming-background.png",
    description:
      "Phison NAND flash storage solutions deliver power, performance, and data management for sophisticated gaming systems. Today's games benefit from high SSD bandwidth, reduced load times, and glitch-free play.",
    href: "/solutions/gaming",
    hoverWidth: "64.6%",
    siblingWidth: "32.3%",
  },
  {
    id: "automotive",
    label: "Automotive",
    overlay: "/phison-original/automotive-overlay.webp",
    background: "/phison-original/automotive-background.png",
    description:
      "Phison offers secure and reliable automotive-grade flash storage for every application, including advanced driver assistance systems, autonomous driving, in-vehicle infotainment, cockpit displays, connectivity, and telematics.",
    href: "/solutions/automotive-storage",
    hoverWidth: "64.6%",
    siblingWidth: "32.3%",
  },
];

const row2 = [
  {
    id: "imagin",
    label: "IMAGIN+",
    overlay: "/phison-original/imagin-overlay.webp",
    background: "/phison-original/imagin-background.png",
    description:
      "Phison leverages its industry-leading R&D and IP portfolio to offer its IMAGIN+ design-in services and solutions. IMAGIN+ empowers global partners and customers with NAND Flash R&D resource sharing, custom SSD design services, and innovative AI deployments.",
    href: "/products-platforms/specialized-deep-custom-engineering",
    hoverWidth: "64.6%",
    siblingWidth: "32.3%",
  },
  {
    id: "aidaptiv",
    label: "aiDAPTIV+",
    overlay: "/phison-original/aidaptiv-overlay.webp",
    background: "/phison-original/aidaptiv-background.png",
    description:
      "Phison's aiDAPTIV+ integrates AI and machine learning technologies directly into NAND controllers and algorithms for enhanced computational performance and reliability of the company's NAND storage solutions.",
    href: "/products-platforms/aidaptiv",
    hoverWidth: "64.6%",
    siblingWidth: "32.3%",
  },
];

type Panel = (typeof row1)[number];

function PanelRow({ panels }: { panels: Panel[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="foundation-row">
      {panels.map((panel) => {
        const isHovered = hovered === panel.id;
        const siblingHovered = hovered && hovered !== panel.id;
        let width = "48.5%";
        if (isHovered) width = panel.hoverWidth;
        else if (siblingHovered) width = panel.siblingWidth;

        return (
          <Link
            key={panel.id}
            href={panel.href}
            className={`foundation-panel ${isHovered ? "is-hovered" : ""}`}
            style={{
              width,
              backgroundImage: `url(${isHovered ? panel.background : panel.overlay})`,
            }}
            onMouseEnter={() => setHovered(panel.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`panel-content ${isHovered ? "visible" : ""}`}>
              <p>{panel.description}</p>
              <span className="border-btn-white">Learn more</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function FoundationPanels() {
  return (
    <section className="foundation-section">
      <div className="foundation-inner">
        <h2 className="foundation-title">
          The Foundation that Accelerates Innovation<sup>™</sup>
        </h2>

        <PanelRow panels={row1} />
        <PanelRow panels={row2} />

        <div className="foundation-footer">
          <p>
            Phison partners benefit from custom flash storage solutions that
            <br className="hidden md:inline" />
            {" "}differentiate their products with first-to-market technologies.
          </p>
          <Link href="/solutions" className="border-btn">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
