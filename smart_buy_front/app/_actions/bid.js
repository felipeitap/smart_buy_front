import api from "@/api";
import { emitToast } from "../_utils";

export async function newBid(data) {
  try {
    const response = await api.post("/bid", data);    

    if (response.status === 200) {      
      await emitToast("success", "Proposta enviada com sucesso");
    }
  } catch (error) {
    emitToast("error", error);
  }
}

export async function getConfirmedBids() {
  try {
    const response = await api.get("/alert/confirmed");
    const bids = response.data.data;

    return bids;
  } catch (error) {
    emitToast("error", error);
  }
}

export async function getAllBids(alertId) {
  try {
    const response = await api.get(`/bid/${alertId}`);
    const bids = response.data.data;

    return bids;
  } catch (error) {
    emitToast("error", error);
  }
}
