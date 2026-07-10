"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide =
  | {
      id: string;
      image: string;
      alt: string;
      kind: "computex";
    }
  | {
      id: string;
      image: string;
      alt: string;
      kind: "d206v";
      title: string;
      cta: string;
      href: string;
    }
  | {
      id: string;
      image: string;
      alt: string;
      kind: "devops";
      href: string;
    }
  | {
      id: string;
      image: string;
      alt: string;
      kind: "x201";
      cta: string;
      href: string;
    };

const slides: Slide[] = [
  {
    id: "computex",
    image: "/phison-original/computex-banner.jpg",
    alt: "COMPUTEX 2026",
    kind: "computex",
  },
  {
    id: "d206v",
    image: "/phison-original/D206V_1920x450.png",
    alt: "PASCARI D206V",
    kind: "d206v",
    title: "Ultra-high-capacity Gen5 storage built for real-world scale",
    cta: "Explore Storage Solutions",
    href: "/products-platforms/enterprise-nvme-ssds",
  },
  {
    id: "devops",
    image: "/phison-original/devops-banner.webp",
    alt: "DevOps Dozen Award",
    kind: "devops",
    href: "https://devopsdozen.com/devops-dozen-2026-tools-and-services-award-winners/",
  },
  {
    id: "x201",
    image: "/phison-original/x201-banner.png",
    alt: "Pascari X201 and D201",
    kind: "x201",
    cta: "Explore Use Cases",
    href: "https://phisonblog.com/powering-the-worlds-most-demanding-workloads/",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-carousel" aria-label="Featured highlights">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-slide ${i === active ? "active" : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className={
              s.kind === "devops"
                ? "object-cover hero-bg-devops"
                : "object-cover object-[center_top]"
            }
            priority={i === 0}
            sizes="100vw"
          />

          {s.kind === "computex" && (
            <div className="hero-caption">
              <div className="hero-caption-computex">
                <div className="hero-logo-row">
                  <Image src="/phison-original/2PhisonLogo.svg" alt="" width={165} height={33} />
                  <Image src="/phison-original/2ComputexLogo.svg" alt="" width={228} height={50} />
                </div>
                <h2 className="hero-title">Evolving Data Storage Intelligence</h2>
                <div className="hero-info">
                  Enabling AI, infrastructure, and
                  <br />
                  system-level performance
                  <br />
                  <span className="hero-o-bg">
                    <b>June 2-5,</b> 2026 | Booth <b>M0411a</b>
                  </span>
                  <br />
                  <span className="hero-font-s">4F, Taipei Nangang Exhibition Center, Hall 1</span>
                </div>
              </div>
            </div>
          )}

          {s.kind === "d206v" && (
            <div className="hero-caption">
              <div className="hero-caption-d206v">
                <h2 className="hero-title-d206v">
                  Ultra-high-capacity Gen5 storage
                  <br />
                  built for real-world scale
                </h2>
                <Link href={s.href} className="hero-btn">
                  {s.cta}
                </Link>
              </div>
            </div>
          )}

          {s.kind === "devops" && (
            <>
              <img
                src="/phison-original/DevOpsDozenAward1920x450_Product.png"
                alt=""
                className="hero-devops-product"
                aria-hidden
              />
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-slide-link"
                aria-label="DevOps Dozen 2026 award winners"
              />
              <div className="hero-caption">
                <div className="hero-caption-devops">
                  <div className="hero-devops-logo">
                    <Image
                      src="/phison-original/DevOpsDozenAward1920x450_Logo.png"
                      alt=""
                      width={219}
                      height={65}
                    />
                  </div>
                  <h2 className="hero-title-devops">
                    Best DevOps Industry
                    <br />
                    Implementation
                  </h2>
                </div>
              </div>
            </>
          )}

          {s.kind === "x201" && (
            <div className="hero-caption">
              <div className="hero-caption-d206v">
                <h2 className="hero-title-d206v">
                  The NEW Pascari X201 and D201 Enterprise{" "}
                  <br className="hero-br-desktop" />
                  SSDs Redefine How Organizations Accelerate{" "}
                  <br className="hero-br-desktop" />
                  AI, Analytics, and Cloud-Scale Performance
                </h2>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn"
                >
                  {s.cta}
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-dot ${i === active ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
