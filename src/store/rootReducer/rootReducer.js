import cartReducer from "../cart/reducer";
import productsReducer from "../pokemons/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export default rootReducer;
