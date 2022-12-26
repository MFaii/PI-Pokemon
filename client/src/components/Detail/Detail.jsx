import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const Detail = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokeDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      {myPokemon.length > 0 ? (
        <div>
          <h1>
            Name :{" "}
            {myPokemon[0].name.charAt(0).toUpperCase() +
              myPokemon[0].name.slice(1)}
          </h1>
          <h2>Pokedex ID: {myPokemon[0].id}</h2>
          <img src={myPokemon[0].img} alt="" width="500px" height="700px" />
          <p>Hp: {myPokemon[0].hp}</p>
          <p>Attack: {myPokemon[0].attack}</p>
          <p>Defense: {myPokemon[0].defense}</p>
          <p>Speed: {myPokemon[0].speed}</p>
          <p>Weight: {myPokemon[0].weight}</p>
          <p>Height: {myPokemon[0].height}</p>
          <h4>
            Types:{" "}
            {!myPokemon[0].inDB
              ? myPokemon[0].types + " "
              : myPokemon[0].types.map((el) => el.name + " ")}
          </h4>
        </div>
      ) : (
        <Loading />
      )}
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Detail;
