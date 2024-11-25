import api from "@/api";
import { emitToast } from "../_utils";

export async function newProduct(data) {
  try {
    const response = await api.post("/product", data);

    if (response.status === 200) {
      emitToast("success", "Produto adicionado com sucesso");
    }
  } catch (error) {
    emitToast("error", error);
  }
}

export async function getProducts() {
  try {
    const response = await api.get("/product");
    const product = response.data.data;

    return product;
  } catch (error) {
    emitToast("error", error);
  }
}
