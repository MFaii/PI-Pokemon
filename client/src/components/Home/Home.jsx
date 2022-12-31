import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterByCreation,
  orderByName,
  getTypes,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pag from "../Pag/Pag";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
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

  useEffect(() => {
    dispatch(getTypes());
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
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.maxContainer}>
      <div>
        <Link to="/">
          <button className={styles.landingButton}>Landing Page</button>
        </Link>

        <div>
          <Link to="/createpokemon">
            <button className={styles.landingButton}>Create pokemon</button>
          </Link>

          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={styles.landingButton}
          >
            Reload Pokemons
          </button>
        </div>
      </div>

      <div>
        <div className={styles.divSelect}>
          <div className={styles.containerSelect}>
            <select onChange={(e) => handleSort(e)}>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select onChange={(e) => handleFilterTypes(e)}>
              <option value="All">All</option>
              {types.map((t) => (
                <option value={t.name}>{t.name}</option>
              ))}
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="All">All</option>
              <option value="inDB">inDb</option>
              <option value="inApi">inApi</option>
            </select>
          </div>
          <SearchBar />
          <Pag
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        </div>
        <div className={styles.containerCards1}>
          {currentPokemons?.map((p) => {
            return (
              <div className={styles.containerCards}>
                <Link to={"/home/" + p.id} style={{ textDecoration: "none" }}>
                  <Card
                    name={p.name}
                    img={
                      p.img ? (
                        p.img
                      ) : (
                        <img src="https://mediamaster.vandal.net/m/10-2021/2021105724573_1.jpg" />
                      )
                    }
                    types={p.types}
                    key={p.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
