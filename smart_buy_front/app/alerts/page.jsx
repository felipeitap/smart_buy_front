"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProducts } from "../_hooks/useProduct";
import { newAlert } from "../_actions/alerts";

export default function NewAlert() {
  if (!localStorage.getItem("token")) {
    redirect("/");
  }

  const { products } = useProducts();

  const today = new Date().toISOString().slice(0, 10);
  const filteredProducts = products?.filter((e) => e.active);

  const schema = yup.object({
    productId: yup.string().required("Produto é obrigatório"),
    quantity: yup
      .number()
      .typeError("A quantidade deve ser um número")
      .required("Quantidade do produto é obrigatório"),
    negociation: yup.string().required("Prazo de negociação é obrigatório"),
    description: yup.string().required("Descrição do alerta é obrigatório"),
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
    await newAlert(data);
    reset();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Novo Alerta</h1>
      <div className="mt-10 ">
        <div className="bg-[#ab834b1a] p-5 rounded-lg mb-10 lg:max-w-[50%]">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <div className="input-group">
              <label htmlFor="product">Produto*</label>
              <select
                {...register("productId", { required: true })}
                className="default-input"
              >
                <option value=""></option>
                {filteredProducts?.map((product, index) => (
                  <option key={index} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.productId && (
              <small className="text-red-600">{errors.productId.message}</small>
            )}
            <div className="input-group">
              <label htmlFor="quantity">Quantidade*</label>
              <input
                type="text"
                {...register("quantity", { required: true })}
                className="default-input"
              />
            </div>
            {errors.quantity && (
              <small className="text-red-600">{errors.quantity.message}</small>
            )}
            <div className="input-group">
              <label htmlFor="negociation">Prazo da negociação*</label>
              <input
                type="date"
                min={today}
                {...register("negociation", { required: true })}
                className="default-input"
              />
            </div>
            {errors.negociation && (
              <small className="text-red-600">
                {errors.negociation.message}
              </small>
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
      </div>
    </div>
  );
}
