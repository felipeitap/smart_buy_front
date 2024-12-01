import { useEffect, useState } from "react";
import { getProducts } from "../_actions/product";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const userData = jwtDecode(token);

    setUserId(userData.userId);
    setUserType(userData.userType);
  }, []);

  return { userId, userType };
}
