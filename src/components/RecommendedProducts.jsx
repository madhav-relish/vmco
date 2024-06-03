import { promotedProductsAtom } from "@/lib/atoms";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import ProductsCard from "./Products/ProductsCard";
import { Loader } from "@mantine/core";

const RecommendedProducts = () => {
  const products = useRecoilValueLoadable(promotedProductsAtom);

  if (products.state === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (products.state === "hasError") {
    return <div>Error loading products</div>;
  }

  return (
    <div className="bg-lightYellow w-full h-96 flex flex-col gap-5 justify-center items-center mb-8 mt-8 py-6 px-10">
      <h1 className="text-3xl font-semibold">Other Products</h1>
      {products.contents.count === 0 ? (
        <div className="h-72 flex justify-center items-center">
          No Recommended Products Available At The Moment
        </div>
      ) : (
        <Carousel
          
          classNames={{
            container: "p-4 w-[300px] md:w-[500px] lg:w-[900px]",
            slide: "max-w-[200px] md:max-w-[400px]",
            
          }}
          controlSize={40}
          slideSize={{ base: "100%", sm: "75%", md: "33.333333%", lg: "25%" }}
          slidesToScroll={{ base: "1", sm: "1", md: "1", lg: "1" }}
          slideGap={"sm"}
          loop
          align="start"
          //  withControls={false}
        >
          {products.contents?.results?.map((product) => (
            <Carousel.Slide key={product.id}>
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
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default RecommendedProducts;
