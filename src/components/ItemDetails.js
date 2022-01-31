import React, { useEffect, useState } from "react";
import { addProductToCart } from "../store/cart/action";
import { useDispatch, useSelector } from "react-redux";
import capitalizeFirstLetter from "../utilities/CapitalizeFirstLetter";

const ItemDetails = ({ match }) => {
  const pokemons = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [item, setItem] = useState({
    abilities: [
      {
        ability: {},
      },
    ],
    moves: [
      {
        move: {},
      },
    ],
    sprites: {
      front_default: {},
    },
    species: {},
  });

  const [allMoves, setAllMoves] = useState("");

  const fetchPokemon = async () => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`;
    const response = await fetch(pokemonUrl);
    const pokemon = await response.json();
    setItem(pokemon);
  };

  const getAllMoves = () => {
    let moves = "";
    item.moves.forEach((it, i) => {
      if (moves === "") {
        moves = capitalizeFirstLetter(it.move.name);
      } else if (i === item.moves.length - 1) {
        moves = moves + ", " + capitalizeFirstLetter(it.move.name) + ".";
      } else {
        moves = moves + ", " + capitalizeFirstLetter(it.move.name);
      }
    });
    setAllMoves(moves);
  };

  const addToCart = () => {
    const index = pokemons.findIndex(
      (product) => product.id == match.params.id
    );
    dispatch(addProductToCart(pokemons[index]));
  };

  useEffect(() => {
    const loadPokemon = async () => {
      await fetchPokemon();
    };
    loadPokemon();
  }, []);

  useEffect(() => {
    getAllMoves();
  }, [item]);

  return (
    <>
      <div className="pokemon-detail">
        <h2>Name: {capitalizeFirstLetter(item.name)}</h2>
        <img
          className="poke-image-detail"
          src={item.sprites.front_default}
          alt="poke"
        />
        <h4>Price: $50</h4>
        <button className="add-to-cart-button" onClick={() => addToCart(item)}>
          {" "}
          Add to cart{" "}
        </button>
      </div>
      <div className="info-container">
        <h3>Abilities: </h3>
        <ul>
          {item.abilities.map((item) => {
            return <li>{capitalizeFirstLetter(item.ability.name)}</li>;
          })}
        </ul>
        <h3>Moves: </h3>
        <p>{allMoves}</p>
      </div>
    </>
  );
};

export default ItemDetails;
