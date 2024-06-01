import Image from "next/image";
import React, { useEffect } from "react";
import LogoImage from "../../../public/images/logo.png";
import { List, ListItem, rem } from "@mantine/core";
import Link from "next/link";
import { useHeadroom } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValueLoadable } from "recoil";
import { bannerCategoryAtom } from "@/lib/atoms";

const Navbar = () => {
  const pinned = useHeadroom({ fixedAt: 120 });
  const router = useRouter();
  const params = useSearchParams();
  let currentCategory = params?.get("category");

  const bannerCategoryLoadable = useRecoilValueLoadable(bannerCategoryAtom);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '_');
  };

  useEffect(() => {
    if (!currentCategory && bannerCategoryLoadable.state === "hasValue") {
      const firstCategory = bannerCategoryLoadable.contents[0];
      const firstCategorySlug = generateSlug(firstCategory.name);
      router.replace(`/products?category=${firstCategorySlug}`);
    }
  }, [currentCategory, bannerCategoryLoadable, router]);

  const handleCategoryClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <div
      style={{
        transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
        transition: "transform 500ms ease",
      }}
      className="p-2 px-12 pt-2  bg-primaryDark w-full h-24"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <Image src={LogoImage} className="w-40 h-full object-cover" />
          </div>
          <div className="flex">
            <List className="flex justify-between gap-10 w-full text-secondaryWhite">
              <ListItem>Home</ListItem>
              <ListItem>
                <Link href="/products">Products</Link>
              </ListItem>
              <ListItem>Ecommerce</ListItem>
              <ListItem>En</ListItem>
            </List>
          </div>
        </div>
        <div className="flex w-full justify-center gap-3">
          {bannerCategoryLoadable.state === "loading" && <p>Loading...</p>}
          {bannerCategoryLoadable.state === "hasValue" &&
            bannerCategoryLoadable.contents.map((categoryItem, idx) => {
              const slug = generateSlug(categoryItem.name);
              if (!currentCategory && idx === 0) {
                currentCategory = slug;
              }
              return (
                <div
                  className={`flex items-center gap-3 p-1 px-3 border-[1px] rounded-xl hover:shadow cursor-pointer ${
                    currentCategory === slug
                      ? "border-primaryGolden"
                      : "border-[1px] border-lightBrown hover:border-primaryGolden"
                  }`}
                  key={idx}
                  onClick={() => handleCategoryClick(slug)}
                >
                  {categoryItem.icon ? (
                    <Image
                      src={categoryItem.icon}
                      width={20}
                      height={20}
                      alt={categoryItem.name}
                    />
                  ) : (
                    <div style={{ width: 20, height: 20 }} />
                  )}
                  <p className="text-secondaryWhite text-xs">{categoryItem.name}</p>
                </div>
              );
            })}
          {bannerCategoryLoadable.state === "hasError" && <p>Error loading categories</p>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
