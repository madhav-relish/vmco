import React, { Suspense } from "react";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { Divider, Image } from "@mantine/core";
import ProductDescription from "./ProductDescription";
import ProductCategory from "./ProductCategory";
import Details from "./Details";
import ProductCatalogue from "./ProductCatalogue";
import dynamic from "next/dynamic";
import AddToCartButton from "../AddToCartButton";

const RecommendedProducts = dynamic(() => import("../RecommendedProducts")) 
const ProductDetail = ({ productData }) => {
  console.log(productData.catalouge)
  return (
    <div className="flex flex-col pb-16 p-5">
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Image Carousel */}
        <div className="md:sticky top-[100px] md:self-start">
          <Carousel loop withIndicators w={400} height={400}>
            {productData.images?.map((image, idx) => (
              <Carousel.Slide key={idx}>
                <Image
                
                
                  className="object-cover w-full h-full"
                  src={image.image}
                  alt={`Product image ${idx + 1}`}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
          <div className="flex w-full justify-between gap-2 mt-2">
           <AddToCartButton
           id={productData?.id}
           name={productData?.name}
           arabicName={productData?.arabic_name}
           brandName={productData.brand_data?.name}
           marketingTag={productData?.marketing_tag_data?.name}
           thumbnail={productData?.images ? productData?.images[0]?.image : null}
           code={productData?.code}
           sellingPrice={productData?.selling_price}
           discount={productData?.discount}
           />
            {/* <div className="p-2 flex gap-3 border-primaryGolden border">
              + <span>10</span> -{" "}
            </div> */}
          </div>
        </div>

        {/* Details part */}
        <div className="flex flex-col gap-4 max-w-[600px]">
          {/* Brand and Product Name */}
          <div>
            <h2 className="text-2xl font-semibold">
              {productData?.brand_data?.name}
            </h2>
            <p className="text-mutedGray">{productData?.name}</p>
            <p className="text-mutedGray">{productData?.arabic_name}</p>
          </div>
          <Divider />

          <ProductDescription productData={productData} />
          <Divider className="mt-6" />

          <ProductCategory productData={productData} />
          <Divider className="mt-6" />

          <Details productData={productData} />
          <Divider className="mt-6" />

          <ProductCatalogue catalouge={productData?.catalouge} name={productData?.name} />
        </div>
      </div>
      {/* Recommended Products Section */}
      <Suspense fallback={<p>Loading...</p>}>

      <RecommendedProducts 
      
      />
      </Suspense>
    </div>
  );
};

export default ProductDetail;