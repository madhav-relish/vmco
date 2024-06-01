
import { bannerCategoryAtom } from "@/lib/atoms";
import { Tooltip } from "@mantine/core";
import React from "react";
import { useRecoilValueLoadable } from "recoil";

const SubCategoryFilter = ({subCategory, setFilters, filters }) => {
 
    return (
      <div className="pl-1">
        {subCategory?.map((category, idx) => (
          <div key={idx} className="flex gap-2 ">
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
      {/* {category.name.substring(0, 20)}... */}
      {/* <span className="tooltiptext">{category.name}</span> */}
    </Tooltip>
  ) : (
    category.name
  )}
</label>
          </div>
        ))}
      </div>
    );
};

export default SubCategoryFilter;
