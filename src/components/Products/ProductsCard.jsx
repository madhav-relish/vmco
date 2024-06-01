"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@mantine/core";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCart from "../../hooks/useCart";


const ProductsCard = (props) => {
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

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddQuoteItem = () => {
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
    <Card
      className="w-60 h-72 p-0 rounded-none bg-transparent transition-transform duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl">
        <Image
          width={50}
          height={50}
          className={`w-60 h-60 border rounded-xl ${isHovered && "rounded-b-none"} shadow-lg`}
          src={thumbnail || "/"} // Provide a fallback URL if thumbnail is missing
          alt={name}
        />
      </div>

      {isHovered ? (
        // Hover element
        <div className="flex h-16 w-60 border border-primaryGolden rounded-b-xl">
          <div
            onClick={handleAddQuoteItem}
            className="p-1 bg-primaryGradient font-semibold rounded-bl-xl text-xs w-48 text-white flex justify-center items-center cursor-pointer hover:shadow"
          >
            Add to Request Quote
          </div>
          <Link
            href={`/products/${code}`}
            className="flex justify-center bg-white rounded-br-xl items-center p-1 text-xs cursor-pointer hover:shadow-inner text-primaryGolden w-24"
          >
            View Details
          </Link>
        </div>
      ) : (
        // Card Footer
        <div className="h-10 px-2 pt-1 overflow-hidden text-sm">
          <div>{brandName}</div>
          <div>{name}</div>
        </div>
      )}
    </Card>
  );
};

export default ProductsCard;
