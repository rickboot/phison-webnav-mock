import Link from "next/link";
import Hero, { Breadcrumb, CTABand } from "@/components/Hero";

export const metadata = {
  title: "Contact Sales",
};

export default function ContactSalesPage() {
  return (
    <>
      <Hero
        title="Contact Sales"
        description="Connect with Phison sales teams to discuss products, custom solutions, and partnership opportunities."
        compact
      />
      <Breadcrumb items={[{ label: "Contact Sales" }]} />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                This is a mock contact form for the 2027 IA prototype. In production,
                this page would connect to Phison&apos;s CRM and regional sales routing.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full border border-phison-border rounded px-3 py-2 text-sm" placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full border border-phison-border rounded px-3 py-2 text-sm" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full border border-phison-border rounded px-3 py-2 text-sm" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-phison-border rounded px-3 py-2 text-sm" placeholder="email@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Area</label>
                  <select className="w-full border border-phison-border rounded px-3 py-2 text-sm bg-white">
                    <option>Enterprise Storage</option>
                    <option>AI Solutions</option>
                    <option>Controllers</option>
                    <option>Custom / IMAGIN+</option>
                    <option>Signal IC</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-phison-border rounded px-3 py-2 text-sm" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="btn-pill-orange">
                  Submit Inquiry
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Regional Offices
              </h2>
              <div className="space-y-6">
                {[
                  { region: "Headquarters — Taiwan", detail: "Zhunan, Miaoli County" },
                  { region: "Americas", detail: "San Jose, California" },
                  { region: "Europe", detail: "Amsterdam, Netherlands" },
                  { region: "Asia Pacific", detail: "Singapore, Tokyo, Seoul" },
                ].map((office) => (
                  <div key={office.region} className="border border-phison-border rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900">{office.region}</h3>
                    <p className="text-sm text-gray-500 mt-1">{office.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-500">
                For technical support, visit our{" "}
                <Link href="/support" className="text-phison-orange hover:underline">
                  Support Center
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
