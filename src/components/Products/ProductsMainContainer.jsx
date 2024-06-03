import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { ALL_PRODUCTS_API } from "@/lib/api";
import { allProductsAtom, bannerCategoryAtom } from "@/lib/atoms";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const SubCategoryFilter = dynamic(() => import("./SubCategoryFilter"));
// const ProductsCard = dynamic(() => import("./ProductsCard"));
import Filters from "./Filters";
import BrandsFilter from "./BrandsFilter";

import useFetchData from "@/hooks/useFetchData";
import useSubCategories from "@/hooks/useSubCategories";
import CardSkeleton from "../CardSkeleton";
import ProductsCard from "./ProductsCard";

const ProductsMainContainer = () => {
  const params = useSearchParams();
  const categoryParam = params?.get("category");
  const setAllProductsAtom = useSetRecoilState(allProductsAtom);
  const bannerCategoryLoadable = useRecoilValueLoadable(bannerCategoryAtom);

  const formatCategoryName = (param) => {
    if (!param) return null;
    return param
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const {
    data: products,
    loading,
    loadingMore,
    setFilters,
    filters,
  } = useFetchData(ALL_PRODUCTS_API, {
    selectedBrand: [],
    selectedCategory: [],
    selectedSubcategory: [],
  });

  useEffect(() => {
    if (bannerCategoryLoadable.state === "hasValue") {
      const categories = bannerCategoryLoadable.contents;
      let category = null;

      if (categoryParam) {
        const formattedCategoryName = formatCategoryName(categoryParam);
        category = categories.find(
          (cat) =>
            cat.name.toLowerCase() === formattedCategoryName.toLowerCase()
        );
      }

      if (!category && categories.length > 0) {
        category = categories[0];
      }

      if (category) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          selectedCategory: [category.id],
          selectedBrand: [],
          selectedSubcategory: [],
        }));
      }
    }
  }, [bannerCategoryLoadable, categoryParam, setFilters]);

  const subCategories = useSubCategories(filters.selectedCategory[0]);

  useEffect(() => {
    setAllProductsAtom(products);
  }, [products, setAllProductsAtom]);

  return (
    <div className="flex flex-col">
      <Filters
        setFilters={setFilters}
        filters={filters}
        subCategory={subCategories}
      />
      <div className="md:flex w-full md:justify-between gap-1 overflow-hidden">
        <div className="hidden w-[250px] bg-white h-full md:flex flex-col gap-4 border-b rounded-br-lg shadow-2xl z-10 p-2">
          <h1 className="mb-3 font-semibold">Filters</h1>
          <div className="p-0 pb-2 bg-white rounded-lg shadow-lg border-[0.5px] mb-2">
            <SubCategoryFilter
              setFilters={setFilters}
              filters={filters}
              subCategory={subCategories}
              loading={loading}
            />
          </div>

          <div className="p-0 pb-2 bg-white rounded-lg shadow-lg border-[0.5px] mb-2">
            <BrandsFilter setFilters={setFilters} filters={filters} />
          </div>
        </div>
        <div className="flex justify-center md:justify-start w-full gap-x-4 gap-y-10 flex-wrap p-1 pt-3 md:p-4">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : products.length > 0 ? (
            products.map((product, idx) => (
              <div key={idx}>
                <ProductsCard
                  id={product?.id}
                  name={product?.name}
                  arabicName={product?.arabic_name}
                  brandName={product.brand_data?.name}
                  marketingTag={product?.marketing_tag_data?.name}
                  thumbnail={product?.images ? product?.images[0]?.image : null}
                  code={product?.code}
                  sellingPrice={product?.selling_price}
                  discount={product?.discount}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-1/2 flex items-center justify-center">
              No Products Found!
            </div>
          )}
          {loadingMore &&
            Array.from({ length: 12 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsMainContainer;
