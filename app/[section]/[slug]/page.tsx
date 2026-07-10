import { notFound } from "next/navigation";
import PageTemplate from "@/components/PageTemplate";
import { getAllPages, findPage, getSectionById } from "@/data/nav";
import { getPageContent } from "@/data/pages";

export function generateStaticParams() {
  return getAllPages();
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  return params.then(({ section, slug }) => {
    const page = findPage(section, slug);
    if (!page) return { title: "Not Found" };
    return { title: page.label };
  });
}

export default async function SubPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const navSection = getSectionById(section);
  const page = findPage(section, slug);

  if (!navSection || !page) notFound();

  const content = getPageContent(section, slug, page.label);

  return (
    <PageTemplate
      content={content}
      sectionLabel={navSection.label}
      breadcrumbs={[
        { label: navSection.label, href: navSection.href },
        { label: page.label },
      ]}
    />
  );
}
