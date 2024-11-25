"use client"

import { redirect } from "next/navigation";

export default function Home() {
  if (!localStorage.getItem("token")){
    redirect("/")
  };

  return <h1>HOME</h1>;
}
