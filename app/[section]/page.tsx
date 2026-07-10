import { notFound } from "next/navigation";
import Hero, { Breadcrumb, CTABand } from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import { topNav, getSectionById, getAllSectionItems } from "@/data/nav";

const validSections = topNav.map((s) => s.id);

export function generateStaticParams() {
  return validSections.map((section) => ({ section }));
}

export function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  return params.then(({ section }) => {
    const navSection = getSectionById(section);
    if (!navSection) return { title: "Not Found" };
    return { title: navSection.label };
  });
}

export default async function SectionLandingPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = await params;
  const section = getSectionById(sectionId);

  if (!section) notFound();

  const items = getAllSectionItems(section).map((item) => ({
    title: item.label,
    description: item.description,
    href: item.href,
    group: section.groups
      ? section.groups.find((g) => g.items.some((i) => i.href === item.href))?.title
      : undefined,
  }));

  return (
    <>
      <Hero
        title={section.label}
        description={section.landingDescription}
        compact
      />
      <Breadcrumb items={[{ label: section.label }]} />

      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <CardGrid items={items} columns={section.groups ? 3 : 4} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
