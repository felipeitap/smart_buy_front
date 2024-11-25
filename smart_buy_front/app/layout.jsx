"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";

export default function RootLayout({ children }) {
  const publicRoutes = ["/", "singup"];
  const path = usePathname();
  const isPublicRoute = publicRoutes.includes(path);

  const isMobile = window.innerWidth < 1024;

  return (
    <html lang="pt-br">
      <body>
        {isPublicRoute ? (
          <div className="flex items-center justify-center h-screen">
            <div className="relative hidden lg:block lg:w-[60%] xl:w-[70%] h-full">
              <Image src={"/shaking_hands.png"} fill alt="Logo Smart Buy" />
            </div>
            <div className="p-20 lg:w-[40%] xl:w-[30%]">{children}</div>
          </div>
        ) : (
          <div>
            <Sidebar />
            <div className={`${!isMobile && "ml-[90px] p-12"}`}>{children}</div>
          </div>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
