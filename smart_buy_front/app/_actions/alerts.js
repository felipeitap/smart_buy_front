import api from "@/api";
import { emitToast } from "../_utils";

export async function newAlert(data) {
  try {
    const response = await api.post("/alert", data);

    if (response.status === 200) {
      emitToast("success", "Alerta criado com sucesso");
    }
  } catch (error) {
    emitToast("error", error);
  }
}

export async function getAlerts() {
  try {
    const response = await api.get("/alert");
    const alerts = response.data.data;

    return alerts;
  } catch (error) {
    emitToast("error", error);
  }
}
