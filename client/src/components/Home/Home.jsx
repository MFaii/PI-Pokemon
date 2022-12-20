import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterByCreation,
  orderByName,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pag from "../Pag/Pag";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const [orden, setOrden] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterTypes(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterByCreation(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/pokemons">Crear pokemon</Link>
      <h1>PokePage</h1>
      {/*       <button
        onClick={(e) => {
          handleClick();
        }}
      >
        Reload Pokemons
      </button> */}
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={(e) => handleFilterTypes(e)}>
          <option value="All">All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="shadow">Shadow</option>
          <option value="unknown">Unknown</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="inDB">inDb</option>
          <option value="inApi">inApi</option>
        </select>
        <Pag
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        {currentPokemons?.map((p) => {
          return (
            <div>
              <Link to={"/home/" + p.id}>
                <Card name={p.name} img={p.img} types={p.types} key={p.id} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
