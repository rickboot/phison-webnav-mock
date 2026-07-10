import Link from "next/link";
import Image from "next/image";

type CardItem = { title: string; description: string; href: string; group?: string };

export default function CardGrid({ items, columns = 3 }: { items: CardItem[]; columns?: 2 | 3 | 4 }) {
  const colClass = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-5`}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group block card-enterprise p-6">
          {item.group && <span className="section-eyebrow text-[0.6875rem]">{item.group}</span>}
          <h3 className="mt-1 text-base font-semibold text-phison-navy group-hover:text-phison-orange transition-colors">{item.title}</h3>
          <p className="mt-2 text-[0.875rem] text-phison-gray-text leading-relaxed">{item.description}</p>
          <span className="link-arrow mt-4 text-[0.8125rem]">Learn more →</span>
        </Link>
      ))}
    </div>
  );
}

export function NewsCard({
  title,
  date,
  image,
  href = "#",
}: {
  title: string;
  date: string;
  image?: string;
  href?: string;
}) {
  return (
    <article className="news-card">
      {image && (
        <Link href={href} className="news-card-image">
          <Image
            src={image}
            alt=""
            width={640}
            height={400}
            className="w-full h-auto"
          />
        </Link>
      )}
      <div className="news-card-body">
        <h3 className="news-card-title">
          <Link href={href}>{title}</Link>
        </h3>
        <time className="news-card-date">{date}</time>
        <Link href={href} className="news-card-readmore">Read More</Link>
      </div>
    </article>
  );
}
