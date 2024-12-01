"use client";

import Image from "next/image";
import Sidebar from "./_components/sidebar";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const publicRoutes = ["/", "/singup"];
  const path = usePathname();
  const isPublicRoute = publicRoutes.includes(path);
  
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
            <div className="lg:ml-[90px] lg:p-12">{children}</div>
          </div>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
