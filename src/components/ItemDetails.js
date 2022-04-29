import React, { Fragment, useEffect, useState, useCallback } from "react";
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

  const fetchPokemon = useCallback(async () => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`;
    const response = await fetch(pokemonUrl);
    const pokemon = await response.json();
    setItem(pokemon);
  }, [match.params.id]);

  const getAllMoves = useCallback(() => {
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
  }, [item.moves]);

  const addToCart = () => {
    const index = pokemons.findIndex(
      (product) => product.id === parseInt(match.params.id)
    );
    dispatch(addProductToCart(pokemons[index]));
  };

  useEffect(() => {
    const loadPokemon = async () => {
      await fetchPokemon();
    };
    loadPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    getAllMoves();
  }, [getAllMoves]);

  return (
    <Fragment key={item.id}>
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
          {item.abilities.map((item, i) => {
            return <li key={i}>{capitalizeFirstLetter(item.ability.name)}</li>;
          })}
        </ul>
        <h3>Moves: </h3>
        <p>{allMoves}</p>
      </div>
    </Fragment>
  );
};

export default ItemDetails;
