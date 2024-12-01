import Modal from "./modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/api";
import { emitToast } from "../_utils";
import { useProducts } from "../_hooks/useProduct";
import { useEffect } from "react";

export default function ModalEdit({ isOpen, setOpenModal, id }) {
  const { products, loading } = useProducts(id);

  const schema = yup.object({
    name: yup.string().required("Nome do produto é obrigatório"),
    category: yup.string().required("Categoria do produto é obrigatório"),
    description: yup.string().required("Descrição do produto é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (products && !loading) {
      setValue("name", products.product_name);
      setValue("category", products.product_category);
      setValue("description", products.product_description);
    }
  }, [products]);

  const submit = async (data) => {
    try {
      await api.put(`/product/${id}`, data);
      emitToast("success", "Produto editado com sucesso");
      setOpenModal(false);
    } catch (error) {
      emitToast("error", `Erro ao editar produto: ${error}`);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Modal
      modalTitle={"Você realmente deseja editar este produto?"}
      isOpen={isOpen}
    >
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
          <small className="text-red-600">{errors.description.message}</small>
        )}
        <div className="flex justify-between">
          <button
            onClick={() => setOpenModal(false)}
            className="alt-button self-start mt-5"
          >
            Fechar
          </button>
          <button className="self-end mt-5">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}
