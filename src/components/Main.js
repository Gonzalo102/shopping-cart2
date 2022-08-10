import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ItemDetails from "./ItemDetails";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:id" component={ItemDetails} />
    </Switch>
  );
};

export default Main;
