import type { NavGroup, NavItem, NavSection } from "./nav";
import { utilityNav } from "./nav";

export type NavVersionId =
  | "current"
  | "rick-1"
  | "rick-2"
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
  /** Show Contact Sales in utility nav (not top nav). */
  showContact?: boolean;
};

const d = "";

function leaf(label: string): NavItem {
  return { label, href: "#", description: d };
}

/** Nested item with optional children (deeper IA levels). */
function branch(label: string, children: NavItem[]): NavItem {
  return { label, href: "#", description: d, children };
}

function group(title: string, labels: string[]): NavGroup {
  return { title, items: labels.map(leaf) };
}

function groupItems(title: string, items: NavItem[]): NavGroup {
  return { title, items };
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

/** Rick 1 — Storage + AI Solutions (AI menu as clean router) */
export const rick1: NavSection[] = [
  section("storage", "Storage", {
    groups: storageAndComponentsGroups,
  }),
  section("ai-solutions", "AI Solutions", {
    groups: [
      leafGroup("AI Overview"),
      leafGroup("Storage for AI & HPC"),
      group("aiDAPTIV", [
        "Overview",
        "Where It Runs",
        "What It Enables",
        "Product Components",
        "Build & Integrate",
        "Evaluate",
      ]),
      group("AI Data Platform", [
        "Overview",
        "On-Prem AI Platform",
        "Software Stack",
        "Hardware Reference",
        "Partner Ecosystem",
        "Architecture & Deployment",
        "Evaluate",
      ]),
    ],
  }),
  resourcesSection,
  companySection,
  supportSection,
];

/** Rick 2 — Products / Solutions portfolio IA */
export const rick2: NavSection[] = [
  section("products", "Products", {
    items: [
      "SSD Controllers",
      "UFS Controllers",
      "eMMC Controllers",
      "Memory Card Controllers",
      "USB Controllers",
      "Signal Conditioning",
      "Featured Products",
    ].map(leaf),
  }),
  section("solutions", "Solutions", {
    groups: [
      groupItems("AI Solutions", [
        branch("Full-Stack Private AI", [
          leaf("Phison AI Data Platform"),
        ]),
        branch("AI Memory Extension", [
          leaf("Pascari aiDAPTIV"),
        ]),
        branch("Data Storage for AI", [
          leaf("High-Performance AI Storage"),
          leaf("High-Capacity AI Storage"),
          leaf("AI Server Boot Storage"),
          leaf("View All Enterprise SSDs"),
        ]),
      ]),
      group("Enterprise Storage", [
        "Data Center and Cloud",
        "High-Performance Storage",
        "High-Capacity Storage",
        "Edge Infrastructure",
      ]),
      group("Embedded", [
        "Edge Computing",
        "Factory Automation",
        "Medical Devices",
        "Surveillance",
        "Aerospace and Defense",
        "Retail and Digital Signage",
      ]),
      group("Automotive", [
        "ADAS and Autonomous Driving",
        "In-Vehicle Infotainment and Cockpit",
        "Connectivity and Telematics",
      ]),
      group("Space", [
        "Spaceborne Storage",
        "Lunar Data Infrastructure",
        "Rugged and Radiation-Tolerant Storage",
      ]),
      group("Consumer", [
        "Desktop and Laptop PCs",
        "Workstations",
        "Mobile and Portable Devices",
        "External Storage",
        "Removable Storage",
      ]),
      group("Gaming", [
        "PC Gaming",
        "Gaming Consoles",
        "Gaming and Casino Systems",
      ]),
      group("Security", [
        "Data Protection",
        "Hardware Encryption",
        "Secure Data Erasure",
        "Storage Security Management",
      ]),
      group("Custom Design and Engineering", [
        "Custom Storage Solutions",
        "NAND Controller ASIC Design",
        "Firmware Customization",
        "Testing and Validation",
        "ODM Integration",
        "Supply Chain and Manufacturing",
      ]),
    ],
  }),
  section("resources", "Resources", {
    groups: [
      leafGroup("Blog"),
      group("Newsroom", ["Press Releases", "Phison in the News"]),
      leafGroup("Events"),
      leafGroup("Media Kits"),
      leafGroup("Partner Resources"),
    ],
  }),
  section("company", "Company", {
    groups: [
      leafGroup("About Phison"),
      group("Investors", [
        "Fundamentals",
        "Financials",
        "Annual Reports",
        "Corporate Governance",
        "Shareholder Services",
      ]),
      leafGroup("ESG"),
      leafGroup("Careers"),
      leafGroup("Global Talent"),
      leafGroup("Contact Us"),
    ],
  }),
  section("support", "Support", {
    items: [
      "Product Support",
      "Downloads",
      "Technical Documentation",
      "Sales Inquiries",
      "Contact Support",
    ].map(leaf),
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
    id: "rick-1",
    label: "Rick 1",
    description: "Storage + AI Solutions",
    sections: rick1,
    showHome: true,
  },
  {
    id: "rick-2",
    label: "Rick 2",
    description: "Products / Solutions portfolio (deep Solutions IA)",
    sections: rick2,
    showHome: false,
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
