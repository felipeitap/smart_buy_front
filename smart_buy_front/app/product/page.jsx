"use client";

import DataTable from "../_components/dataTable";
import Spinner from "../_components/spinner";
import Card from "../_components/card";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProduct } from "../_actions/product";
import { useProducts } from "../_hooks/useProduct";
import { HiPencilAlt } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import * as yup from "yup";
import ModalEdit from "../_components/modalEdit";
import { useEffect, useState } from "react";
import Modal from "../_components/modal";
import { emitToast } from "../_utils";
import api from "@/api";

export default function Product() {
  if (!localStorage.getItem("token")) {
    redirect("/");
  }

  const [selectedProduct, setSelectedProduct] = useState({});
  const [openEditModal, setOpenEditModal] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState();

  const { products, loading, refreshProducts } = useProducts();

  const filteredProducts = products?.filter((e) => e.active);

  const tableCells = filteredProducts?.map((e) => [
    { value: e.product_name },
    { value: e.product_category },
    { value: e.product_description },
    {
      value: (
        <span className="flex gap-5">
          <HiPencilAlt
            className="cursor-pointer"
            onClick={() => {
              setSelectedProduct({ id: e.product_id });
              setOpenEditModal(true);
            }}
          />
          <IoCloseOutline
            onClick={() => {
              setSelectedProduct({ name: e.product_name, id: e.product_id });
              setOpenDeleteModal(true);
            }}
            className="cursor-pointer"
          />
        </span>
      ),
    },
  ]);

  const schema = yup.object({
    name: yup.string().required("Nome do produto é obrigatório"),
    category: yup.string().required("Categoria do produto é obrigatório"),
    description: yup.string().required("Descrição do produto é obrigatório"),
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
    refreshProducts();
  }, [openEditModal, openDeleteModal]);

  const submit = async (data) => {
    await newProduct(data);
    refreshProducts();
    reset();
  };

  const handleDeleteProduct = (id) => {
    try {
      api.delete(`/product/${id}`);
      emitToast("success", "Produto excluido com sucesso");
      setOpenDeleteModal(false);
    } catch (error) {
      emitToast("error", `Erro ao editar produto: ${error}`);
    }
  };

  return (
    <div className="p-10 mb-24">
      <h1 className="text-4xl font-bold">Produtos</h1>
      <div className="mt-10 ">
        <Card>
          <h2 className="text-lg font-bold">Adicionar produto</h2>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <div className="input-group">
              <label htmlFor="name">Nome do produto*</label>
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
        </Card>
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
      <ModalEdit
        isOpen={openEditModal}
        id={selectedProduct.id}
        setOpenModal={setOpenEditModal}
      />
      <Modal modalTitle={"Excluir produto?"} isOpen={openDeleteModal}>
        <p className="py-8">
          Você realmente deseja excluir o seguinte produto:{" "}
          <span className="font-bold">{selectedProduct?.name}</span>
        </p>
        <div className="flex justify-between">
          <button
            className="alt-button"
            onClick={() => setOpenDeleteModal(false)}
          >
            Fechar
          </button>
          <button onClick={() => handleDeleteProduct(selectedProduct.id)}>
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  );
}
