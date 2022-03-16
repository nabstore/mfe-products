import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { notification } from "antd";
import { Anchor, Button, Typography } from "@nabstore/styleguide";
import { DeliveryEstimateFragment } from "@nabstore/mfe-checkout";
import {
  tipoUsuario,
  currencyFormatter as currencyFormat,
} from "@nabstore/utils";
import apiMethods from "../../services/api";
import {
  faPlus,
  faMinus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Price,
  Estoque,
  Details,
  DetailsTitle,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes } from "@nabstore/utils";
import EditProdutoModal from "../../components/EditProdutoModal";

const Produto = ({ addProductToCartAction }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({
    user: state.user,
    cart: state.cart,
  }));
  const [qtd, setQtd] = useState(1);
  const [produto, setProduto] = useState(undefined);
  const [isEditProdutoModalOpen, setIsEditProdutoModalOpen] = useState(false);

  useEffect(() => {
    apiMethods
      .fetchProdutoById(id)
      .then((produto) => {
        setProduto(produto);
        const prod = cart.produtos.find((prod) => prod.id === produto.id);
        if (prod) {
          setQtd(prod.qtd);
        }
      })
      .catch((error) => console.error("Erro ao carregar produto."));
  }, [id, cart]);

  const handleDelete = () => {
    if (window.confirm("Deseja deletar o produto?")) {
      apiMethods
        .deleteProduto(id)
        .then((produto) => {
          const args = {
            message: "Prontinho =)",
            description: "Produto deletado com sucesso.",
            duration: 2,
          };
          notification.success(args);
          navigate(routes.HOME);
        })
        .catch((error) => console.error("Erro ao deletar produto."));
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProductToCartAction({
        id: produto.id,
        precoUnit: produto.preco,
        qtd,
        nome: produto.nome,
      })
    );
    const args = {
      message: "Prontinho =)",
      description: "Produto adicionado ao carrinho.",
      duration: 2,
    };
    notification.success(args);
    navigate(routes.HOME);
  };

  if (!produto) {
    return <div>Carregando dados do produto...</div>;
  }

  return (
    <div className="row align-items-center">
      <EditProdutoModal
        handleClose={() => setIsEditProdutoModalOpen(false)}
        showModal={isEditProdutoModalOpen}
      />
      <div className="col">
        <div className="float-start">
          <Anchor.GoBack path={routes.HOME} text="Voltar aos produtos" />
        </div>
      </div>

      <div className="row align-items-center mt-3 mb-5">
        <div className="col d-flex align-self-start mt-5 justify-content-center">
          <img
            src={apiMethods.getImageUrl(produto.id)}
            onError={(e) => (e.target.src = NO_IMAGE_URL)}
            className="img-thumbnail"
            alt={produto.nome}
            width="80%"
          />
        </div>
        <div className="col">
          <Card className="card">
            <div className="card-body">
              <Typography.Title>{produto.nome}</Typography.Title>
              <Typography.Subtitle color="#7e7e7e">
                ID: {produto.id}
              </Typography.Subtitle>
            </div>

            <hr />

            <div className="d-flex flex-row justify-content-center mt-2 mb-2">
              <div className="p-2 d-flex flex-column me-4">
                <div className="d-flex justify-content-center">
                  <Price>{currencyFormat(produto.preco)}</Price>
                </div>
                <hr />
                <Estoque>
                  {produto.estoque}{" "}
                  {produto.estoque === 1 ? "disponível" : "disponíveis"} em
                  estoque
                </Estoque>
              </div>

              <div className="p-2 ms-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Button.Primary
                    color="#d95b5b"
                    width="40px"
                    height="40px"
                    margin="20px 10px"
                    onClick={() => setQtd(qtd - 1)}
                    disabled={qtd === 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button.Primary>
                  <span>{qtd}</span>
                  <Button.Primary
                    width="40px"
                    height="40px"
                    margin="20px 10px"
                    onClick={() => setQtd(qtd + 1)}
                    disabled={qtd >= produto.estoque}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button.Primary>
                </div>
                <Button.Primary
                  onClick={handleAddToCart}
                  disabled={produto.estoque === 0 || produto.estoque < qtd}
                >
                  Adicionar ao carrinho
                </Button.Primary>
              </div>
            </div>

            <hr />
            <div className="card-body">
              <DetailsTitle>Detalhes do Produto</DetailsTitle>
              <Details>{produto.descricao}</Details>
            </div>
            {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
              <div className="card-body d-flex justify-content-center">
                <Button.Danger
                  width="45%"
                  margin="0 10px"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon className="me-2" icon={faTrash} />
                  Excluir Produto
                </Button.Danger>
                <Button.Secondary
                  width="45%"
                  margin="0 10px"
                  onClick={() => setIsEditProdutoModalOpen(true)}
                >
                  <FontAwesomeIcon className="me-2" icon={faEdit} />
                  Editar Produto
                </Button.Secondary>
              </div>
            ) : (
              <></>
            )}

            <hr />
            
            <DeliveryEstimateFragment />

          </Card>
        </div>
      </div>
    </div>
  );
};

export default Produto;
