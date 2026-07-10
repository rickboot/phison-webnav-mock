import Hero, { Breadcrumb, CTABand } from "@/components/Hero";
import ProductFinderMock from "@/components/ProductFinderMock";

export const metadata = {
  title: "Product Finder",
};

export default function ProductFinderPage() {
  return (
    <>
      <Hero
        title="Product Finder"
        description="Search and filter Phison enterprise SSDs, controllers, signal ICs, and embedded storage products. This is a mock interface for IA prototype review."
        compact
      />
      <Breadcrumb items={[{ label: "Product Finder" }]} />
      <ProductFinderMock />
      <CTABand />
    </>
  );
}
