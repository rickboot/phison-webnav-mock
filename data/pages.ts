export type PageContent = {
  title: string;
  overview: string[];
  relatedProducts: { label: string; href: string }[];
  relatedResources: { label: string; href: string }[];
};

const defaultRelatedProducts = [
  { label: "Pascari Enterprise NVMe SSDs", href: "/products-platforms/enterprise-nvme-ssds" },
  { label: "aiDAPTIV Platform", href: "/products-platforms/aidaptiv" },
  { label: "PCIe Gen5 Controllers", href: "/products-platforms/pcie-gen5-controllers" },
];

const defaultRelatedResources = [
  { label: "Product Briefs", href: "/resources/product-briefs-brochures" },
  { label: "Technical Library", href: "/resources/technical-library" },
  { label: "Case Studies", href: "/resources/case-studies" },
];

export function getPageContent(section: string, slug: string, title: string): PageContent {
  const sectionLabel =
    section === "solutions"
      ? "Solutions"
      : section === "products-platforms"
        ? "Products & Platforms"
        : section === "resources"
          ? "Resources"
          : section === "company"
            ? "Company"
            : "Support";

  return {
    title,
    overview: [
      `This page outlines Phison's ${title.toLowerCase()} offering as part of the proposed 2027 ${sectionLabel} information architecture. Content shown here is representative placeholder copy for internal review and navigation validation.`,
      `Phison delivers NAND flash controllers, enterprise SSDs, signal conditioning ICs, and AI-optimized storage platforms trusted by leading OEMs, cloud providers, and technology partners worldwide. Explore related products and resources below, or contact our sales team to discuss your specific requirements.`,
    ],
    relatedProducts: defaultRelatedProducts,
    relatedResources: defaultRelatedResources,
  };
}

export const homeModules = [
  {
    title: "Pascari Enterprise SSDs",
    subtitle: "AI, Analytics & Cloud-Scale Performance",
    description:
      "Engineering imagination together — Pascari enterprise SSDs deliver outstanding performance, capacity, and reliability for AI training, analytics, and hyperscale cloud deployments.",
    href: "/products-platforms/enterprise-nvme-ssds",
    accent: "from-[#0a1628] to-[#1a3a5c]",
  },
  {
    title: "Signal Conditioning Solutions",
    subtitle: "Retimers & Redrivers",
    description:
      "Industry-leading signal integrity ICs extend PCIe and USB reach, enabling compliant Gen4 and Gen5 designs in complex server, workstation, and embedded topologies.",
    href: "/products-platforms/retimers",
    accent: "from-[#0d2137] to-[#1e4976]",
  },
  {
    title: "IMAGIN+",
    subtitle: "Custom Flash Storage Solutions",
    description:
      "Empower global partners with NAND Flash R&D resource sharing, custom SSD design services, and innovative AI deployments for improved time-to-market.",
    href: "/products-platforms/specialized-deep-custom-engineering",
    accent: "from-[#0a1628] to-[#2a5298]",
  },
  {
    title: "aiDAPTIV",
    subtitle: "AI Memory Optimization",
    description:
      "Integrate AI and machine learning directly into NAND controllers and algorithms for enhanced computational performance and reliability of storage solutions.",
    href: "/products-platforms/aidaptiv",
    accent: "from-[#0d2137] to-[#0066cc]",
  },
];

export const homeNews = [
  {
    title: "Phison Unlocks Full-Scale AI Deployment Across Industries",
    date: "June 02, 2026",
    category: "Press Release",
    image: "/phison-original/2026COMPUTEX_ENG.jpg",
    href: "/resources/newsroom",
  },
  {
    title: "Phison Collaborates with Intel to Bring Larger Local AI Workloads to Intel AI PC Platforms",
    date: "June 02, 2026",
    category: "Press Release",
    image: "/phison-original/2026INTEL_ENG.png",
    href: "/resources/newsroom",
  },
  {
    title: "Pascari Enterprise Storage Honored with COMPUTEX Best Choice Golden Award",
    date: "May 21, 2026",
    category: "Press Release",
    image: "/phison-original/PascariD206VGraphic_1920x1200_86ahfeqzu.png",
    href: "/products-platforms/enterprise-nvme-ssds",
  },
];

export const homeEsg = [
  {
    title: "Coastal Afforestation and Tree Planting Initiatives",
    date: "April 24, 2026",
    image: "/phison-original/IMG_4073.jpg",
    href: "/company/esg",
  },
  {
    title: "Phison Receives Micron Outstanding Supplier Performance Award",
    date: "November 18, 2025",
    image: "/phison-original/IMG_2506.png",
    href: "/company/esg",
  },
  {
    title: "Rural Service Program Reaches Five-Year Milestone",
    date: "October 17, 2025",
    image: "/phison-original/964_1844987482-1024x640.jpg",
    href: "/company/esg",
  },
];

