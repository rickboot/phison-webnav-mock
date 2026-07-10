import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import HomeValueProp, { FeatureBar, PascariSection } from "@/components/HomeSections";
import FoundationPanels from "@/components/FoundationPanels";
import { NewsCard } from "@/components/CardGrid";
import { homeNews, homeEsg } from "@/data/pages";

const homeBlog = [
  {
    title: "Powering the World's Most Demanding Workloads",
    date: "May 15, 2026",
    image: "/phison-original/Product-Launch-Blog-D250_X202Z_B200P_1920x1200-1024x640.png",
    href: "/resources/blog",
  },
  {
    title: "How Pascari Enterprise SSDs Accelerate AI at Scale",
    date: "April 28, 2026",
    image: "/phison-original/1-1024x640.png",
    href: "/resources/blog",
  },
  {
    title: "Signal Integrity for Next-Gen PCIe Designs",
    date: "March 12, 2026",
    image: "/phison-original/PascariD206VGraphic_1920x1200_86ahfeqzu.png",
    href: "/resources/blog",
  },
];

export default function HomePage() {
  return (
    <div className="page-surround">
      <HeroCarousel />
      <HomeValueProp />
      <FeatureBar />
      <PascariSection />
      <FoundationPanels />

      <section className="news-section">
        <div className="news-section-inner">
          <h2 className="news-section-title">
            <Link href="/resources/newsroom">Phison News</Link>
          </h2>
          <div className="news-grid">
            {homeNews.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="news-section news-section-alt">
        <div className="news-section-inner">
          <h2 className="news-section-title">
            <Link href="/company/esg">ESG News</Link>
          </h2>
          <div className="news-grid">
            {homeEsg.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="news-section-inner">
          <h2 className="news-section-title">
            <Link href="/resources/blog">Phison Blog</Link>
          </h2>
          <div className="news-grid">
            {homeBlog.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
