import React, { useState } from "react";
import { tipoUsuario } from "@nabstore/utils";
import { Button, Typography } from "@nabstore/styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import ProdutosList from "../../components/ProdutosList";
import AddProdutoModal from "../../components/AddProdutoModal";
import UltimasCompras from "../../components/UltimasCompras";

const Produtos = () => {
  const user = useSelector((state) => state.user);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);

  return (
    <div className="d-flex flex-column justify-content-center">
      <AddProdutoModal
        handleClose={() => setIsCreateProductModalOpen(false)}
        showModal={isCreateProductModalOpen}
      />

      <UltimasCompras />

      <div>
        <Typography.Title className="float-start">Produtos</Typography.Title>
        {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
          <div className="float-end">
            <Button.Primary onClick={() => setIsCreateProductModalOpen(true)}>
              <FontAwesomeIcon className="me-2" icon={faPlusCircle} />
              Novo Produto
            </Button.Primary>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ProdutosList />
    </div>
  );
};

export default Produtos;
