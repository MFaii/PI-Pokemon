const url = "https://pokeapi.co/api/v2/pokemon?limit=40";
const axios = require("axios");
const { Pokemon, Type } = require("../db");

//Traigo todos los pokemons de la api y db =>

const getAllPokemons = async () => {
  const firstcall = await axios.get(url);
  const infoFirstCall = firstcall.data.results.map(async (e) => {
    const datos = await axios.get(e.url);
    return {
      ...datos,
    };
  });
  const resultado = await Promise.all(infoFirstCall);
  const PokeMap = await resultado.map((r) => r.data);
  const PokeInfo = await PokeMap.map((p) => {
    return {
      id: p.id,
      name: p.name,
      img: p.sprites.front_default,
      hp: p.stats[0].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      speed: p.stats[5].base_stat,
      types: p.types.map((t) => t.type.name),
    };
  });
  const dbPokes = await Pokemon.findAll({
    attributes: ["name", "img", "inDB"],
    include: {
      model: Type,
      attributes: ["name"],
      throught: {
        attributes: [],
      },
    },
  });
  const AllPokes = PokeInfo.concat(dbPokes);
  return AllPokes;
};

const getPokeById = async (id) => {
  const allPokes = await getAllPokemons();
  const pokemon = allPokes.filter((p) => p.id == id);
  return pokemon;
};

module.exports = {
  getAllPokemons,
  getPokeById,
};
