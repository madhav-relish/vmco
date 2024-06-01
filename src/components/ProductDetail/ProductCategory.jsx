import React from 'react';

const ProductCategory = ({ productData }) => {
  return (
    <div>
      <h2 className="font-semibold mb-4">Product Category</h2>
      <div className="flex flex-col gap-3 ml-3 max-w-72">
        <div className="flex justify-between">
          <p className="">Brand Name</p>{" "}
          <div>{productData?.brand_data?.name}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Banner Category</p>{" "}
          <div>{productData?.banner_category_data?.name}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Sub Category 1</p>{" "}
          <div>{productData?.food ? "Food" : "Non-Food"}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Sub Category 2</p>{" "}
          <div>{productData?.sub_category_data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
