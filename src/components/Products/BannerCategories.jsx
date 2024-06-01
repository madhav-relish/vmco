
import { bannerCategoryAtom } from "@/lib/atoms";
import React from "react";
import { useRecoilValueLoadable } from "recoil";

const BannerCategories = ({ setFilters, filters }) => {
  const bannerCategory = useRecoilValueLoadable(bannerCategoryAtom);

  if (bannerCategory.state === "loading") return <div>Loading...</div>;
  else if (bannerCategory.state === "hasValue")
    return (
      <div className="pl-1">
        {bannerCategory.contents?.map((category, idx) => (
          <div key={idx} className="flex gap-2 ">
            <input
              type="checkbox"
              className="focus:bg-primary cursor-pointer"
              id={category.id}
              value={category.id}
              checked={filters?.selectedCategory?.includes(category.id)}
              onChange={(event) => {
                const selectedCategoryId = event.target.value;
                const isChecked = event.target.checked;
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  selectedCategory: isChecked
                    ? [...prevFilters.selectedCategory, selectedCategoryId]
                    : prevFilters.selectedCategory.filter(
                        (id) => id !== selectedCategoryId
                      ),
                }));
              }}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </div>
        ))}
      </div>
    );
};

export default BannerCategories;
