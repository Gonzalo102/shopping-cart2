import { createReducer } from "@reduxjs/toolkit";
import { addProductToCart, resetProductFromCart } from "./action";
import { removeProductFromCart } from "./action";
import { increaseQuantity } from "./action";

export const cartReducer = createReducer(
  {
    products: [],
  },
  (builder) => {
    builder
      .addCase(addProductToCart, (state, action) => {
        //if the pokemon is not on the cart, add it.
        if (
          state.products.findIndex(
            (product) => product.pokemon.id === action.payload.id
          ) === -1
        ) {
          state.products.push({
            quantity: 1,
            pokemon: action.payload,
          });
          //else, increment its quantity by 1
        } else {
          state.products[
            state.products.findIndex(
              (product) => product.pokemon.id === action.payload.id
            )
          ].quantity++;
        }
      })
      //increase quantity by 1
      .addCase(increaseQuantity, (state, action) => {
        state.products[
          state.products.findIndex(
            (product) => product.pokemon.id === action.payload.pokemon.id
          )
        ].quantity++;
      })
      .addCase(removeProductFromCart, (state, action) => {
        if (action.payload.quantity > 1) {
          state.products[
            state.products.findIndex(
              (product) => product.pokemon.id === action.payload.pokemon.id
            )
          ].quantity--; //if quantity es higher than one, decrement by 1.
        } else {
          state.products = state.products.filter((product) => {
            return product.pokemon.id !== action.payload.pokemon.id;
          }); //if quantity is 1, we remove it from the cart
        }
      })
      .addCase(resetProductFromCart, (state, action) => {
        state.products = [];
      });
  }
);

export default cartReducer;
