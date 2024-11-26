"use client";

import AlertCard from "../_components/alertCard";
import { redirect } from "next/navigation";
import { useAlerts } from "../_hooks/useAlerts";
import { formatDate, handleStatus } from "../_utils";

export default function Home() {
  if (!localStorage.getItem("token")) {
    redirect("/");
  }

  const { alerts } = useAlerts();

  const handleClick = (id) => {
    redirect(`/alerts/${id}`);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 p-10">Seus Alertas</h1>
      <div className="flex flex-col items-center justify-between gap-20 lg:flex-wrap">
        {alerts?.map((alert) => (
          <AlertCard
            title={alert.product_name}
            onClick={() => handleClick(alert.alert_id)}
          >
            <ul>
              <li>Quantidade: {alert.quantity_needed}</li>
              <li>
                Prazo da negociação: {formatDate(alert.negotiation_deadline)}
              </li>
              <li className="capitalize">
                Status: {handleStatus(alert.status)}
              </li>
            </ul>
          </AlertCard>
        ))}
      </div>
    </>
  );
}
