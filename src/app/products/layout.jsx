"use client";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Products/Navbar";
import Cart from "@/components/Products/cart/Cart";
import CartButton from "@/components/Products/cart/CartButton";
import { RecoilRoot } from "recoil";

const DashboardRootLayout = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="fixed hidden lg:block top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="fixed block lg:hidden top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>
      {children}
      <div className="fixed right-0 top-[40vh]">
        <CartButton />
        <Cart />
      </div>
    </RecoilRoot>
  );
};

export default DashboardRootLayout;
