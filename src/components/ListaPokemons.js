import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BuscarPokemon from "./BuscarPokemon";
import Display from "./Display";
import MostrarContext from "../context/MostrarContext";

const ListaPokemons = () => {

  const [pokemons, setPokemons] = useState([]);

  const {mostrar} = useContext(MostrarContext)
// --------peticion a la api por los primeros 20 pokemons--------------------------
  const getPokemons = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/`)
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
// --------------------unicializando la busqueda de los primeros poquemons de la api ---------------
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <div>
        <BuscarPokemon />
      </div>
{/* --------------enviando los pokemons a displey--------------------- */}
      <div className="container-card">
        {
            mostrar? <></>:<Display thisPokemons={pokemons} />
        }
      </div>
    </>
  );
};

export default ListaPokemons;
