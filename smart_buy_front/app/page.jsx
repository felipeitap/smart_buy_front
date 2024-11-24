"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "./actions/auth";
import { useEffect } from "react";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const schema = yup
    .object({
      username: yup.string().required("Usário é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
    })
    .required();
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
    login(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative hidden lg:block lg:w-[60%] xl:w-[70%] h-full">
        <Image src={"/shaking_hands.png"} fill alt="Logo Smart Buy" />
      </div>
      <div className="p-20 lg:w-[40%] xl:w-[30%]">
        <div className="flex gap-4 flex-col">
          <Image
            className="mb-20"
            src={"/image_no_background.png"}
            width={300}
            height={200}
            alt="Logo Smart Buy"
          />
          <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-8">
              <div className="input-group">
                <label>E-mail</label>
                <input
                  type="text"
                  className="default-input"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="input-group">
                <label>Senha</label>
                <input
                  className="default-input"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <span className="self-end mt-2 underline cursor-pointer">
              <Link href={"/singup"}>
                <small>Não possui conta?</small>
              </Link>
            </span>
            <button className="default-button self-start mt-5">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
