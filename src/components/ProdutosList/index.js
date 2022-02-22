import React, { useEffect, useState } from "react";
import { Anchor, Button, LoadingIcon } from "@nabstore/styleguide";
import { defaultImages } from "@nabstore/utils";
import { Card, ProdutosContainer, NoProdutosText } from "./styles";
import apiMethods from "../../services/api";

const ProdutosList = () => {
  const [produtos, setProdutos] = useState(undefined);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiMethods
      .fetchProdutos()
      .then((resp) => setProdutos(resp))
      .catch((err) => console.error("Erro ao carregar produtos"));
  }, []);

  const handleChangePage = (increment) => {
    apiMethods
      .fetchProdutos(page + increment)
      .then((resp) => {
        setProdutos(resp);
        setPage(page + increment);
      })
      .catch((err) => console.error("Erro ao carregar produtos"));
  };

  if (!produtos) {
    return <LoadingIcon.Oval className="mt-5" stroke="#2f2f2f" />;
  }

  if (produtos.length === 0) {
    return <NoProdutosText>Nenhum produto listado.</NoProdutosText>;
  }

  return (
    <div>
      <ProdutosContainer className="d-flex flex-wrap mt-3">
        {produtos.map((produto) => (
          <Card className="card" key={produto.id}>
            <img
              src={apiMethods.getImageUrl(produto.id)}
              className="card-img-top"
              onError={(e) => (e.target.src = defaultImages.NO_IMAGE_URL)}
              alt={produto.nome}
            />
            <div className="card-body">
              <h5 className="card-title">{produto.nome}</h5>
              <p className="card-text">
                {produto.descricao?.length > 75
                  ? `${produto.descricao.slice(0, 75)}...`
                  : produto.descricao}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-center">
                <Anchor.Primary to={`/produto/${produto.id}`}>
                  Ver detalhes
                </Anchor.Primary>
              </li>
            </ul>
          </Card>
        ))}
      </ProdutosContainer>

      <div className="mt-5 mb-5 d-flex flex-row justify-content-center align-items-center">
        <Button.Primary
          margin="0 25px"
          width="150px"
          onClick={() => handleChangePage(-1)}
          disabled={page <= 1}
        >
          Anterior
        </Button.Primary>
        {page}
        <Button.Primary
          margin="0 25px"
          width="150px"
          onClick={() => handleChangePage(1)}
          disabled={produtos && produtos.length < 10}
        >
          Próxima
        </Button.Primary>
      </div>
    </div>
  );
};

export default ProdutosList;
