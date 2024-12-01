"use client";

import { redirect } from "next/navigation";
import { useAlerts } from "../_hooks/useAlerts";
import Spinner from "../_components/spinner";
import { useAuth } from "../_hooks/useAuth";
import AlertList from "../_components/alertList";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { emitToast } from "../_utils";

export default function Home() {
  const { alerts, loading, refreshAlerts } = useAlerts();
  const { userType, userId } = useAuth();

  const filteredAlerts = alerts.filter((alert) => !alert.user_id_assigned);
  const alertsToRender = userType === "cliente" ? alerts : filteredAlerts;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/");
    }

    const socket = io("https://smartbuy-api.onrender.com/v1");

    if (userType === "fornecedor") {
      socket.emit("register_profile", "fornecedor");
    }

    socket.emit("register_user", userId);

    socket.on("new_alert", (data) => {
      emitToast("info", data.message);
      refreshAlerts();
    });

    socket.on("new_bid", (data) => {
      emitToast("info", data.message);
    });

    socket.on("bid_accepted", (data) => {
      emitToast("info", data.message);
    });
  }, [userType, userId]);

  const handleClick = (id) => {
    redirect(`/alerts/${id}`);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 p-10 lg:p-0">
        {userType === "cliente" ? "Seus Alertas" : "Alertas disponíveis"}
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-20 mb-24 md:flex-row md:justify-center lg:flex-wrap lg:justify-start">
          {alerts.length > 0 ? (
            <AlertList alerts={alertsToRender} handleClick={handleClick} />
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
