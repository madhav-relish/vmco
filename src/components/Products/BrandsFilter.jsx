// Brands.js
import { brandsAtom } from "@/lib/atoms";
import React from "react";
import { useRecoilValueLoadable } from "recoil";

const BrandsFilter = ({ setFilters, filters }) => {
  const brands = useRecoilValueLoadable(brandsAtom);

  if (brands.state === "loading") return <div>Loading...</div>;
  else if (brands.state === "hasValue")
    return (
      <div className="pl-1">
        {brands.contents?.map((brand, idx) => (
          <div key={idx} className="flex gap-2">
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
    );
};

export default BrandsFilter;
