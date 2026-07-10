export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type NavSection = {
  id: string;
  label: string;
  href: string;
  landingDescription: string;
  groups?: NavGroup[];
  items?: NavItem[];
  /** No mega menu — top item is a direct link */
  linkOnly?: boolean;
  /** Match live phison.com mega-menu presentation */
  megaStyle?: "live" | "default";
};

function item(
  label: string,
  section: string,
  slug: string,
  description: string
): NavItem {
  return {
    label,
    href: `/${section}/${slug}`,
    description,
  };
}

export const topNav: NavSection[] = [
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    landingDescription:
      "Explore how Phison technologies are deployed across AI, enterprise, edge, industrial, consumer, automotive, and signal integrity applications.",
    groups: [
      {
        title: "AI",
        items: [
          item("AI Overview", "solutions", "ai-overview", "End-to-end AI storage and compute enablement across the data lifecycle."),
          item("Local AI / AI PC", "solutions", "local-ai-ai-pc", "On-device AI workloads with optimized memory and storage bandwidth."),
          item("Enterprise AI", "solutions", "enterprise-ai", "Scale training and inference with enterprise-grade NVMe performance."),
          item("Edge AI", "solutions", "edge-ai", "Low-latency AI at the edge with rugged, power-efficient storage."),
          item("AI Infrastructure", "solutions", "ai-infrastructure", "Reference architectures for GPU-accelerated AI clusters."),
          item("AI Software Developers / ISVs", "solutions", "ai-software-developers-isvs", "Tools and SDKs for ISVs building on Phison AI platforms."),
          item("Education / Research", "solutions", "education-research", "Academic and research deployments for AI experimentation."),
        ],
      },
      {
        title: "Enterprise & Cloud",
        items: [
          item("Cloud Storage", "solutions", "cloud-storage", "Hyperscale and cloud provider storage optimization."),
          item("Database", "solutions", "database", "Low-latency, high-IOPS storage for transactional workloads."),
          item("HPC", "solutions", "hpc", "Parallel I/O for scientific computing and simulation."),
          item("Cold Storage", "solutions", "cold-storage", "Cost-effective archival and tiered storage strategies."),
          item("Boot / OS Drive Use Cases", "solutions", "boot-os-drive-use-cases", "Reliable boot drives for servers and appliances."),
        ],
      },
      {
        title: "Edge & Industrial",
        items: [
          item("Edge Computing", "solutions", "edge-computing", "Compact storage for distributed edge nodes."),
          item("Factory Automation", "solutions", "factory-automation", "Industrial-grade storage for smart manufacturing."),
          item("Embedded Systems", "solutions", "embedded-systems", "Embedded flash for IoT gateways and controllers."),
          item("Extended Temperature / Rugged Storage", "solutions", "extended-temperature-rugged-storage", "Storage rated for harsh environmental conditions."),
          item("Compact Form Factors", "solutions", "compact-form-factors", "M.2, E1.S, and custom form factors for tight spaces."),
          item("Power-Optimized Storage", "solutions", "power-optimized-storage", "Energy-efficient SSDs for battery-powered devices."),
        ],
      },
      {
        title: "Automotive",
        items: [
          item("Automotive Storage", "solutions", "automotive-storage", "AEC-Q100 qualified flash for in-vehicle systems."),
          item("Functional Safety / Reliability", "solutions", "functional-safety-reliability", "ISO 26262 aligned storage for safety-critical applications."),
          item("In-Vehicle AI / Edge Processing", "solutions", "in-vehicle-ai-edge-processing", "AI inference storage for ADAS and cockpit systems."),
          item("Infotainment / ADAS Storage", "solutions", "infotainment-adas-storage", "High-bandwidth storage for infotainment and perception stacks."),
        ],
      },
      {
        title: "Consumer",
        items: [
          item("Gaming", "solutions", "gaming", "Ultra-fast SSDs for next-gen gaming consoles and PCs."),
          item("Notebook", "solutions", "notebook", "Thin, efficient storage for ultrabooks and mobile workstations."),
          item("Desktop / Workstation", "solutions", "desktop-workstation", "High-performance client SSDs for creators and professionals."),
          item("Handheld", "solutions", "handheld", "Compact, low-power storage for portable gaming devices."),
          item("External Storage", "solutions", "external-storage", "USB and Thunderbolt external SSD solutions."),
        ],
      },
      {
        title: "Aerospace & Defense",
        items: [
          item("Space", "solutions", "space", "Radiation-tolerant storage for satellite and space applications."),
          item("Aerospace", "solutions", "aerospace", "Mission-critical storage for avionics and flight systems."),
          item("Defense", "solutions", "defense", "Secure, rugged storage for defense electronics."),
          item("Secure / Rugged Storage", "solutions", "secure-rugged-storage", "Tamper-resistant storage with extended endurance."),
        ],
      },
      {
        title: "Signal Integrity",
        items: [
          item("Retimer / Redriver Applications", "solutions", "retimer-redriver-applications", "Extend PCIe and USB signal reach in complex topologies."),
          item("PCIe Signal Integrity", "solutions", "pcie-signal-integrity", "Compliance-ready signal conditioning for Gen4/Gen5 links."),
          item("Compliance / Validation", "solutions", "compliance-validation", "Pre-certification testing and validation support."),
        ],
      },
    ],
  },
  {
    id: "products-platforms",
    label: "Products & Platforms",
    href: "/products-platforms",
    landingDescription:
      "Explore Phison products, platforms, controllers, SSDs, software-enabled AI solutions, and custom engineering programs.",
    groups: [
      {
        title: "AI Products & Platforms",
        items: [
          item("aiDAPTIV", "products-platforms", "aidaptiv", "AI memory optimization integrated into NAND controllers."),
          item("aiDAPTIV Cache Memory", "products-platforms", "aidaptiv-cache-memory", "Intelligent cache tiering for AI workloads."),
          item("AI Data Platform", "products-platforms", "ai-data-platform", "Unified data management for AI pipelines."),
          item("AI Reference Architectures", "products-platforms", "ai-reference-architectures", "Validated hardware configurations for AI deployment."),
          item("AI Software Modules", "products-platforms", "ai-software-modules", "Modular software for AI acceleration and tuning."),
          item("AI-Optimized Enterprise SSDs", "products-platforms", "ai-optimized-enterprise-ssds", "Pascari enterprise SSDs tuned for AI I/O patterns."),
        ],
      },
      {
        title: "Enterprise Storage",
        items: [
          item("Enterprise NVMe SSDs", "products-platforms", "enterprise-nvme-ssds", "Pascari NVMe SSDs for data center workloads."),
          item("SATA Enterprise SSDs", "products-platforms", "sata-enterprise-ssds", "Cost-effective SATA SSDs for legacy infrastructure."),
          item("Boot Drive SSDs", "products-platforms", "boot-drive-ssds", "Reliable boot drives for servers and appliances."),
          item("High-Endurance SSDs", "products-platforms", "high-endurance-ssds", "DWPD-rated drives for write-intensive applications."),
          item("High-Capacity SSDs", "products-platforms", "high-capacity-ssds", "Up to 245 TB capacity for dense storage deployments."),
        ],
      },
      {
        title: "Controllers",
        items: [
          item("Consumer Controllers", "products-platforms", "consumer-controllers", "PS5026 and PS5031 series for client SSDs."),
          item("Enterprise Controllers", "products-platforms", "enterprise-controllers", "PS5027 series for enterprise NVMe drives."),
          item("DRAM-less Controllers", "products-platforms", "dram-less-controllers", "HMB-enabled controllers for cost-optimized designs."),
          item("External / USB Controllers", "products-platforms", "external-usb-controllers", "Controllers for portable and external SSD products."),
          item("PCIe Gen5 Controllers", "products-platforms", "pcie-gen5-controllers", "Next-generation PCIe 5.0 x4 controller ASICs."),
          item("PCIe Gen4 Controllers", "products-platforms", "pcie-gen4-controllers", "Proven Gen4 controllers for mainstream deployments."),
        ],
      },
      {
        title: "Embedded Storage",
        items: [
          item("UFS", "products-platforms", "ufs", "Universal Flash Storage for mobile and automotive."),
          item("eMMC", "products-platforms", "emmc", "Embedded MultiMediaCard for IoT and industrial devices."),
          item("Industrial SSDs", "products-platforms", "industrial-ssds", "Extended temperature and endurance SSDs."),
          item("Compact Form Factors", "products-platforms", "compact-form-factors-embedded", "BGA, M.2 2230, and custom embedded packages."),
          item("Client Controllers", "products-platforms", "client-controllers", "Controllers optimized for client and embedded use."),
        ],
      },
      {
        title: "Signal IC",
        items: [
          item("Retimers", "products-platforms", "retimers", "PCIe and USB retimer ICs for signal extension."),
          item("Redrivers", "products-platforms", "redrivers", "Signal redriver ICs for board-level compensation."),
        ],
      },
      {
        title: "IMAGIN+ / Custom Solutions",
        items: [
          item("Modified: OEM Tuning", "products-platforms", "modified-oem-tuning", "Firmware and performance tuning for OEM partners."),
          item("Optimized: Platform Adaptation", "products-platforms", "optimized-platform-adaptation", "Purpose-built storage for specific platforms."),
          item("Specialized: Deep Custom Engineering", "products-platforms", "specialized-deep-custom-engineering", "Full custom SSD design and co-engineering."),
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    landingDescription:
      "Technical documentation, thought leadership, and product resources to support your evaluation and deployment.",
    items: [
      item("Blog", "resources", "blog", "Insights on storage, AI, and industry trends from Phison experts."),
      item("Whitepapers", "resources", "whitepapers", "In-depth technical papers on storage architecture and AI."),
      item("Product Briefs / Brochures", "resources", "product-briefs-brochures", "Product specifications and overview documents."),
      item("Case Studies", "resources", "case-studies", "Customer success stories across industries."),
      item("Webinars / Events", "resources", "webinars-events", "Live and on-demand technical sessions."),
      item("Newsroom", "resources", "newsroom", "Press releases and corporate announcements."),
      item("Technical Library", "resources", "technical-library", "Datasheets, application notes, and reference guides."),
      item("Videos / Demos", "resources", "videos-demos", "Product demonstrations and technology overviews."),
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
    landingDescription:
      "Learn about Phison's history, leadership, commitment to sustainability, and career opportunities.",
    items: [
      item("About Phison", "company", "about-phison", "Our story as a global leader in NAND flash controllers."),
      item("Why Phison", "company", "why-phison", "What sets Phison apart in storage innovation."),
      item("Leadership", "company", "leadership", "Executive team and board of directors."),
      item("ESG", "company", "esg", "Environmental, social, and governance initiatives."),
      item("Investor Relations", "company", "investor-relations", "Financial reports and shareholder information."),
      item("Careers", "company", "careers", "Join our team of storage and AI innovators."),
      item("Contact", "company", "contact", "Reach our global offices and sales teams."),
    ],
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    landingDescription:
      "Product support, documentation, downloads, and warranty services for Phison customers and partners.",
    items: [
      item("Support Center", "support", "support-center", "Central hub for technical support resources."),
      item("Downloads", "support", "downloads", "Firmware, drivers, and utility downloads."),
      item("Product Documentation", "support", "product-documentation", "User manuals and installation guides."),
      item("Warranty / RMA", "support", "warranty-rma", "Warranty policies and return merchandise authorization."),
      item("Contact Support", "support", "contact-support", "Submit a support ticket or request assistance."),
      item("Partner Support", "support", "partner-support", "Dedicated resources for OEM and channel partners."),
      item("FAQs", "support", "faqs", "Answers to frequently asked questions."),
    ],
  },
];

export const utilityNav = {
  productFinder: { label: "Product Finder", href: "/product-finder" },
  contactSales: { label: "Contact Sales", href: "/contact-sales" },
};

export function getSectionById(id: string): NavSection | undefined {
  return topNav.find((s) => s.id === id);
}

export function getAllSectionItems(section: NavSection): NavItem[] {
  if (section.items) return section.items;
  if (section.groups) return section.groups.flatMap((g) => g.items);
  return [];
}

export function getAllPages(): { section: string; slug: string }[] {
  const pages: { section: string; slug: string }[] = [];
  for (const section of topNav) {
    const items = getAllSectionItems(section);
    for (const item of items) {
      const parts = item.href.split("/").filter(Boolean);
      if (parts.length >= 2) {
        pages.push({ section: parts[0], slug: parts[1] });
      }
    }
  }
  return pages;
}

export function findPage(sectionId: string, slug: string): NavItem | undefined {
  const section = getSectionById(sectionId);
  if (!section) return undefined;
  return getAllSectionItems(section).find((i) => i.href === `/${sectionId}/${slug}`);
}
