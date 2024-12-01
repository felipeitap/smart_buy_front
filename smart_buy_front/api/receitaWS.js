import $ from "jquery";

export default async function consultCNPJ(cnpj) {
  const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
  let companySituation;

  await $.ajax({
    url: url,
    dataType: "jsonp",
    success: function (data) {
      companySituation = data.situacao;
    },
    error: function (xhr, status, error) {
      console.error({ xhr, status, error });
    },
  });

  return companySituation;
}
