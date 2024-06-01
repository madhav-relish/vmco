import { cartDataAtom, cartOpenAtom } from "@/lib/atoms";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon, XIcon } from "@heroicons/react/24/solid";
import { Badge, CloseButton, Input } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useDebouncedValue } from "@mantine/hooks";

const Filters = () => {
  const cartItems = useRecoilValue(cartDataAtom);
  const cartOpen = useSetRecoilState(cartOpenAtom);
  const params = useSearchParams();
  const router = useRouter();
  const categoryParam = params?.get("category");
  const searchParam = params?.get("search") || "";

  const [searchValue, setSearchValue] = useState(searchParam);
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

  useEffect(() => {
    // Reset search value when category changes
    setSearchValue("");
  }, [categoryParam]);


  const formatCategoryName = (name) => {
    if (!name) return "";
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    router.push(`?category=${categoryParam || ''}&search=${debouncedSearchValue}`);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const formattedCategoryName = formatCategoryName(categoryParam);

  return (
    <div className="shadow-lg z-20 h-16 w-full  px-16 flex justify-between items-center  pr-16 border-b-gray-400">
      <h1 className="hidden md:block text-2xl w-full font-semibold">{formattedCategoryName}</h1>
      <div className="w-full flex justify-end items-center gap-5">
      <div className="flex items-center w-[375px] max-w-[375px]">
        <Input
          className="rounded-full flex-grow"
          classNames={{
            input: "rounded-full px-3",
          }}
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
        <button
          className="ml-1 rounded-full bg-primary text-white"
          onClick={handleSearchClick}
        >
          <MagnifyingGlassCircleIcon color="orange" className=" size-10" />
        </button>
      </div>

      <div className="relative">
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 p-2 flex items-center justify-center rounded-full w-5 h-5 bg-orange-500 text-white">
            {cartItems?.length}
          </div>
        )}
        <Badge
          variant="light"
          size="lg"
          onClick={() => cartOpen(true)}
          className="cursor-pointer border-primaryGolden h-10 w-24"
        >
          ITEMS
        </Badge>
      </div>
      </div>
    </div>
  );
};

export default Filters;
