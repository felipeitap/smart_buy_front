import { AiOutlineProduct } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { logout } from "../actions/auth";
import Link from "next/link";

export default function Sidebar() {
  if (!localStorage.getItem("token")) {
    return null
  }
  const isMobile = window.innerWidth < 1024;

  return (
    <div className="fixed items-center shadow-2xl bottom-0 w-full bg-[#c6ccd9] lg:left-0 lg:h-full lg:w-auto lg:flex flex-col ">
      {!isMobile && (
        <Image
          className="my-5"
          src={"/logo.png"}
          width={50}
          height={30}
          alt="Logo Smart Buy"
        />
      )}

      <div className="flex justify-around py-4 lg:flex-col lg:p-5 lg:h-full lg:justify-start lg:gap-8 ">
        <Link href={"/home"}><IoMdHome className="cursor-pointer" size={50} /></Link>
        <FaPlus className="cursor-pointer" size={50} />
        <Link href={"/product"}><AiOutlineProduct className="cursor-pointer" size={50} /></Link>
        {isMobile && (
          <RiLogoutBoxLine
            className="cursor-pointer"
            size={50}
            onClick={logout}
          />
        )}
      </div>
      {!isMobile && (
        <RiLogoutBoxLine
          className="cursor-pointer mb-8"
          size={50}
          onClick={logout}
        />
      )}
    </div>
  );
}
