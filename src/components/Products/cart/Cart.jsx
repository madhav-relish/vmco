import { cartDataAtom, cartOpenAtom } from "@/lib/atoms";
import { Drawer, DrawerBody, Indicator, ScrollArea } from "@mantine/core";
import React, { Suspense, lazy, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CartCard from "./CartCard";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
const QuotationModal = dynamic(() => import("@/components/QuotationModal"));
// import { CalendarHeart } from "lucide";

const Cart = () => {
  const [open, setOpen] = useRecoilState(cartOpenAtom);
  const cartData = useRecoilValue(cartDataAtom);
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Drawer
     
     classNames={{
      body: "pb-16",
      content:" max-w-[325px] md:max-w-[500px]"
     }}
      scrollAreaComponent={ScrollArea.Autosize}
      opened={open}
      onClose={() => setOpen(false)}
      position="right"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-xl font-semibold self-center">Quotation MANAGEMENT</h1>
        <h4>Add the products that you are interested in, and the quotation will be delivered instantly to your email.</h4>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {cartData.length === 0 && (
          <div className="flex flex-col gap-3 items-center justify-center h-[70vh]">
            {" "}
            <ShoppingCartIcon className="size-8" color="orange" />
            Add Items To View Here{" "}
          </div>
        )}
        {cartData?.map((item, idx) => (
          <CartCard key={idx} data={item} />
        ))}
      </div>

      {cartData.length !== 0 && (
        <div className="fixed flex items-center bottom-0 right-0 w-full h-14">
          {" "}
          <div className="bg-white text-black w-24 justify-center flex items-center p-2 h-full">
            <Indicator size={16} inline label={cartData?.length}>
              {" "}
              ITEMS{" "}
            </Indicator>
          </div>{" "}
          <button
            className="w-full h-full p-2 flex items-center justify-center text-white bg-primaryGradient "
            onClick={() => setOpened(true)}
          >
            Request Quotation
          </button>
          <Suspense fallback={"Loading..."}>
            <QuotationModal opened={opened} onClose={handleClose} />
          </Suspense>
        </div>
      )}
    </Drawer>
  );
};

export default Cart;
