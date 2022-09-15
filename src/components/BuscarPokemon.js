import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MostrarContext from "../context/MostrarContext";
import CardPokemon from "./CardPokemon";
import Display from "./Display";

const BuscarPokemon = () => {
  // llamando a la variable y funcion global que estan en el useContext
  const { mostrar, cambiar } = useContext(MostrarContext);

  const [tipos, setTipos] = useState([]);

  const [name, setName] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [onePokemon, setOnePokemon] = useState({
    name: "",
    img: "#",
  });

  const [pokemons, setPokemons] = useState([]);

// funcion para traer todos los tipos que tiene la api 
  const getTipos = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((response) => {
        setTipos(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
//-------------------------- duncion para el input y guardar en una variable de estado-----------------------
  const handlerChange = (e) => {
    setName(e.target.value);
  };
// ------------  funcion para buscar un pokemon en especifico -------------------------------------------------
  const searchPokemon = (e) => {
    e.preventDefault();
    setMensaje("");
    if (name !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          // creando un espacio con el nombre de img y colocando la url de la imagen
          response.data.img = response.data.sprites.front_default;
          setOnePokemon(response.data);
          if (mostrar !== true) {
            cambiar();
          }
        })
        .catch((error) => {
          console.log(error);
          if (mostrar) {
            cambiar();
          }
          setMensaje(`*No se encontro ningun pokemon`);
        });
    }
  };
//  ---------------- funcion para el filtro de busqueda por tipo de pokemon --------------------------------
  const handlerSelect = async (e) => {
    setName("");
    setPokemons([]);
    if (mostrar) {
      cambiar();
    }
    await axios
      .get(`${e.target.value}`)
      .then((response) => {
        response.data.pokemon.forEach((element) => {
          setPokemons((pokemons) => [...pokemons, element.pokemon]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
// ------------------ funcion para ver si ya se ejecuto la busqueda por filtro ---------------------------------
  const comprobarPokemons = () => {
    if (!pokemons.length) {
      // no se mostrar nada si esta vacio el arreglo
    } else {
      // si hay pokemons enviar al displey
      return <Display thisPokemons={pokemons} />;
    }
  };
// -------------------------- inicializando la busqueda de los tipos de pokemons que hay en la api ----------------------------------
  useEffect(() => {
    getTipos();
  }, []);

  return (
    <>
      <div className="">
        {/* logo de la pokeapi */}
        <img
          className="logo-img"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt=""
        />
        {/* ------------------- buscador para encuntrar un pokemon ------------------------ */}
        <div className="buscador">
          <input
            type="search"
            className="input"
            placeholder="Buscar pokemon"
            value={name}
            onChange={handlerChange}
          />
          <button className="btn btn-success" onClick={searchPokemon}>
            Buscar
          </button>
          <p className="error">{mensaje}</p>
        </div>
      </div>
{/* ------------- mostrando los tipos de pokemons que hay y pode filtrar busqueda por tipo */}
      <div className="container">
        Filtrar:
        <select className="form-control" onChange={handlerSelect}>
          <option value="https://pokeapi.co/api/v2/pokemon/">Default</option>
          {tipos.map((element, index) => (
            <option key={index} value={element.url}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
      <div className="container-card">
        {/* mostrando el pokemon que a buscado */}
        {mostrar ? <CardPokemon thisPokemon={onePokemon} /> : <></>}
        
        {/* mostrando los pokemons que se iso por el filtro de tipos de pokemon */}
        {mostrar ? <></> : comprobarPokemons()}
      </div>
    </>
  );
};

export default BuscarPokemon;
