"use client";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Products/Navbar";
import Cart from "@/components/Products/cart/Cart";
import CartButton from "@/components/Products/cart/CartButton";
import { RecoilRoot } from "recoil";

const DashboardRootLayout = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col min-h-screen">
        <div className="fixed hidden lg:block top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="fixed block lg:hidden top-0 left-0 right-0 z-50">
          <MobileNavbar />
        </div>
        <div className="flex-grow ">
          {children}
        </div>
        <div className="hidden md:block fixed right-0 top-[40vh]">
          <CartButton />
          <Cart />
        </div>
        <Footer />
      </div>
    </RecoilRoot>
  );
};

export default DashboardRootLayout;
