import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../store/cart/action";
import capitalizeFirstLetter from "../utilities/CapitalizeFirstLetter";
import { useSelector } from "react-redux";
import { setProducts } from "../store/pokemons/action";

const Products = () => {
  const pokemons = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const loadProducts = async () => {
    dispatch(setProducts(await fetchPokemons(24)));
  };

  const fetchPokemons = async (amount) => {
    const pokemonsArray = [];

    for (let i = 1; i <= amount; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await fetch(pokemonUrl);
      const pokemon = await response.json();
      const id = pokemon.id;
      const name = pokemon.name;
      const image = pokemon.sprites.front_default;
      const price = 50;
      pokemonsArray.push({ id, name, image, price });
    }

    return pokemonsArray;
  };

  const addToCart = (pokemon) => {
    dispatch(addProductToCart(pokemon));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ul className="pokemon-container">
      {pokemons.map((item, i) => {
        return (
          <div key={item.id} className="pokemon-wrapper">
            <Link to={`/shopping-cart2/products/${item.id}`}>
              <div className="pokemon-item-wrapper">
                <img className="poke-image" src={item.image} alt="poke" />
                <li>{capitalizeFirstLetter(item.name)}</li>
                <li>$ {item.price}</li>
              </div>
            </Link>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </ul>
  );
};

export default Products;
