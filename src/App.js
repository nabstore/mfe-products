import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./screens/About";

const App = ({ name, store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container-sm mt-5">
        <Routes>
          <Route exact path="/products/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
