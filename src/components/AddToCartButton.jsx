import { allProductsAtom, cartDataAtom } from "@/lib/atoms";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useCart from "../hooks/useCart";

const AddToCartButton = (props) => {
  const {
    id,
    brandName,
    name,
    marketingTag,
    thumbnail,
    code,
    arabicName,
    sellingPrice,
    discount,
  } = props;

  const { addToCart } = useCart();
  const handleAddItem = () => {
    const newItem = {
      id,
      brandName,
      name,
      marketingTag,
      thumbnail,
      code,
      arabicName,
      sellingPrice,
      discount,
    };
    addToCart(newItem);
  };
  return (
    <div
      onClick={handleAddItem}
      className="p-2 font-semibold rounded  bg-orange-400  w-full text-white flex justify-center items-center cursor-pointer hover:shadow-md"
    >
      Add to Request Quote
    </div>
  );
};

export default AddToCartButton;
