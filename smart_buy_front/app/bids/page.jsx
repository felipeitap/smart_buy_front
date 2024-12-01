"use client";

import AlertCard from "../_components/alertCard";
import { redirect } from "next/navigation";
import { useAlerts } from "../_hooks/useAlerts";
import { formatDate, handleStatus } from "../_utils";
import Spinner from "../_components/spinner";
import { useAuth } from "../_hooks/useAuth";
import { useBids } from "../_hooks/useBids";
import { useEffect } from "react";

export default function Home() {
  const { bids, loading } = useBids();

  useEffect(() =>{
    if (!localStorage.getItem("token")) {
      redirect("/");
    }
  },[])

  const handleClick = (id, phone) => {
    redirect(`/alerts/${id}?is_winner=true&phone=${phone}`);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 p-10 lg:p-0">
        Alertas concluidos
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center gap-20 md:flex-row md:justify-center lg:flex-wrap lg:justify-start mb-28">
          {bids.length > 0 ? (
            bids?.map((bid, index) => (
              <AlertCard
                title={bid.product_name}
                onClick={() => handleClick(bid.alert_id, bid.telefone)}
                key={index}
              >
                <ul>
                  <li>Quantidade: {bid.quantity_needed}</li>
                  <li>
                    Prazo da negociação: {formatDate(bid.negotiation_deadline)}
                  </li>
                  <li className="capitalize">
                    Status: {handleStatus(bid.status)}
                  </li>
                </ul>
              </AlertCard>
            ))
          ) : (
            <div className="flex items-center justify-center h-screen w-full">
              <h2 className="text-center text-2xl font-bold">
                Ainda não existem alertas criados!
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
