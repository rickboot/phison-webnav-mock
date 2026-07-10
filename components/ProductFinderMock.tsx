"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockProducts } from "@/data/pages";
import { useNavVersion } from "./NavVersionProvider";

const defaultFilterOptions = {
  productType: ["Enterprise SSD", "Controller", "Boot Drive SSD", "Industrial SSD", "Signal IC"],
  capacity: ["480 GB", "2 TB", "7.68 TB", "15.36 TB", "30.72 TB", "N/A"],
  interface: ["PCIe Gen5 x4", "PCIe Gen4 x4", "PCIe Gen3 x4", "SATA III", "PCIe Gen4"],
  formFactor: ["U.2", "M.2 2280", "E3.S", "Controller ASIC", "BGA"],
  endurance: ["1 DWPD", "3 DWPD", "5 DWPD", "N/A"],
  temperature: ["0°C to 70°C", "-40°C to 85°C", "0°C to 85°C"],
  solution: [
    "Enterprise AI",
    "Cloud Storage",
    "Gaming",
    "Boot / OS Drive",
    "Edge & Industrial",
    "Signal Integrity",
  ],
  family: ["Pascari", "PS5027", "PS5031", "Industrial", "Signal IC", "aiDAPTIV"],
};

/** Web Team WIP Product Finder filters */
const wipFilterOptions = {
  capacity: ["480 GB", "2 TB", "7.68 TB", "15.36 TB", "30.72 TB", "N/A"],
  solution: [
    "Enterprise AI",
    "Cloud Storage",
    "Gaming",
    "Boot / OS Drive",
    "Edge & Industrial",
    "Signal Integrity",
    "Automotive",
    "HPC",
  ],
  sequential: [
    "Up to 14,000 / 10,000 MB/s",
    "Up to 7,400 / 7,000 MB/s",
    "Up to 3,500 / 3,200 MB/s",
  ],
  random: [
    "Up to 2,500K / 1,000K IOPS",
    "Up to 1,500K / 800K IOPS",
    "Up to 600K / 500K IOPS",
  ],
  formFactor: ["U.2", "M.2 2280", "E3.S", "Controller ASIC", "BGA"],
};

type DefaultFilters = Record<keyof typeof defaultFilterOptions, string>;
type WipFilters = Record<keyof typeof wipFilterOptions, string>;

const emptyDefaultFilters = (): DefaultFilters =>
  Object.fromEntries(
    Object.keys(defaultFilterOptions).map((k) => [k, ""])
  ) as DefaultFilters;

const emptyWipFilters = (): WipFilters =>
  Object.fromEntries(
    Object.keys(wipFilterOptions).map((k) => [k, ""])
  ) as WipFilters;

