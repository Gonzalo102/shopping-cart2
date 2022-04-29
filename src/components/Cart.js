import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  resetProductFromCart,
  removeProductFromCart,
} from "../store/cart/action";
import capitalizeFirstLetter from "../utilities/CapitalizeFirstLetter";
import Modal from "./Modal";

const Cart = ({ toggleCart }) => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Subtotal = useCallback((product) => {
    return product.quantity * product.pokemon.price;
  }, []);

  const sumTotal = () => {
    return products.reduce((acc, el) => {
      return (acc = acc + el.quantity * el.pokemon.price);
    }, 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const increaseAmount = (pokemon) => {
    dispatch(increaseQuantity(pokemon));
  };

  const removeFromCart = (pokemon) => {
    dispatch(removeProductFromCart(pokemon));
  };

  const resetCart = (pokemons) => {
    dispatch(resetProductFromCart(pokemons));
  };

  return (
    <>
      <div className="cart-contanier">
        <h3 id="cart-title">Your Purchase</h3>
        <div className="cart-inner-contanier">
          {products.map((item) => {
            return (
              <div key={item.pokemon.id} className="cart-item-wrapper">
                <img src={item.pokemon.image} alt="pokemon" />
                <div className="cart-product-wrapper">
                  <h4>{capitalizeFirstLetter(item.pokemon.name)}</h4>
                  <h4>${Subtotal(item)}</h4>
                  <div className="cart-buttons-wrapper">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="cart-button"
                    >
                      {" "}
                      -{" "}
                    </button>
                    <div id="number-container"> {item.quantity} </div>
                    <button
                      onClick={() => increaseAmount(item)}
                      className="cart-button"
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h4 id="total-amount">Total: $ {sumTotal()}</h4>
        <button
          id="checkout-button"
          onClick={products.length > 0 ? openModal : undefined}
        >
          Checkout
        </button>
        <button id="close-button" onClick={toggleCart}>
          Close
        </button>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          toggleCart={toggleCart}
          resetCart={resetCart}
          products={products}
        />
      )}
    </>
  );
};

export default Cart;
