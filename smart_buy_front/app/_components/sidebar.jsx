"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import { logout } from "../_actions/auth";
import { useAuth } from "../_hooks/useAuth";
import { useEffect } from "react";

export default function Sidebar() {
  const { userType } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return null;
    }
  
  }, [])

  return (
    <div className="fixed items-center shadow-2xl bottom-0 w-full bg-[#c6ccd9] lg:left-0 lg:h-full lg:w-auto lg:flex flex-col ">
      <Image
        className="my-5 hidden lg:block"
        src={"/logo.png"}
        width={50}
        height={30}
        alt="Logo Smart Buy"
      />

      <div className="flex justify-around items-center py-4 lg:flex-col lg:p-5 lg:h-full lg:justify-start lg:gap-8 ">
        <Link href={"/home"}>
          <IoMdHome className="cursor-pointer" size={50} />
        </Link>

        {userType === "cliente" ? (
          <>
            <Link href={"/product"}>
              <AiOutlineProduct className="cursor-pointer" size={50} />
            </Link>
            <Link href={"/alerts"}>
              <FaPlus className="cursor-pointer" size={50} />
            </Link>
          </>
        ) : (
          <Link href={"/bids"}>
            <FaList size={30} className="cursor-pointer" />
          </Link>
        )}
        <RiLogoutBoxLine
          className="cursor-pointer lg:hidden"
          size={50}
          onClick={logout}
        />
      </div>

      <RiLogoutBoxLine
        className="cursor-pointer mb-8 hidden lg:block"
        size={50}
        onClick={logout}
      />
    </div>
  );
}
