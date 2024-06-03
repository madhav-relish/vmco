import React from "react";
import { Skeleton, Tooltip } from "@mantine/core";
import CardSkeleton from "../CardSkeleton"; // Assuming you have a skeleton component for the filter

const SubCategoryFilter = ({ subCategory, setFilters, filters, loading }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center bg-primaryGradient py-1 text-white shadow-lg rounded-lg">
        Sub-Categories
      </div>
      <div className="pl-2">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton height={16} mt={6} width="70%" key={idx} /> // Use a skeleton component for filters
          ))
        ) : (
          subCategory?.map((category, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="focus:bg-primary cursor-pointer"
                id={category.id}
                value={category.id}
                checked={filters?.selectedSubcategory?.includes(category.id)}
                onChange={(event) => {
                  const selectedCategoryId = event.target.value;
                  const isChecked = event.target.checked;
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedSubcategory: isChecked
                      ? [...prevFilters.selectedSubcategory, selectedCategoryId]
                      : prevFilters.selectedSubcategory.filter(
                          (id) => id !== selectedCategoryId
                        ),
                  }));
                }}
              />
              <label htmlFor={category.id} className="truncate">
                {category.name.length > 20 ? (
                  <Tooltip label={category.name}>
                    <span>{category.name.substring(0, 15)}...</span>
                  </Tooltip>
                ) : (
                  category.name
                )}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
