import { useRecoilState } from "recoil";
import { cartDataAtom } from "@/lib/atoms";

const useCart = () => {
  const [cartData, setCartData] = useRecoilState(cartDataAtom);

  const addToCart = (item) => {
    setCartData((prevCartData) => {
      const existingItem = prevCartData.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartData, { ...item, quantity: 1 }];
      }
    });
  };

  return { cartData, addToCart };
};

export default useCart;
