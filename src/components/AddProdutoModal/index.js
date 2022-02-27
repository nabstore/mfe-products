import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import { Button } from "@nabstore/styleguide";
import apiMethods from "../../services/api";

const AddProdutoModal = ({ showModal, handleClose }) => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [imageError, setimageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!selectedFile) {
      setimageError("Selecione uma imagem para o produto");
      return;
    }

    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("estoque", estoque);
    formData.append("imagem", selectedFile, selectedFile.name);

    apiMethods
      .createProduto(formData)
      .then((resp) => {
        navigate(`/produto/${resp.id}`);
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
        <Modal.Title>Adição de Produto</Modal.Title>
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

          <label className="mt-3 mb-1" htmlFor="imagem">
            Imagem
          </label>
          <input
            type="file"
            id="imagem"
            className={
              imageError === "" ? "form-control" : "form-control is-invalid"
            }
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <div className="invalid-feedback">{imageError}</div>

          <Button.Secondary
            disabled={nome === "" || descricao === "" || !selectedFile}
          >
            Criar
          </Button.Secondary>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProdutoModal;
