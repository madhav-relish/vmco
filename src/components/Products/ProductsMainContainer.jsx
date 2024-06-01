import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import { Loader } from '@mantine/core';
import { ALL_PRODUCTS_API } from '@/lib/api';
import { allProductsAtom, bannerCategoryAtom } from '@/lib/atoms';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const SubCategoryFilter = dynamic(()=> import('./SubCategoryFilter'));
const ProductsCard = dynamic(()=>import('./ProductsCard'))
import Filters from './Filters';
import BrandsFilter from './BrandsFilter';

import useFetchData from '@/hooks/useFetchData';
import useSubCategories from '@/hooks/useSubCategories';

const ProductsMainContainer = () => {
  const params = useSearchParams();
  const categoryParam = params?.get('category');
  const setAllProductsAtom = useSetRecoilState(allProductsAtom);
  const bannerCategoryLoadable = useRecoilValueLoadable(bannerCategoryAtom);

  const formatCategoryName = (param) => {
    if (!param) return null;
    return param
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const { data: products, loading, setFilters, filters } = useFetchData(ALL_PRODUCTS_API, {
    selectedBrand: [],
    selectedCategory: [],
    selectedSubcategory: [],
  });

  useEffect(() => {
    if (bannerCategoryLoadable.state === 'hasValue') {
      const categories = bannerCategoryLoadable.contents;
      let category = null;

      if (categoryParam) {
        const formattedCategoryName = formatCategoryName(categoryParam);
        category = categories.find(
          (cat) => cat.name.toLowerCase() === formattedCategoryName.toLowerCase()
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
      <Filters />
      <div className="flex justify-between gap-1 overflow-hidden">
        <div className="w-[250px] bg-white h-full flex flex-col gap-4  border-b rounded-br-lg shadow-2xl z-10 p-2">
          <h1 className="mb-3 font-semibold">Filters</h1>
          <div className="p-0 pb-2 bg-white rounded-lg shadow-lg border-[0.5px] mb-2">
            <div className="mb-4 flex items-center justify-center bg-primaryGradient py-1 text-white shadow-lg rounded-lg">
             Sub-Categories
            </div>
            <SubCategoryFilter setFilters={setFilters} filters={filters} subCategory={subCategories} />
          </div>

          <div className="p-2 bg-white rounded-lg shadow-lg border-[0.5px] mb-2">
            <div className="mb-4 flex items-center justify-center bg-primaryGradient py-1 text-white shadow-2xl rounded-xl">
              Brands
            </div>
            <BrandsFilter setFilters={setFilters} filters={filters} />
          </div>
        </div>
        <div className="flex w-full gap-x-4 gap-y-10 flex-wrap p-4">
          { products.length === 0 
          ? <div className='w-full h-1/2 flex items-center justify-center'>{loading ? <Loader/> :"No Products Found!"}</div>
          : products.map((product, idx) => (
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
          ))}
        </div>
      </div>
      {loading && (
        <div className="w-full h-[40vh] flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProductsMainContainer;
