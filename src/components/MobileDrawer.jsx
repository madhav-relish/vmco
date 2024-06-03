import { bannerCategoryAtom } from "@/lib/atoms";
import { navbarItems } from "@/lib/constants";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  List,
  ListItem,
  NavLink,
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import CategoriesIcon from "./Icons/CategoriesICon";

const MobileDrawer = ({ opened, onClose }) => {
  const pinned = useHeadroom({ fixedAt: 120 });
  const router = useRouter();
  const params = useSearchParams();
  let currentCategory = params?.get("category");

  const bannerCategoryLoadable = useRecoilValueLoadable(bannerCategoryAtom);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "_");
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
    <Drawer
      className="p-0"
      classNames={{
        content: "bg-primaryDark",
        header: "bg-primaryDark px-5",
        inner: "max-w-72",
        title: "text-white font-semibold text-2xl",
        body: "p-0"
      }}
      opened={opened}
      onClose={onClose}
      title="Menu"
    >
      <DrawerBody className="p-0 text-white h-full mt-8">
        
        <List className="flex flex-col gap-10">
          {navbarItems.map((item, idx) => (
            <ListItem className="w-full border-b px-6 border-mutedGray" key={idx}>
              <Link
                className="flex items-center gap-4 w-full"
                href={item.link}
                alt={item.label}
              >
                {item.icon}
                {item.label}
              </Link>
            </ListItem>
          ))}
          
          <ListItem
          
            className="w-full"
          >
            <NavLink
              classNames={{
                children: "flex flex-col gap-3 w-full pt-3 ml-5",
              }}
              label={"Categories"}
              leftSection={<CategoriesIcon/>}
              className="flex  p-0 w-48 justify-center rounded hover:bg-transparent gap-3 ml-2 pl-5"
            >
              {bannerCategoryLoadable.state === "loading" && <p>Loading...</p>}
              {bannerCategoryLoadable.state === "hasValue" &&
                bannerCategoryLoadable.contents.map((categoryItem, idx) => {
                  const slug = generateSlug(categoryItem.name);
                  if (!currentCategory && idx === 0) {
                    currentCategory = slug;
                  }
                  return (
                    <div
                      className={`flex p-2 items-center gap-3 px-3   hover:shadow cursor-pointer ${
                        currentCategory === slug
                          ? "border-[1px] rounded-lg border-primaryGolden"
                          : ""
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
                        <div className="w-5 h-5" />
                      )}
                      <p className="text-secondaryWhite">
                        {categoryItem.name}
                      </p>
                    </div>
                  );
                })}
              {bannerCategoryLoadable.state === "hasError" && (
                <p>Error loading categories</p>
              )}
            </NavLink>
          </ListItem>
        </List>
      </DrawerBody>
    </Drawer>
  );
};

export default MobileDrawer;
