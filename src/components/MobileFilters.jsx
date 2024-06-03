import { Button, Popover } from "@mantine/core";
import React from "react";

import Image from "next/image";
import FilterIcon from "./Icons/FilterIcon";
import BrandsFilter from "./Products/BrandsFilter";
import SubCategoryFilter from "./Products/SubCategoryFilter";
const MobileFilters = ({ setFilters, filters, subCategory }) => {
  return (
    <Popover
      classNames={{
        dropdown: "h-96 overflow-y-auto shadow-lg border",
      }}
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      offset={1}
    >
      <Popover.Target>
        <Button variant="transparent" className="p-0">
          <FilterIcon />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="text-primaryGolden font-semibold text-xl mb-4 p-2 border-b">
          Filters
        </div>
        <div className="rounded-xl shadow-lg border mb-6">
          <SubCategoryFilter
            setFilters={setFilters}
            filters={filters}
            subCategory={subCategory}
          />
        </div>
        <div className="rounded-xl shadow-lg border mb-6">
          <BrandsFilter setFilters={setFilters} filters={filters} />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default MobileFilters;
