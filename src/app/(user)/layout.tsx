"use client";
import Banner from "@/components/AdvertiserComponents/Banner";
import Footer from "@/components/AdvertiserComponents/Footer";
import SildeBar from "@/components/AdvertiserComponents/SideBar";
import HeaderUser from "@/components/UserComponents/HeaderUser";
import Navigation from "@/components/UserComponents/Navigate";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const UserLayout = ({ children }: Props) => {
  return (
    <div>
      <HeaderUser />
      <div className="bg-gray-50 py-6 px-6 min-h-screen">
        <Navigation />
        {children}
      </div>
    </div>
  );
};
export default UserLayout;
