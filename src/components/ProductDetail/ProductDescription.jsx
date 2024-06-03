import React from 'react';
import { Badge } from '@mantine/core';

const ProductDescription = ({ productData }) => {
  const marketing_tag_name = productData?.marketing_tag_data?.name;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold">Product Description</h2>
      <p className="text-mutedGray text-sm">{productData?.description}</p>
      {productData?.marketing_tag_data && (
        <Badge
          color={
            marketing_tag_name === "Discount"
              ? "green"
              : marketing_tag_name === "New Arrival"
              ? "lime"
              : marketing_tag_name === "Fast Moving"
              ? "blue"
              : marketing_tag_name === "Limited Stock"
              ? "red"
              : ""
          }
          variant="light"
          size="lg"
          radius={"sm"}
        >
          {marketing_tag_name}
        </Badge>
      )}
    </div>
  );
};

export default ProductDescription;
