// Brands.js
import { brandsAtom } from "@/lib/atoms";
import { Skeleton } from "@mantine/core";
import React from "react";
import { useRecoilValueLoadable } from "recoil";

const BrandsFilter = ({ setFilters, filters }) => {
  const brands = useRecoilValueLoadable(brandsAtom);

  if (brands.state === "loading") return <div className="flex flex-col gap-2">{
    Array.from({ length: 5 }).map((_, idx) => (
      <Skeleton height={16} mt={6} width="70%" key={idx} /> // Use a skeleton component for filters
    ))
    }</div>;
  else if (brands.state === "hasValue")
    return (
      <div>
        <div className="mb-4 flex items-center justify-center bg-primaryGradient py-1 text-white shadow-lg rounded-lg">
          Brands
        </div>
        <div className="pl-2">
          { brands.contents?.map((brand, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={brand.id}
                value={brand.id}
                checked={filters.selectedBrand.includes(brand.id)}
                onChange={(event) => {
                  const selectedBrandId = event.target.value;
                  const isChecked = event.target.checked;
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedBrand: isChecked
                      ? [...prevFilters.selectedBrand, selectedBrandId]
                      : prevFilters.selectedBrand.filter(
                          (id) => id !== selectedBrandId
                        ),
                  }));
                }}
              />
              <label htmlFor={brand.id}>{brand.name}</label>
            </div>
          ))}
        </div>
      </div>
    );
};

export default BrandsFilter;
