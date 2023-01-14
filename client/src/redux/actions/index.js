import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterByCreation(payload) {
  return {
    type: "FILTER_BY_CREATION",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: "FILTER_BY_ATTACK",
    payload,
  };
}

export function getPokeNames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: "GET_POKENAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokeDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/types", {});
    return dispatch({ type: "GET_TYPES", payload: info.data });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/pokemons", payload);
    return res;
  };
}

export function Unmount() {
  return async function (dispatch) {
    return dispatch({ type: "Unmount", payload: [{}] });
  };
}
