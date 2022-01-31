import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ItemDetails from "./ItemDetails";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/shopping-cart2/" component={Home} />
      <Route exact path="/shopping-cart2/products" component={Products} />
      <Route
        exact
        path="/shopping-cart2/products/:id"
        component={ItemDetails}
      />
    </Switch>
  );
};

export default Main;
