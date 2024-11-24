import api from "@/api";
import { redirect } from "next/navigation";

export async function login(data) {
  try {
    const response = await api.post("/login", data);
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log(error);
  }

  const token = localStorage.getItem("token");

  if (token) {
    redirect("/home");
  }
}
