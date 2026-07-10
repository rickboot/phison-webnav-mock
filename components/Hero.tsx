import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  compact?: boolean;
  children?: React.ReactNode;
};

export default function Hero({ title, subtitle, description, compact = false, children }: HeroProps) {
  if (compact) {
    return (
      <section className="page-hero-navy text-white">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-10 md:py-12">
          {subtitle && <p className="text-[0.8125rem] font-medium text-phison-orange mb-2">{subtitle}</p>}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-3 max-w-3xl text-[0.9375rem] text-white/70 leading-relaxed">{description}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero-navy text-white min-h-[320px] flex items-center">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-16 md:py-20 w-full">
        {subtitle && <p className="text-[0.8125rem] font-medium text-phison-orange mb-3">{subtitle}</p>}
        <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight leading-tight max-w-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-[0.9375rem] text-white/70 leading-relaxed">{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-phison-border">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-2.5">
        <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-phison-muted">
          <li><Link href="/" className="hover:text-phison-orange transition-colors">Home</Link></li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="text-phison-border">/</span>
              {item.href
                ? <Link href={item.href} className="hover:text-phison-orange transition-colors">{item.label}</Link>
                : <span className="text-phison-navy font-medium">{item.label}</span>
              }
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export function CTABand() {
  return (
    <section className="feature-bar text-white">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold">Partner with Phison on your next storage innovation</h2>
            <p className="mt-2 text-[0.875rem] text-white/60 max-w-lg">
              Connect with our sales and engineering teams to evaluate products and custom programs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact-sales" className="btn-pill-orange">Contact Sales</Link>
            <Link href="/resources" className="btn-pill-white">View Resources</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
