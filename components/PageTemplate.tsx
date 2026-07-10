import Link from "next/link";
import Hero, { Breadcrumb, CTABand } from "@/components/Hero";
import { PageContent } from "@/data/pages";

export default function PageTemplate({
  content,
  breadcrumbs,
  sectionLabel,
}: {
  content: PageContent;
  breadcrumbs: { label: string; href?: string }[];
  sectionLabel: string;
}) {
  return (
    <>
      <Hero title={content.title} subtitle={sectionLabel} compact />
      <Breadcrumb items={breadcrumbs} />
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            {content.overview.map((p, i) => (
              <p key={i} className="text-phison-gray-text leading-relaxed mb-4 text-[0.9375rem]">{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-phison-gray">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <h2 className="text-lg font-bold text-phison-navy mb-5">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.relatedProducts.map((product) => (
              <Link key={product.href} href={product.href} className="group card-enterprise p-5">
                <h3 className="font-semibold text-[0.9375rem] text-phison-navy group-hover:text-phison-orange transition-colors">{product.label}</h3>
                <span className="link-arrow mt-2 text-[0.8125rem]">View product →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <h2 className="text-lg font-bold text-phison-navy mb-5">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.relatedResources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="group card-enterprise p-5">
                <h3 className="font-semibold text-[0.9375rem] text-phison-navy group-hover:text-phison-orange transition-colors">{resource.label}</h3>
                <span className="link-arrow mt-2 text-[0.8125rem]">View resource →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
