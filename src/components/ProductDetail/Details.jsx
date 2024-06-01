import React from 'react';

const Details = ({ productData }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold">Product Details</h2>
      <div className="flex flex-col gap-3 ml-3 max-w-72">
        <div className="flex justify-between">
          <p className="">More Info</p>{" "}
          <div>{productData?.other_details?.more_info}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Model Number</p>{" "}
          <div>{productData?.other_details?.model_no}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Color/Flavour</p>{" "}
          <div>{productData?.other_details?.colour}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Size/Dimensions</p>{" "}
          <div>{productData?.other_details?.size_dimensions}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Selling Unit</p>{" "}
          <div>{productData?.other_details?.selling_unit}</div>
        </div>
        <div className="flex justify-between">
          <p className="">Conversion</p>{" "}
          <div>{productData?.other_details?.conversion}</div>
        </div>
      </div>
    </div>
  );
};

export default Details;
