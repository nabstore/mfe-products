import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Modal } from "react-bootstrap";
import { Button } from "@nabstore/styleguide";
import apiMethods from "../../services/api";
import { notification } from "antd";

const EditProdutoModal = ({ showModal, handleClose }) => {
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduto = async (id) => {
    apiMethods
      .fetchProdutoById(id)
      .then((produto) => {
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
      })
      .catch((error) => console.error("Erro ao carregar produto."));
  };

  useEffect(() => {
    getProduto(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiMethods
      .editProduto({
        id,
        nome,
        descricao,
        preco,
        estoque,
      })
      .then((resp) => {
        const args = {
          message: "Prontinho =)",
          description: "Produto editado com sucesso.",
          duration: 2,
        };
        notification.success(args);
        navigate(0);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setNomeError(err.response.data?.errors[0].message);
        } else {
          console.error("Erro ao criar produto", err);
        }
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edição de Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            autoFocus
            type="text"
            id="nome"
            className={
              nomeError === "" ? "form-control" : "form-control is-invalid"
            }
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className="invalid-feedback">{nomeError}</div>

          <label className="mt-3 mb-1" htmlFor="descricao">
            Descrição
          </label>
          <textarea
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="preco">
            Preço
          </label>
          <input
            type="number"
            id="preco"
            className="form-control"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <label className="mt-3 mb-1" htmlFor="estoque">
            Estoque
          </label>
          <input
            type="number"
            id="estoque"
            className="form-control"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
          />

          <Button.Secondary
            disabled={preco === "" || estoque === "" || nome === ""}
          >
            Salvar
          </Button.Secondary>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProdutoModal;
