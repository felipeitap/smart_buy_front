import api from "@/api";
import { redirect } from "next/navigation";
import { emitToast } from "../_utils";

export async function login(data) {
  let token;
  try {
    const response = await api.post("/login", data);
    token = response.data.token;
    localStorage.setItem("token", token);
  } catch (error) {
    emitToast("error", error);
  }

  if (token) {
    redirect("/home");
  }
}

export async function signUp(data) {
  try {
    const response = await api.post("/auth", data);
    return response;
  } catch (error) {
    emitToast("error", error);
  }
}

export function logout() {
  localStorage.removeItem("token");
  redirect("/home");
}
