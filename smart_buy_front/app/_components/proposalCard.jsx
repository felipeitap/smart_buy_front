import Image from "next/image";
import { formatDate } from "../_utils";

export default function ProposalCard({
  bid,
  handleReject,
  handleAccpet,
  shouldShowActions,
  isAcceptd,
}) {
  return (
    <div
      className={`rounded-lg p-2 ${
        isAcceptd ? "bg-[#00cb004d]" : "bg-[#8c86814d]"
      }`}
    >
      <small className="font-bold">{bid.supplier_name}</small>
      <div className="flex justify-between items-center  font-medium">
        <span className="flex gap-5">
          <p> Valor: R${bid.bid_amount} </p>
          <p>Prazo: {formatDate(bid.delivery_date)}</p>
        </span>
        {shouldShowActions && (
          <div className="ml-4 flex ">
            <button
              className="bg-inherit"
              onClick={() => handleReject(bid.bid_id)}
            >
              <Image
                src={"/cancel_icon.svg"}
                height={30}
                width={30}
                alt="Icone de cancelar"
              />
            </button>
            <button
              className="bg-inherit"
              onClick={() =>
                handleAccpet(bid.bid_id, bid.alert_id, bid.supplier_id)
              }
            >
              <Image
                src={"/accept_icon.svg"}
                height={30}
                width={30}
                alt="Icone de aceitar"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
