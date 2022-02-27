import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./screens/About";
import Produtos from "./screens/Produtos";
import Produto from "./screens/Produto";

const App = ({ name, store, addProductToCartAction }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container-sm mt-5">
        <Routes>
          <Route exact path="/products/about" element={<About />} />
          <Route exact path="/products" element={<Produtos />} />
          <Route
            exact
            path="/products/:id"
            element={
              <Produto addProductToCartAction={addProductToCartAction} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
