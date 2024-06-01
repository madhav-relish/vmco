import { cartDataAtom } from "@/lib/atoms";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card } from "@mantine/core";
import React from "react";
import { useSetRecoilState } from "recoil";


const CartCard = ({ data }) => {
  const setCartData = useSetRecoilState(cartDataAtom);

  const handleQuantityChange = (id, delta) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
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
    setCartData((prevCartData) => prevCartData.filter((item) => item.id !== id));
  };

  return (
    <Card className="p-2 border shadow-lg flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div>Category</div>
          <div>{data?.name}</div>
        </div>
        <button onClick={() => handleDelete(data.id)} className="text-red-500">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-between gap-2">
        <div className="text-sm flex flex-col gap-2">
          {/* selling price and unit */}
          <p>
            Selling Unit <span className="px-2 ml-2 border rounded-md border-primaryGolden">Pack</span>
          </p>
          <p>
            Selling Price{" "}
            <span className="px-2 ml-2 border-b border-primaryGolden">
              {"SAR"} {data.sellingPrice}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {/* quantity and plus minus */}
          <p className="flex justify-center">Quantity</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleQuantityChange(data.id, -1)}
              className="px-2  border rounded border-primaryGolden"
            >
              -
            </button>
            <input
              type="number"
              value={data.quantity}
              onChange={(e) => handleQuantityInputChange(data.id, e.target.value)}
              className="w-16 text-center border rounded border-primaryGolden"
              min="1"
            />
            <button
              onClick={() => handleQuantityChange(data.id, 1)}
              className="px-2  border rounded border-primaryGolden"
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
