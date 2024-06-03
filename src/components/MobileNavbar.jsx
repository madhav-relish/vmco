import { Badge, Burger } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import LogoImage from "../../public/images/logo.png";
import MobileDrawer from "./MobileDrawer";
import { cartDataAtom, cartOpenAtom } from "@/lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const MobileNavbar = () => {
  const cartItems = useRecoilValue(cartDataAtom);
  const cartOpen = useSetRecoilState(cartOpenAtom);
  const [opened, setOpened] = useState(false);
  const handleClose = () => {
    setOpened(false);
  };
  return (
    <div className="flex justify-between items-center bg-primaryDark w-full px-8 py-3">
      <Burger
        onClick={() => setOpened(true)}
        opened={opened}
        onClose={() => setOpened(false)}
        color="white"
      />
      <div>
        <Image src={LogoImage} alt="VMCO Gulf" className="w-40 h-full object-cover" />
      </div>
      <div className="relative">
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 p-2 flex items-center justify-center rounded-full w-5 h-5 bg-orange-500 text-white">
            {cartItems?.length}
          </div>
        )}
        <Badge
          variant="light"
          size="lg"
          onClick={() => cartOpen(true)}
          className="cursor-pointer border-primaryGolden h-10 px-2"
        >
          <ShoppingCartIcon color="inherit" className="size-6"/>
        </Badge>
      </div>
      <MobileDrawer opened={opened} onClose={handleClose} />
    </div>
  );
};

export default MobileNavbar;
