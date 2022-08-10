import React, { useState } from "react";
import Main from "./components/Main";
import { HashRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import "./style/style.css";
import Cart from "./components/Cart";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Provider store={store}>
      <Router>
        <Header toggleCart={toggleCart} />
        <Main />
      </Router>
      {showCart && <Cart toggleCart={toggleCart} />}
    </Provider>
  );
};

export default App;