export default function ProductFinderMock() {
  const { versionId } = useNavVersion();
  const isWip = versionId === "web-team-wip";

  const [defaultFilters, setDefaultFilters] = useState<DefaultFilters>(emptyDefaultFilters);
  const [wipFilters, setWipFilters] = useState<WipFilters>(emptyWipFilters);

  const filtered = useMemo(() => {
    if (isWip) {
      return mockProducts.filter((product) => {
        if (wipFilters.capacity && product.capacity !== wipFilters.capacity) return false;
        if (wipFilters.solution && product.solution !== wipFilters.solution) return false;
        if (wipFilters.formFactor && product.formFactor !== wipFilters.formFactor) return false;
        // Sequential / random are WIP filter UI; soft-match against product specs when possible
        if (wipFilters.sequential) {
          const seq = `${product.seqRead} / ${product.seqWrite}`;
          if (!wipFilters.sequential.includes(product.seqRead) && !seq.includes(product.seqRead)) {
            return false;
          }
        }
        if (wipFilters.random) {
          if (!wipFilters.random.includes(product.randRead)) return false;
        }
        return true;
      });
    }

    return mockProducts.filter((product) => {
      if (defaultFilters.productType && product.type !== defaultFilters.productType) return false;
      if (defaultFilters.capacity && product.capacity !== defaultFilters.capacity) return false;
      if (defaultFilters.interface && product.interface !== defaultFilters.interface) return false;
      if (defaultFilters.formFactor && product.formFactor !== defaultFilters.formFactor) return false;
      if (defaultFilters.endurance && product.endurance !== defaultFilters.endurance) return false;
      if (defaultFilters.temperature && product.temperature !== defaultFilters.temperature) return false;
      if (defaultFilters.solution && product.solution !== defaultFilters.solution) return false;
      if (defaultFilters.family && product.family !== defaultFilters.family) return false;
      return true;
    });
  }, [isWip, defaultFilters, wipFilters]);

  const clearFilters = () => {
    if (isWip) setWipFilters(emptyWipFilters());
    else setDefaultFilters(emptyDefaultFilters());
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white border border-phison-border p-6 sticky top-32">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-phison-orange hover:text-phison-orange-hover"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-5">
              {isWip ? (
                <>
                  <FilterSelect
                    label="Capacity"
                    value={wipFilters.capacity}
                    options={wipFilterOptions.capacity}
                    onChange={(v) => setWipFilters((p) => ({ ...p, capacity: v }))}
                  />
                  <FilterSelect
                    label="Solution"
                    value={wipFilters.solution}
                    options={wipFilterOptions.solution}
                    onChange={(v) => setWipFilters((p) => ({ ...p, solution: v }))}
                  />
                  <FilterSelect
                    label="Sequential read/write"
                    value={wipFilters.sequential}
                    options={wipFilterOptions.sequential}
                    onChange={(v) => setWipFilters((p) => ({ ...p, sequential: v }))}
                  />
                  <FilterSelect
                    label="Random read/write"
                    value={wipFilters.random}
                    options={wipFilterOptions.random}
                    onChange={(v) => setWipFilters((p) => ({ ...p, random: v }))}
                  />
                  <FilterSelect
                    label="Form factor"
                    value={wipFilters.formFactor}
                    options={wipFilterOptions.formFactor}
                    onChange={(v) => setWipFilters((p) => ({ ...p, formFactor: v }))}
                  />
                </>
              ) : (
                <>
                  <FilterSelect
                    label="Product Type"
                    value={defaultFilters.productType}
                    options={defaultFilterOptions.productType}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, productType: v }))}
                  />
                  <FilterSelect
                    label="Capacity"
                    value={defaultFilters.capacity}
                    options={defaultFilterOptions.capacity}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, capacity: v }))}
                  />
                  <FilterSelect
                    label="Interface"
                    value={defaultFilters.interface}
                    options={defaultFilterOptions.interface}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, interface: v }))}
                  />
                  <FilterSelect
                    label="Form Factor"
                    value={defaultFilters.formFactor}
                    options={defaultFilterOptions.formFactor}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, formFactor: v }))}
                  />
                  <FilterSelect
                    label="Endurance"
                    value={defaultFilters.endurance}
                    options={defaultFilterOptions.endurance}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, endurance: v }))}
                  />
                  <FilterSelect
                    label="Temperature Range"
                    value={defaultFilters.temperature}
                    options={defaultFilterOptions.temperature}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, temperature: v }))}
                  />
                  <FilterSelect
                    label="Target Solution"
                    value={defaultFilters.solution}
                    options={defaultFilterOptions.solution}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, solution: v }))}
                  />
                  <FilterSelect
                    label="Product Family"
                    value={defaultFilters.family}
                    options={defaultFilterOptions.family}
                    onChange={(v) => setDefaultFilters((p) => ({ ...p, family: v }))}
                  />
                </>
              )}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filtered.length}</span> products
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-phison-border rounded-lg p-12 text-center">
              <p className="text-gray-500">No products match your current filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-phison-orange hover:text-phison-orange-hover font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-phison-border p-6 card-enterprise"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-phison-orange uppercase tracking-wider">
                        {product.family}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{product.type}</p>
                    </div>
                    <Link
                      href="/contact-sales"
                      className="btn-pill-navy whitespace-nowrap self-start"
                    >
                      Request Info
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <Spec label="Capacity" value={product.capacity} />
                    <Spec label="Interface" value={product.interface} />
                    <Spec label="Form Factor" value={product.formFactor} />
                    <Spec label="Seq. Read" value={product.seqRead} />
                    <Spec label="Seq. Write" value={product.seqWrite} />
                    <Spec label="Rand. Read" value={product.randRead} />
                    <Spec label="Rand. Write" value={product.randWrite} />
                    <Spec label="Endurance" value={product.endurance} />
                    <Spec label="Temperature" value={product.temperature} />
                    <Spec label="Solution" value={product.solution} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-phison-border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-phison-orange/30 focus:border-phison-orange"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className="font-medium text-gray-800">{value}</dd>
    </div>
  );
}
