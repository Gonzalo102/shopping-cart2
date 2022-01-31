import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartLogo from "../images/cart-logo.png";
import { useSelector } from "react-redux";

const Header = ({ toggleCart }) => {
  const products = useSelector((state) => state.cart.products);

  const [showQuantity, setShowQuantity] = useState(false);
  const totalQuantity = () =>
    products.reduce((acc, el) => (acc += el.quantity), 0);

  useEffect(() => {
    products.reduce((acc, el) => (acc += el.quantity), 0) === 0
      ? setShowQuantity(false)
      : setShowQuantity(true);
  }, [products]);

  return (
    <nav className="nav-bar-wrapper">
      <h3>Pokemon Posters</h3>
      <ul className="nav-bar">
        <Link to="/shopping-cart2/">
          <li>Home</li>
        </Link>
        <Link to="/shopping-cart2/products">
          <li>Products</li>
        </Link>
        <div className="logo-container">
          <img onClick={toggleCart} id="cart-logo" src={cartLogo} alt="cart" />
          {showQuantity && (
            <div className="total-quantity">{totalQuantity()}</div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
