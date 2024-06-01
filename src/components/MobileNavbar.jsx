import { Burger } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import LogoImage from "../../public/images/logo.png";
import { useDisclosure } from "@mantine/hooks";
import MobileDrawer from "./MobileDrawer";

const MobileNavbar = () => {
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
        <Image src={LogoImage} className="w-40 h-full object-cover" />
      </div>
      <div></div>
      <MobileDrawer opened={opened} onClose={handleClose} />
    </div>
  );
};

export default MobileNavbar;
