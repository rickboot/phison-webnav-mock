import Link from "next/link";
import Image from "next/image";

export default function HomeValueProp() {
  return (
    <section className="home-value-prop">
      <div className="home-value-prop-inner">
        <h2>
          A World Leader in NAND Controllers
          <br />
          &amp; Flash Storage Solutions
        </h2>
        <p className="value-subhead">
          NAND Services and Solutions Trusted by the Top ODM, OEM,
          <br className="hidden lg:inline" />
          Enterprise, and Consumer Technology Providers
        </p>
        <Link href="/solutions" className="border-btn">
          Learn more
        </Link>
      </div>
    </section>
  );
}

export function FeatureBar() {
  const capabilities = [
    <>Consumer, <br />industrial &amp; enterprise <br />NAND SSDs</>,
    <>NAND <br />controller ASIC <br />development</>,
    <>Custom, <br />private label NAND <br />Flash solutions</>,
    <>Flash-focused Artificial <br />Intelligence</>,
    <>Industry leading <br />signal conditioning IC <br />(retimer/redriver)</>,
  ];

  return (
    <section className="feature-bar">
      <div className="feature-bar-inner">
        <p className="intro">
          An innovator in NAND Flash technologies for more than 20 years, Phison delivers a
          <br className="hidden md:inline" />
          {" "}holistic vision for high-performance storage in the modern data ecosystem
        </p>
        <ul className="feature-cols">
          {capabilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PascariSection() {
  return (
    <section className="pascari-section">
      <h2 className="pascari-heading">
        Introducing Enterprise SSD Product Line by Phison
      </h2>
      <div className="pascari-flex">
        <div className="pascari-box">
          <Image
            src="/phison-original/pascari-logo-blue.webp"
            alt="PASCARI"
            width={227}
            height={40}
            className="mb-2.5"
          />
          <h3>Engineering Imagination, Together</h3>
          <p>
            We believe in accelerating enterprise innovation by empowering our customers to
            turn imagination into reality. Engage with us as a true technology partner through
            the engineering of custom storage systems or by using any one of our off-the-shelf
            SSDs that are ready to go.
          </p>
        </div>
        <div className="pascari-box pascari-box-pattern">
          <h4>
            Now, PASCARI makes it easier than ever for
            <br />
            customers to get enterprise SSDs with outstanding:
          </h4>
          <p className="pascari-acronym">
            <strong>P</strong>erformance<br />
            <strong>A</strong>I<br />
            <strong>S</strong>ecurity<br />
            <strong>C</strong>apacity<br />
            <strong>A</strong>cceleration<br />
            <strong>R</strong>eliability<br />
            <strong>I</strong>nnovation
          </p>
          <Link href="/products-platforms/enterprise-nvme-ssds" className="pascari-btn">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
