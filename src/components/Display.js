import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPokemon from "./CardPokemon";

const Display = ({ thisPokemons }) => {
  // ------guardando los pokemons en una variable------------------
  const pokemones = thisPokemons;

  const [pokemons, setPokemons] = useState([]);
// -----------haciendo la peticiones a la api para traer pokemons por separado con su img------------------
  const getPokemon = () => {
    setPokemons([])
    // recorro el arreglo de pokemos para hacer las peticiones
    pokemones.forEach(async(value) => {
      await axios.get(value.url)
        .then((response) => {
          // creo un campo img para colocar la url de la imagen del pokemon
          response.data.img = response.data.sprites.front_default;
            setPokemons((pokemons) => [...pokemons, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
//-------------- inicializando la peticion para traer la imagen de los pokemons-----------------
  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemones]);

  return (
    <>
      {/* mando los ´pokemon por separado con sus respectivos datos */}
        {pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.id} thisPokemon={pokemon} />
        ))}
    </>
  );
};

export default Display;
