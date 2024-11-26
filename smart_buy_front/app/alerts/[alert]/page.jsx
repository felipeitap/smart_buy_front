"use client";

import React from "react";

export default function Alert({ params }) {
  const teste = React.use(params).alert;

  console.log(teste);

  return <h1>{teste}</h1>;
}
