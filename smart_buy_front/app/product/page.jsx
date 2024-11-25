"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Product() {
  const schema = yup.object({
    name: yup.string().required("Nome do produto é obrigatório"),
    category: yup.string().required("Categoria do produot é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    console.log(data);
    
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Produtos</h1>
      <div className="mt-10">
        <div className="bg-[#ab834b1a] p-5 rounded-lg">
            <h2 className="text-lg font-bold">Adicionar produto</h2>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <div className="input-group">
              <label htmlFor="name">Nome*</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="default-input"
              />
            </div>
            {errors.name && <small className="text-red-600">{errors.name.message}</small>}
            <div className="input-group">
              <label htmlFor="category">Categoria*</label>
              <input
                type="text"
                {...register("category", { required: true })}
                className="default-input"
              />
            </div>
            {errors.category && <small className="text-red-600">{errors.category.message}</small>}
            <div className="input-group">
              <label htmlFor="description">Descrição</label>
              <textarea className="default-input" />
            </div>
            <button className="self-end mt-5">Salvar</button>
          </form>
        </div>
        <div>TESTE</div>
      </div>
    </div>
  );
}
