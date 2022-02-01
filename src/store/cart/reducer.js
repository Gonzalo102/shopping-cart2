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
        if (
          state.products.findIndex(
            (product) => product.pokemon.id === action.payload.id
          ) === -1
        ) {
          state.products.push({
            quantity: 1,
            pokemon: action.payload,
          });
        } else {
          state.products[
            state.products.findIndex(
              (product) => product.pokemon.id === action.payload.id
            )
          ].quantity++;
        }
      })
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
          ].quantity--;
        } else {
          state.products = state.products.filter((product) => {
            return product.pokemon.id !== action.payload.pokemon.id;
          });
        }
      })
      .addCase(resetProductFromCart, (state, action) => {
        state.products = [];
      });
  }
);

export default cartReducer;
