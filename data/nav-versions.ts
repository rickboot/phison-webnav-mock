import type { NavGroup, NavItem, NavSection } from "./nav";
import { utilityNav } from "./nav";

export type NavVersionId =
  | "current"
  | "new-nav-1"
  | "new-nav-2"
  | "new-nav-3"
  | "new-nav-4"
  | "web-team-wip"
  | "custom";

export type NavVersionConfig = {
  id: NavVersionId;
  label: string;
  description: string;
  sections: NavSection[];
  showHome: boolean;
  /** Show Product Finder in utility nav (not top nav). */
  showProductFinder?: boolean;
};

const d = "";

function leaf(label: string): NavItem {
  return { label, href: "#", description: d };
}

function group(title: string, labels: string[]): NavGroup {
  return { title, items: labels.map(leaf) };
}

/** Leaf-only entry rendered as a titled link with no children. */
function leafGroup(title: string): NavGroup {
  return { title, items: [] };
}

function section(
  id: string,
  label: string,
  opts: {
    groups?: NavGroup[];
    items?: NavItem[];
    linkOnly?: boolean;
    megaStyle?: "live" | "default";
  } = {}
): NavSection {
  return {
    id,
    label,
    href: "#",
    landingDescription: "",
    ...opts,
  };
}

/** Live phison.com top navigation + subnav — keep exactly as-is. */
export const currentNav: NavSection[] = [
  {
    id: "technology",
    label: "Technology",
    href: "/products-platforms",
    landingDescription: "",
    linkOnly: true,
  },
  {
    id: "applications",
    label: "Applications",
    href: "/solutions",
    landingDescription: "",
    megaStyle: "live",
    groups: [
      {
        title: "",
        items: [
          { label: "Embedded", href: "/solutions/embedded-systems", description: d },
          { label: "Consumer", href: "/solutions/notebook", description: d },
          { label: "IMAGIN+", href: "/products-platforms/specialized-deep-custom-engineering", description: d },
          { label: "aiDAPTIV+", href: "/products-platforms/aidaptiv", description: d },
        ],
      },
      {
        title: "",
        items: [
          { label: "Signal Conditioning", href: "/solutions/retimer-redriver-applications", description: d },
          { label: "Automotive", href: "/solutions/automotive-storage", description: d },
          { label: "Gaming", href: "/solutions/gaming", description: d },
          { label: "Security", href: "/solutions/secure-rugged-storage", description: d },
        ],
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    href: "/products-platforms/enterprise-nvme-ssds",
    landingDescription: "",
    linkOnly: true,
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    landingDescription: "",
    megaStyle: "live",
    groups: [
      {
        title: "Solutions",
        items: [
          { label: "Overview", href: "/solutions", description: d },
          { label: "SSD", href: "/products-platforms/enterprise-nvme-ssds", description: d },
          { label: "UFS", href: "/products-platforms/ufs", description: d },
          { label: "eMMC", href: "/products-platforms/emmc", description: d },
          { label: "Memory Cards", href: "/products-platforms/compact-form-factors-embedded", description: d },
          { label: "USB", href: "/products-platforms/external-usb-controllers", description: d },
        ],
      },
      {
        title: "Featured Products",
        items: [
          { label: "E37T", href: "/products-platforms/pcie-gen5-controllers", description: d },
          { label: "E28", href: "/products-platforms/pcie-gen4-controllers", description: d },
          { label: "E31T", href: "/products-platforms/consumer-controllers", description: d },
          { label: "E18", href: "/products-platforms/consumer-controllers", description: d },
          { label: "U21", href: "/products-platforms/ufs", description: d },
          { label: "U17 / U18", href: "/products-platforms/ufs", description: d },
        ],
      },
      {
        title: "Partners",
        items: [
          { label: "E26", href: "/products-platforms/pcie-gen5-controllers", description: d },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
    landingDescription: "",
    megaStyle: "live",
    groups: [
      {
        title: "About",
        items: [
          { label: "Overview", href: "/company/about-phison", description: d },
          { label: "Investors", href: "/company/investor-relations", description: d },
          { label: "ESG", href: "/company/esg", description: d },
          { label: "Careers", href: "/company/careers", description: d },
          { label: "Global Talents", href: "/company/careers", description: d },
          { label: "Contact Us", href: "/company/contact", description: d },
        ],
      },
      {
        title: "Media",
        items: [
          { label: "Newsroom", href: "/resources/newsroom", description: d },
          { label: "Press Releases", href: "/resources/newsroom", description: d },
          { label: "Phison in the News", href: "/resources/newsroom", description: d },
          { label: "Events", href: "/resources/webinars-events", description: d },
          { label: "Media Kits", href: "/resources/product-briefs-brochures", description: d },
        ],
      },
    ],
  },
  {
    id: "investors",
    label: "Investors",
    href: "/company/investor-relations",
    landingDescription: "",
    linkOnly: true,
  },
  {
    id: "esg",
    label: "ESG",
    href: "/company/esg",
    landingDescription: "",
    linkOnly: true,
  },
  {
    id: "blog",
    label: "Blog",
    href: "/resources/blog",
    landingDescription: "",
    linkOnly: true,
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact-sales",
    landingDescription: "",
    linkOnly: true,
  },
];

const resourcesSection = section("resources", "Resources", {
  items: [
    "Whitepapers",
    "Case Studies",
    "Product Brochures & Sheets",
    "Blog",
    "Newsroom",
    "Events",
    "Videos / Demos",
    "Technical Library",
  ].map(leaf),
});

const companySection = section("company", "Company", {
  items: [
    "About Phison",
    "Why Phison",
    "Leadership",
    "ESG",
    "Investor Relations",
    "Careers",
    "Contact",
  ].map(leaf),
});

const supportSection = section("support", "Support", {
  items: [
    "Support Center",
    "Downloads",
    "Product Documentation",
    "Warranty / RMA",
    "Contact Support",
    "Partner Support",
    "FAQs",
  ].map(leaf),
});

const storageAndComponentsGroups: NavGroup[] = [
  group("Enterprise & Data Center", [
    "Enterprise NVMe SSDs",
    "SATA Enterprise SSDs",
    "Boot Drive SSDs",
    "High-Endurance SSDs",
    "High-Capacity SSDs",
    "Cloud Storage",
    "Database",
    "Cold Storage",
    "HPC Storage",
  ]),
  group("Client & Consumer", [
    "Consumer Controllers",
    "Gaming",
    "Notebook",
    "Desktop / Workstation",
    "Handheld",
    "External Storage",
  ]),
  group("Embedded & Industrial", [
    "UFS",
    "eMMC",
    "Industrial SSDs",
    "DRAM-less Controllers",
    "Extended Temperature SSDs",
    "Compact Form Factors",
    "Power-Optimized NVMe",
  ]),
  group("Market-Specific Storage", [
    "Automotive Storage",
    "Space, Aerospace & Defense Storage",
    "Edge Computing",
    "Factory Automation",
  ]),
  group("Components & Signal IC", [
    "NAND Controllers",
    "Retimers",
    "Redrivers",
    "Signal Integrity / Compliance",
  ]),
  group("Custom Design Services", [
    "IMAGIN+",
    "Modified: OEM Tuning",
    "Optimized: Purpose-Built Adaptation",
    "Specialized: Deep Custom Engineering",
  ]),
  leafGroup("Product Finder"),
];

const storageAndComponentsNav3: NavGroup[] = [
  group("Enterprise & Data Center", [
    "Enterprise NVMe SSDs",
    "SATA Enterprise SSDs",
    "Boot Drive SSDs",
    "High-Endurance SSDs",
    "High-Capacity SSDs",
    "Cloud Storage",
    "Database",
    "Cold Storage",
    "HPC Storage",
  ]),
  group("Client & Consumer", [
    "Consumer Controllers",
    "Gaming",
    "Notebook",
    "Desktop / Workstation",
    "Handheld",
    "External Storage",
  ]),
  group("Embedded & Industrial", [
    "UFS",
    "eMMC",
    "Industrial SSDs",
    "DRAM-less Controllers",
    "Extended Temperature SSDs",
    "Compact Form Factors",
    "Power-Optimized NVMe",
  ]),
  group("Market-Specific Storage", [
    "AI & HPC Storage",
    "Automotive Storage",
    "Space, Aerospace & Defense Storage",
    "Edge Computing",
    "Factory Automation",
  ]),
  group("Components & Signal IC", [
    "NAND Controllers",
    "Retimers",
    "Redrivers",
    "Signal Integrity / Compliance",
  ]),
  leafGroup("Custom Design Services / IMAGIN+"),
  leafGroup("Product Finder"),
];

const aidaptivItems = [
  "Overview",
  "AI Memory Extension",
  "How aiDAPTIV Works",
  "Client AI / AI PC",
  "Edge AI",
  "Server / Workstation AI",
  "Local Inference",
  "KV Cache Extension & Reuse",
  "Dynamic MoE",
  "Elastic Fine-Tuning",
  "aiDAPTIV Cache Memory",
  "For Developers & ISVs",
  "Integration Resources",
  "Technical Resources",
  "Evaluate",
];

const aidaptivItemsNav2 = [
  "Overview",
  "AI Memory Extension",
  "How aiDAPTIV Works",
  "Client AI / AI PC",
  "Edge AI",
  "Server / Workstation AI",
  "Local Inference",
  "KV Cache Extension & Reuse",
  "Dynamic MoE",
  "Elastic Fine-Tuning",
  "aiDAPTIV Cache Memory",
  "For Developers & ISVs",
  "Integration Resources",
  "Evaluate",
];

const aidpItems = [
  "Overview",
  "Full AI Software Stack",
  "On-Prem AI Infrastructure",
  "Hardware Server Reference",
  "Partner Ecosystem",
  "How AIDP Uses aiDAPTIV",
  "AI Software Modules",
  "Enterprise AI Deployment",
  "Reference Architectures",
  "Use Cases",
  "Technical Resources",
  "Contact Sales",
];

const aidpItemsNav2 = [
  "Overview",
  "Full AI Software Stack",
  "On-Prem AI Infrastructure",
  "Hardware Server Reference",
  "Partner Ecosystem",
  "How AIDP Uses aiDAPTIV",
  "AI Software Modules",
  "Enterprise AI Deployment",
  "Reference Architectures",
  "Use Cases",
];

/** New Nav 1 — Classic B2B Structure */
export const newNav1: NavSection[] = [
  section("solutions", "Solutions", {
    items: [
      "AI & HPC Storage",
      "Enterprise & Data Center",
      "Cloud Storage",
      "Database",
      "Cold Storage",
      "Edge & Industrial",
      "Automotive",
      "Client & Consumer",
      "Space, Aerospace & Defense",
      "Signal Integrity",
    ].map(leaf),
  }),
  section("products", "Products", {
    groups: [
      group("Enterprise Storage", [
        "Enterprise NVMe SSDs",
        "SATA Enterprise SSDs",
        "Boot Drive SSDs",
        "High-Endurance SSDs",
        "High-Capacity SSDs",
      ]),
      group("Client & Consumer", [
        "Consumer Controllers",
        "Gaming",
        "Notebook",
        "Desktop / Workstation",
        "Handheld",
        "External Storage",
      ]),
      group("Embedded & Industrial", [
        "UFS",
        "eMMC",
        "Industrial SSDs",
        "DRAM-less Controllers",
        "Extended Temperature SSDs",
        "Compact Form Factors",
      ]),
      leafGroup("NAND Controllers"),
      group("Signal IC", ["Retimers", "Redrivers"]),
      leafGroup("Custom Design Services / IMAGIN+"),
    ],
  }),
  section("platforms", "Platforms", {
    groups: [
      group("aiDAPTIV", [
        "AI Memory Extension",
        "Client AI / AI PC",
        "Edge AI",
        "Server / Workstation AI",
        "KV Cache Extension & Reuse",
        "Dynamic MoE",
        "Elastic Fine-Tuning",
        "For Developers & ISVs",
        "Technical Resources",
      ]),
      group("AI Data Platform", [
        "Full AI Software Stack",
        "On-Prem AI Infrastructure",
        "Hardware Server Reference",
        "Partner Ecosystem",
        "How AIDP Uses aiDAPTIV",
        "AI Software Modules",
        "Reference Architectures",
        "Use Cases",
      ]),
    ],
  }),
  resourcesSection,
  companySection,
  supportSection,
];

/** New Nav 2 — Storage & Components + AI Solutions */
export const newNav2: NavSection[] = [
  section("storage-components", "Storage", {
    groups: storageAndComponentsGroups,
  }),
  section("ai-solutions", "AI Solutions", {
    groups: [
      group("aiDAPTIV", aidaptivItemsNav2),
      group("AI Data Platform", aidpItemsNav2),
    ],
  }),
  resourcesSection,
  companySection,
  supportSection,
];

/** New Nav 3 — Portfolio Ladder */
export const newNav3: NavSection[] = [
  section("storage-components", "Storage", {
    groups: storageAndComponentsNav3,
  }),
  section("aidaptiv", "aiDAPTIV", {
    items: aidaptivItems.map(leaf),
  }),
  section("ai-data-platform", "AI Data Platform", {
    items: aidpItems.map(leaf),
  }),
  resourcesSection,
  companySection,
  supportSection,
];

/** New Nav 4 — Storage & Components + AI Products & Platforms */
export const newNav4: NavSection[] = [
  section("storage-components", "Storage", {
    groups: storageAndComponentsGroups,
  }),
  section("ai-products-platforms", "AI Products & Platforms", {
    groups: [
      group("aiDAPTIV", aidaptivItems),
      group("AI Data Platform", aidpItems),
    ],
  }),
  resourcesSection,
  companySection,
  supportSection,
];

/** Web Team WIP */
export const webTeamWip: NavSection[] = [
  section("technology", "Technology", {
    items: [
      "Controller Architecture",
      "Firmware and NAND / Data Management",
      "AI Training and Inference",
      "AI Acceleration and Optimization",
      "Security and Data Integrity",
      "Signal Integrity and Compliance",
    ].map(leaf),
  }),
  section("solutions", "Solutions", {
    groups: [
      leafGroup("Automotive"),
      group("Consumer", [
        "Gaming",
        "Notebook",
        "Desktop / Workstation",
        "External Storage",
        "Handheld",
      ]),
      leafGroup("Database"),
      leafGroup("HPC"),
      leafGroup("Cloud Storage"),
      leafGroup("Cold Storage"),
      group("AI", [
        "aiDAPTIV",
        "Education",
        "PC OEM / ISV",
        "Enterprise",
        "AI Workloads",
      ]),
      leafGroup("Edge Computing"),
      leafGroup("Industrial / Factory Automation"),
      leafGroup("Space, Aerospace & Defense"),
      group("Signal IC", ["Retimer / Redriver"]),
    ],
  }),
  section("products", "Products", {
    groups: [
      group("IMAGIN+ / Customized Solutions", [
        "Modified: OEM Tuning",
        "Optimized: Purpose-Built for Enterprise",
        "Specialized: Deeply Tailored for Use Case",
      ]),
      group("Enterprise Storage", [
        "Enterprise NVMe SSDs",
        "SATA Enterprise SSDs",
        "Boot Drive SSDs",
      ]),
      group("Consumer Controllers", ["By Product"]),
      group("Embedded Storage", [
        "UFS",
        "eMMC",
        "Client Controller",
        "Industrial",
        "DRAM-less Controllers",
        "Compact Form Factors",
      ]),
      group("AI and High-Performance Computing", [
        "aiDAPTIV",
        "Inference",
        "Fine-Tune Training",
        "HPC",
        "AI Workloads",
        "High-Performance NVMe Enterprise SSDs",
      ]),
      group("Edge Computing", [
        "Industrial SSDs",
        "Extended Temperature SSDs",
        "Compact Form Factors",
        "Power-Optimized NVMe",
        "Consumer",
      ]),
      group("Signal IC", ["Retimer / Redriver"]),
    ],
  }),
  section("resources", "Resources", {
    items: [
      "Blog Articles",
      "Product Brochures / Product Sheets",
      "Whitepapers",
      "Case Studies",
      "Newsroom",
    ].map(leaf),
  }),
  section("about", "About", {
    items: [
      "About Phison",
      "Leadership",
      "ESG",
      "Investor Relations",
      "Careers",
    ].map(leaf),
  }),
  section("support", "Support", {
    linkOnly: true,
  }),
  section("contact", "Contact", {
    linkOnly: true,
  }),
];

export const navVersions: NavVersionConfig[] = [
  {
    id: "current",
    label: "Current",
    description: "Live phison.com navigation",
    sections: currentNav,
    showHome: false,
  },
  {
    id: "web-team-wip",
    label: "Web Team WIP",
    description: "Web team working draft",
    sections: webTeamWip,
    showHome: true,
  },
  {
    id: "new-nav-1",
    label: "New Nav 1",
    description: "Classic B2B Structure",
    sections: newNav1,
    showHome: true,
  },
  {
    id: "new-nav-2",
    label: "New Nav 2",
    description: "Storage & Components + AI Solutions",
    sections: newNav2,
    showHome: true,
  },
  {
    id: "new-nav-3",
    label: "New Nav 3",
    description: "Portfolio Ladder",
    sections: newNav3,
    showHome: true,
  },
  {
    id: "new-nav-4",
    label: "New Nav 4",
    description: "Storage & Components + AI Products & Platforms",
    sections: newNav4,
    showHome: true,
  },
  {
    id: "custom",
    label: "Custom",
    description: "Your outline (edit in panel below)",
    sections: [],
    showHome: false,
  },
];

export const defaultNavVersionId: NavVersionId = "current";

export function getNavVersion(id: NavVersionId): NavVersionConfig {
  return navVersions.find((v) => v.id === id) || navVersions[0];
}

export { utilityNav };
