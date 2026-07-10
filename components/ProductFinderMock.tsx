"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockProducts } from "@/data/pages";

const filterOptions = {
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

type Filters = Record<keyof typeof filterOptions, string>;

const emptyFilters = (): Filters =>
  Object.fromEntries(
    Object.keys(filterOptions).map((k) => [k, ""])
  ) as Filters;

export default function ProductFinderMock() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const filtered = useMemo(() => {
    return mockProducts.filter((product) => {
      if (filters.productType && product.type !== filters.productType) return false;
      if (filters.capacity && product.capacity !== filters.capacity) return false;
      if (filters.interface && product.interface !== filters.interface) return false;
      if (filters.formFactor && product.formFactor !== filters.formFactor) return false;
      if (filters.endurance && product.endurance !== filters.endurance) return false;
      if (filters.temperature && product.temperature !== filters.temperature) return false;
      if (filters.solution && product.solution !== filters.solution) return false;
      if (filters.family && product.family !== filters.family) return false;
      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(emptyFilters());

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
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
              <FilterSelect
                label="Product Type"
                value={filters.productType}
                options={filterOptions.productType}
                onChange={(v) => updateFilter("productType", v)}
              />
              <FilterSelect
                label="Capacity"
                value={filters.capacity}
                options={filterOptions.capacity}
                onChange={(v) => updateFilter("capacity", v)}
              />
              <FilterSelect
                label="Interface"
                value={filters.interface}
                options={filterOptions.interface}
                onChange={(v) => updateFilter("interface", v)}
              />
              <FilterSelect
                label="Form Factor"
                value={filters.formFactor}
                options={filterOptions.formFactor}
                onChange={(v) => updateFilter("formFactor", v)}
              />
              <FilterSelect
                label="Endurance"
                value={filters.endurance}
                options={filterOptions.endurance}
                onChange={(v) => updateFilter("endurance", v)}
              />
              <FilterSelect
                label="Temperature Range"
                value={filters.temperature}
                options={filterOptions.temperature}
                onChange={(v) => updateFilter("temperature", v)}
              />
              <FilterSelect
                label="Target Solution"
                value={filters.solution}
                options={filterOptions.solution}
                onChange={(v) => updateFilter("solution", v)}
              />
              <FilterSelect
                label="Product Family"
                value={filters.family}
                options={filterOptions.family}
                onChange={(v) => updateFilter("family", v)}
              />
            </div>
          </div>
        </aside>

        {/* Results */}
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
