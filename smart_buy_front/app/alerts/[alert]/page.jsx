"use client";

import Card from "@/app/_components/card";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/_components/spinner";
import api from "@/api";
import ProposalCard from "@/app/_components/proposalCard";
import { FaWhatsapp } from "react-icons/fa";
import { useAlerts } from "@/app/_hooks/useAlerts";
import {
  emitToast,
  formatDate,
  generateWhatsAppLink,
  handleStatus,
} from "@/app/_utils";
import { useAuth } from "@/app/_hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newBid } from "@/app/_actions/bid";
import { useBids } from "@/app/_hooks/useBids";
import { useSearchParams } from "next/navigation";
import * as yup from "yup";

export default function Alert({ params }) {
  const [minDate, setMinDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [shouldShowActions, setShouldShowActions] = useState(true);

  const id = React.use(params).alert;

  const query = useSearchParams();
  const isWinner = query.get("is_winner");
  const phone = query.get("phone");

  const { alert, loading, refreshAlerts } = useAlerts(id);
  const { bids, loadingBids, refreshBids } = useBids(id);
  const { userType, userId } = useAuth();

  const today = new Date().toISOString().slice(0, 10);

  const schema = yup.object({
    value: yup.string().required("Valor é obrigatório"),
    delivery: yup.string().required("Prazo para entrega é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!loading && !loadingBids) {
      const clearDate = alert.negotiation_deadline.split("T")[0];
      const hasBid = bids.some((bid) => bid.user_id === userId);

      const hasConfirmed = alert.status === "concluído";

      setMinDate(clearDate);
      setDisabled(hasBid);
      setShouldShowActions(!hasConfirmed);
    }
  }, [loading, loadingBids]);

  const submit = async (data) => {
    const { value, delivery } = data;
    await newBid({
      alertId: id,
      bidValue: value,
      delivery,
      clientId: alert.user_id_created,
      productName: alert.product_name,
    });

    reset();
    setDisabled(true);
  };

  const handleReject = (id) => {
    api.put(`/bid/${id}`, { status: "rejeitado" }).then(() => {
      emitToast("warning", "Proposta recusada");
      refreshBids();
    });
  };

  const handleAccpet = (bidId, alertId, supplierId) => {
    api
      .put(`/bid/${bidId}`, { status: "aceito", alertId, supplierId })
      .then(() => {
        emitToast("success", "Proposta aceita com sucesso");
        refreshBids();
        refreshAlerts();
      });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 p-10 lg:p-0">
        Detalhes do alerta
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col justify-center p-8 lg:flex-row lg:justify-between lg:p-0">
            <Card style={"lg:w-2/5"}>
              <h2 className="text-lg font-bold mb-2">{alert.product_name}</h2>
              <ul>
                <li>Quantidade: {alert.quantity_needed}</li>
                <li>Criado em: {formatDate(alert.created_at)}</li>
                <li>
                  Prazo da negociação: {formatDate(alert.negotiation_deadline)}
                </li>
                <li className="capitalize">
                  Status: {handleStatus(alert.status)}
                </li>
              </ul>
              <div className="mt-5">
                <p>Descrição:</p>
                <p>{alert.description}</p>
              </div>
            </Card>
            {userType === "cliente" ? (
              <Card style={"lg:w-[50%]"}>
                <h2 className="text-lg font-bold mb-6">Propostas</h2>
                <div className="flex flex-col gap-5">
                  {bids.length < 1 ? (
                    <p className="font-bold text-center">
                      Ainda não há propostas para seu alerta
                    </p>
                  ) : (
                    bids.map((bid, index) => {
                      if (
                        bid.status === "pendente" ||
                        bid.status === "aceito"
                      ) {
                        return (
                          <ProposalCard
                            bid={bid}
                            handleAccpet={handleAccpet}
                            handleReject={handleReject}
                            shouldShowActions={shouldShowActions}
                            key={index}
                            isAcceptd={bid.status === "aceito"}
                          />
                        );
                      }
                    })
                  )}
                </div>
              </Card>
            ) : (
              !disabled && (
                <Card style={"md:w-2/5"}>
                  <h2 className="text-lg font-bold mb-2">Criar proposta</h2>

                  <form
                    onSubmit={handleSubmit(submit)}
                    className="flex flex-col gap-8"
                  >
                    <div className="input-group">
                      <label htmlFor="value">Valor*</label>
                      <input
                        disabled={disabled}
                        type="text"
                        {...register("value", { required: true })}
                        className="default-input"
                      />
                    </div>
                    {errors.value && (
                      <small className="text-red-600">
                        {errors.value.message}
                      </small>
                    )}
                    <div className="input-group">
                      <label htmlFor="delivery">Prazo para entrega*</label>
                      <input
                        disabled={disabled}
                        min={today}
                        max={minDate}
                        type="date"
                        {...register("delivery", { required: true })}
                        className="default-input"
                      />
                    </div>
                    {errors.delivery && (
                      <small className="text-red-600">
                        {errors.delivery.message}
                      </small>
                    )}
                    <button
                      disabled={disabled}
                      className={`self-end ${disabled && "bg-[#ab834b1a]"}`}
                    >
                      Enviar
                    </button>
                  </form>
                </Card>
              )
            )}
          </div>
          <div className="p-8">
            {disabled && (
              <Card style={"w-full mb-24 lg:mb-0"}>
                {isWinner ? (
                  <div className="flex flex-col p-5">
                    <h2 className="text-center text-2xl font-bold">
                      Parábens!! Você venceu a cotação, sua proposta foi a
                      melhor de todas!!!
                    </h2>
                    <h2 className="my-8">
                      Agora entre em contato com o cliente solicitante do alerta
                      para fechar négocio
                    </h2>
                    <a
                      className="lg:self-center lg:w-2/4"
                      target="_blank"
                      href={generateWhatsAppLink(
                        phone,
                        alert.product_name,
                        formatDate(alert.negotiation_deadline)
                      )}
                    >
                      <button className="bg-green-600 py-5 w-full">
                        <span className="flex justify-center items-center gap-2">
                          <FaWhatsapp size={25} />
                          <p className="text-lg">Contatar</p>
                        </span>
                      </button>
                    </a>
                  </div>
                ) : (
                  <h2 className="text-center text-2xl font-bold">
                    Sua proposta foi enviada com sucesso!
                  </h2>
                )}
              </Card>
            )}
            {userType === "cliente" && alert.status === "concluído" && (
              <Card style={"w-full mb-24 lg:mb-0"}>
                <h2 className="text-center text-2xl font-bold">
                  Parabéns você concluiu seu alerta!!
                </h2>
                <h2 className="text-center text-2xl font-bold">
                  Aguarde o contato do fornecedor vencedor para finalizar a
                  negociação
                </h2>
              </Card>
            )}
          </div>
        </>
      )}
    </>
  );
}
