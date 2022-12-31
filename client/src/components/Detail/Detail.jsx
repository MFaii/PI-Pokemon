import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail, Unmount } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import styles from "./Detail.module.css";

const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokeDetail(props.match.params.id));
    return () => dispatch(Unmount());
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div className={styles.general}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      {myPokemon.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.img}>
            <h1>
              Name :{" "}
              {myPokemon[0].name?.charAt(0).toUpperCase() +
                myPokemon[0].name?.slice(1)}
            </h1>
            <h2>Pokedex ID: {myPokemon[0].id}</h2>
            <img src={myPokemon[0].img} alt="" width="400px" height="600px" />
          </div>
          <div className={styles.statscontainer}>
            <p>Hp: {myPokemon[0].hp}</p>
            <p>Attack: {myPokemon[0].attack}</p>
            <p>Defense: {myPokemon[0].defense}</p>
            <p>Speed: {myPokemon[0].speed}</p>
            <p>Weight: {myPokemon[0].weight}</p>
            <p>Height: {myPokemon[0].height}</p>
            <h4>Types: {myPokemon[0].types?.join(", ")}</h4>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Detail;
