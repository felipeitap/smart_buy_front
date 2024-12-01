"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "../_actions/auth";
import { useEffect, useState } from "react";
import { handlePhoneChange, handleCnpjChange } from "../_utils";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import Modal from "../_components/modal";
import { redirect } from "next/navigation";
import Spinner from "../_components/spinner";
import consultCNPJ from "@/api/receitaWS";

export default function Signup() {
  const [phoneValue, setPhoneValue] = useState("");
  const [cnpjValue, setCnpjValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotActive, setIsNotActive] = useState(false);

  const schema = yup.object({
    username: yup.string().required("Usuário é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .matches(/\d/, "A senha deve conter pelo menos um número")
      .matches(
        /[@$!%*?&#]/,
        "A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, & ou #)"
      )
      .required("Senha é obrigatória"),
    name: yup.string().required("Nome completo é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    cnpj: yup.string().required("CNPJ é obrigatório"),
    type: yup
      .string()
      .oneOf(
        ["cliente", "fornecedor"],
        "Tipo deve ser Microempreendedor ou Fornecedor"
      )
      .required("Tipo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const submit = async (data) => {
    const { phone, cnpj } = data;
    const cleanCnpjNumber = cnpj.replace(/\D/g, "");
    const cleanPhoneNumber = phone.replace(/\D/g, "");

    setIsLoading(true);

    const companyState = await consultCNPJ(cleanCnpjNumber);

    if (companyState === "ATIVA") {
      const response = await signUp({
        ...data,
        phone: cleanPhoneNumber,
        cnpj: cleanCnpjNumber,
      });

      if (response.status === 200) {
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false)
      setIsNotActive(true);
      setIsModalOpen(true)
    }
  };

  return (
    <div className="flex gap-4 flex-col items-center">
      <Image
        className="mb-15"
        src={"/image_no_background.png"}
        width={300}
        height={200}
        alt="Logo Smart Buy"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col">
            <div className="input-group">
              <label>Usuário</label>
              <input
                type="text"
                className="default-input"
                {...register("username", { required: true })}
              />
            </div>
            {errors.username && (
              <small className="text-red-600">{errors.username.message}</small>
            )}
            <div className="input-group">
              <label>Senha</label>
              <input
                className="default-input"
                type="password"
                {...register("password", { required: true })}
              />
              <p className="m-0 p-0 leading-3 font-medium italic">
                <small>
                  Minimo 6 digitos, deve conter letra maiúscula, numeros e
                  caractere especial
                </small>
              </p>
            </div>
            {errors.password && (
              <small className="text-red-600">{errors.password.message}</small>
            )}
            <div className="input-group">
              <label>Nome Completo</label>
              <input
                className="default-input"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <small className="text-red-600">{errors.name.message}</small>
            )}
            <div className="input-group">
              <label>E-mail</label>
              <input
                className="default-input"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <small className="text-red-600">{errors.email.message}</small>
            )}
            <div className="input-group">
              <label>Endereço</label>
              <input
                className="default-input"
                type="text"
                {...register("address", { required: true })}
              />
            </div>
            {errors.address && (
              <small className="text-red-600">{errors.address.message}</small>
            )}
            <div className="input-group">
              <label>Telefone</label>
              <input
                className="default-input"
                type="tel"
                maxLength={15}
                onInput={(e) => setPhoneValue(handlePhoneChange(e))}
                value={phoneValue}
                {...register("phone", { required: true })}
              />
            </div>
            {errors.phone && (
              <small className="text-red-600">{errors.phone.message}</small>
            )}
            <div className="input-group">
              <label>CNPJ</label>
              <input
                className="default-input"
                type="text"
                onInput={(e) => setCnpjValue(handleCnpjChange(e))}
                value={cnpjValue}
                maxLength={18}
                {...register("cnpj", { required: true })}
              />
            </div>
            {errors.cnpj && (
              <small className="text-red-600">{errors.cnpj.message}</small>
            )}
            <div className="input-group">
              <label>Tipo</label>
              <select
                className="default-input"
                {...register("type", { required: true })}
              >
                <option value="cliente">Microempreendedor</option>
                <option value="fornecedor">Fornecedor</option>
              </select>
            </div>
            {errors.type && (
              <small className="text-red-600">{errors.type.message}</small>
            )}
          </div>
          <div className="flex justify-between">
            <Link href={"/"}>
              <button className="alt-button self-start mt-8">Voltar</button>
            </Link>
            <button className="self-start mt-8">Enviar</button>
          </div>
        </form>
      )}
      <Modal
        isOpen={isModalOpen}
        closeMessage={"Confirmar"}
        modalTitle={"Bem vindo à Smart Buy"}
        onClose={() => {
          setIsModalOpen(false);
          redirect("/");
        }}
      >
        {isNotActive? "Houve um erro com CNJP, por favor tente novamente" : "Parabéns, sua conta foi criada com sucesso!!"}
      </Modal>
    </div>
  );
}
