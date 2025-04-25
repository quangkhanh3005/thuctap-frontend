"use client";
import { ReactNode, useEffect } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";

type Props ={
  children: ReactNode;
};
const RootLayout =({children}:Props)=>{
  const path=usePathname();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[path])
  return (
    <html lang="vi">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
export default RootLayout;
