"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getProducts, newProduct } from "../actions/product";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProduct";
import DataTable from "../components/dataTable";
import Spinner from "../components/spinner";

export default function Product() {
  if (!localStorage.getItem("token")) {
    redirect("/");
  }

  const { products, loading, error, refreshProducts } = useProducts();

  const tableCells = products?.map((e) => [
    { value: e.product_name },
    { value: e.product_category },
    { value: e.product_description },
  ]);

  const schema = yup.object({
    name: yup.string().required("Nome do produto é obrigatório"),
    category: yup.string().required("Categoria do produot é obrigatório"),
    description: yup.string().required("Descrição do produot é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    await newProduct(data);
    refreshProducts()
    reset();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Produtos</h1>
      <div className="mt-10 ">
        <div className="bg-[#ab834b1a] p-5 rounded-lg mb-10 lg:max-w-[50%]">
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
            {errors.name && (
              <small className="text-red-600">{errors.name.message}</small>
            )}
            <div className="input-group">
              <label htmlFor="category">Categoria*</label>
              <input
                type="text"
                {...register("category", { required: true })}
                className="default-input"
              />
            </div>
            {errors.category && (
              <small className="text-red-600">{errors.category.message}</small>
            )}
            <div className="input-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                className="default-input"
                {...register("description", { required: true })}
              />
            </div>
            {errors.description && (
              <small className="text-red-600">
                {errors.description.message}
              </small>
            )}
            <button className="self-end mt-5">Salvar</button>
          </form>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <h2 className="text-lg font-bold ml-4">Lista de produtos</h2>
            <DataTable
              data={tableCells}
              columns={["Produto", "Categoria", "Descrição"]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
