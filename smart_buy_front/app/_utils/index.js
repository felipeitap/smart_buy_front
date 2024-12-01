import { toast } from "react-toastify";

export const handlePhoneChange = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  } else {
    value = value.replace(/^(\d*)$/, "($1");
  }
  return value;
};

export const handleCnpjChange = (event) => {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length > 12) {
    value = value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})$/,
      "$1.$2.$3/$4-$5"
    );
  } else if (value.length > 8) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})$/, "$1.$2.$3/$4");
  } else if (value.length > 5) {
    value = value.replace(/^(\d{2})(\d{3})(\d{0,3})$/, "$1.$2.$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,3})$/, "$1.$2");
  }

  return value;
};

export const emitToast = (type, message) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const formatDate = (date, local = "pt-BR") => {
  const newDate = new Date(date);
  const localDate = newDate.toLocaleDateString(local);

  return localDate;
};

export const handleStatus = (status) => {
  switch (status) {
    case "pendente":
      return <span className="text-amber-600 font-bold">{status}</span>;
    case "concluído":
      return <span className="text-green-600 font-bold">{status}</span>;
    case "cancelado":
      return <span className="text-red-600 font-bold">{status}</span>;
    default:
      return status;
  }
};

export const generateWhatsAppLink = (phone, product, date) => {
  const link = `https://wa.me/55${phone}?text=Ol%C3%A1%20gostaria%20de%20dar%20proced%C3%AAncia%20a%20nossa%20negocia%C3%A7%C3%A3o%20a%20respeito%20do%20alerta%20criado%20na%20Smart%20Buy%20%0AProduto%3A%20${product}%0AData%20limite%3A%20${date}%20`;
  return link;
};