export const mockProducts = [
  {
    id: "pascari-x200",
    name: "Pascari X200 Enterprise NVMe",
    type: "Enterprise SSD",
    capacity: "15.36 TB",
    interface: "PCIe Gen5 x4",
    formFactor: "U.2",
    seqRead: "14,000 MB/s",
    seqWrite: "10,000 MB/s",
    randRead: "2.5M IOPS",
    randWrite: "800K IOPS",
    endurance: "3 DWPD",
    temperature: "0°C to 70°C",
    solution: "Enterprise AI",
    family: "Pascari",
  },
  {
    id: "pascari-x100",
    name: "Pascari X100 Enterprise NVMe",
    type: "Enterprise SSD",
    capacity: "7.68 TB",
    interface: "PCIe Gen4 x4",
    formFactor: "U.2",
    seqRead: "7,400 MB/s",
    seqWrite: "6,600 MB/s",
    randRead: "1.8M IOPS",
    randWrite: "600K IOPS",
    endurance: "3 DWPD",
    temperature: "0°C to 70°C",
    solution: "Cloud Storage",
    family: "Pascari",
  },
  {
    id: "ps5027-e27t",
    name: "PS5027-E27T Controller",
    type: "Controller",
    capacity: "N/A",
    interface: "PCIe Gen5 x4",
    formFactor: "Controller ASIC",
    seqRead: "14,000 MB/s",
    seqWrite: "12,000 MB/s",
    randRead: "2M IOPS",
    randWrite: "1M IOPS",
    endurance: "N/A",
    temperature: "-40°C to 85°C",
    solution: "Enterprise AI",
    family: "PS5027",
  },
  {
    id: "ps5031-e31t",
    name: "PS5031-E31T Controller",
    type: "Controller",
    capacity: "N/A",
    interface: "PCIe Gen5 x4",
    formFactor: "Controller ASIC",
    seqRead: "14,500 MB/s",
    seqWrite: "12,700 MB/s",
    randRead: "2.2M IOPS",
    randWrite: "1.1M IOPS",
    endurance: "N/A",
    temperature: "0°C to 70°C",
    solution: "Gaming",
    family: "PS5031",
  },
  {
    id: "pascari-boot",
    name: "Pascari Boot Drive SSD",
    type: "Boot Drive SSD",
    capacity: "480 GB",
    interface: "SATA III",
    formFactor: "M.2 2280",
    seqRead: "560 MB/s",
    seqWrite: "530 MB/s",
    randRead: "95K IOPS",
    randWrite: "85K IOPS",
    endurance: "1 DWPD",
    temperature: "0°C to 70°C",
    solution: "Boot / OS Drive",
    family: "Pascari",
  },
  {
    id: "industrial-m2",
    name: "Industrial M.2 SSD",
    type: "Industrial SSD",
    capacity: "2 TB",
    interface: "PCIe Gen3 x4",
    formFactor: "M.2 2280",
    seqRead: "3,500 MB/s",
    seqWrite: "3,000 MB/s",
    randRead: "500K IOPS",
    randWrite: "450K IOPS",
    endurance: "5 DWPD",
    temperature: "-40°C to 85°C",
    solution: "Edge & Industrial",
    family: "Industrial",
  },
  {
    id: "retimer-ps8801",
    name: "PS8801 PCIe Retimer",
    type: "Signal IC",
    capacity: "N/A",
    interface: "PCIe Gen4",
    formFactor: "BGA",
    seqRead: "N/A",
    seqWrite: "N/A",
    randRead: "N/A",
    randWrite: "N/A",
    endurance: "N/A",
    temperature: "0°C to 85°C",
    solution: "Signal Integrity",
    family: "Signal IC",
  },
  {
    id: "aidaptiv-ssd",
    name: "AI-Optimized Enterprise SSD",
    type: "Enterprise SSD",
    capacity: "30.72 TB",
    interface: "PCIe Gen5 x4",
    formFactor: "E3.S",
    seqRead: "14,000 MB/s",
    seqWrite: "11,000 MB/s",
    randRead: "3M IOPS",
    randWrite: "900K IOPS",
    endurance: "3 DWPD",
    temperature: "0°C to 70°C",
    solution: "Enterprise AI",
    family: "aiDAPTIV",
  },
];
