import styled from "styled-components";

const Card = styled.div`
  width: 18rem;
  margin: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 13px;
  padding: 10px;
`;

const NoProdutosText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #2f2f2f;
  font-family: Open Sans;
  margin-top: 50px;
`;

const ProdutosContainer = styled.div`
  justify-content: space-around;
`;

export {
  Card,
  ProdutosContainer,
  NoProdutosText,
};
