import { cartDataAtom } from "@/lib/atoms";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Badge, Card } from "@mantine/core";
import React from "react";
import { useSetRecoilState } from "recoil";

const CartCard = ({ data }) => {
  const setCartData = useSetRecoilState(cartDataAtom);

  const handleQuantityChange = (id, delta) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleQuantityInputChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.id !== id)
    );
  };

  return (
    <Card className="p-2 border shadow-lg flex flex-col gap-6">
      <div className="flex justify-between items-center ">
        <div>
          <Badge variant="light" radius={"md"} classNames={{
            root: "py-4 mb-3",
            
          }}>Category</Badge>
          <div>{data?.name}</div>
        </div>
        <button onClick={() => handleDelete(data.id)} className="">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className=" border-b md:hidden"></div>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="text-sm flex flex-col justify-between gap-2">
          {/* selling price and unit */}
          <p className="flex justify-between items-center md:flex-none">
            Selling Unit{" "}
            <span className="px-2 ml-2 border rounded-md border-primaryGolden">
              Pack
            </span>
          </p>
          <p className="flex justify-between items-center md:flex-none">
            Selling Price{" "}
            <span className="px-2 ml-2 border-b border-primaryGolden">
              {"SAR"} {data.sellingPrice}
            </span>
          </p>
        </div>
        <div className="my-2 border-b md:hidden"></div>
        <div className="flex justify-between md:flex-col gap-2">
          {/* quantity and plus minus */}
          <p className="flex justify-center">Quantity</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleQuantityChange(data.id, -1)}
              className="px-2  border rounded bg-offWhite"
            >
              -
            </button>
            <input
              type="number"
              value={data.quantity}
              onChange={(e) =>
                handleQuantityInputChange(data.id, e.target.value)
              }
              className="w-16 text-center border rounded "
              min="1"
            />
            <button
              onClick={() => handleQuantityChange(data.id, 1)}
              className="px-2  border rounded bg-offWhite"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartCard;
