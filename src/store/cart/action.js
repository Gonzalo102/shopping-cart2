import { createAction } from "@reduxjs/toolkit";

export const addProductToCart = createAction("cart/addProductToCart");
export const increaseQuantity = createAction("cart/increaseQuantity");
export const removeProductFromCart = createAction("cart/removeProductFromCart");
