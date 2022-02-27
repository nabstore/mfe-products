import React, { useEffect, useState } from "react";
import { Anchor, Typography } from "@nabstore/styleguide";
import { currencyFormatter } from "@nabstore/utils";
import Card from "../Card";
import apiMethods from "../../services/api";

const UltimasCompras = () => {
  const [compras, setCompras] = useState(null);

  useEffect(() => {
    apiMethods
      .fetchCompras()
      .then((resp) => setCompras(resp))
      .catch((err) => console.error("Erro ao carregar compras"));
  }, []);

  if (!compras || compras.length === 0) {
    return <></>;
  }

  const dadosDaEntrega = (compra) => {
    if (compra.deliveredAt) {
      return `Entrega realizada em ${new Date(
        compra.deliveredAt
      ).toLocaleDateString()}.`;
    }

    return (
      <span style={{ color: "green", fontWeight: 500 }}>
        Chega dia {new Date(compra.estimatedDeliveryDate).toLocaleDateString()}.
      </span>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center mb-4">
      <div className="d-flex flex-row align-items-center">
        <Typography.Title className="float-start">
          Últimas Compras
        </Typography.Title>
        <Anchor.Primary className="ms-4" to={`/compras`}>
          Ver todas
        </Anchor.Primary>
      </div>
      <div className="d-flex flex-wrap mt-3 justify-content-start">
        {compras.slice(0, 4).map((compra) => (
          <Card style={{ width: "16rem" }} className="card" key={compra.id}>
            <div className="card-body">
              <h5 className="card-title">
                Feita em {new Date(compra.createdAt).toLocaleDateString()}
              </h5>
              <h1 className="card-title">{currencyFormatter(compra.total)}</h1>
              {dadosDaEntrega(compra)}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-center">
                <Anchor.Primary to={`/compras/${compra.id}`}>
                  Ver detalhes
                </Anchor.Primary>
              </li>
            </ul>
          </Card>
        ))}
      </div>
      <hr className="mt-4" />
    </div>
  );
};

export default UltimasCompras;
