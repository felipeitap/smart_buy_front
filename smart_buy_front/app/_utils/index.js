import { toast } from 'react-toastify';

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
}