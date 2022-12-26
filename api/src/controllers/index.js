const url = "https://pokeapi.co/api/v2/pokemon";
const axios = require("axios");
const db = require("../db");
const { Pokemon, Type } = require("../db");

//Traigo todos los pokemons de la api y db =>

const getAllPokemons = async () => {
  const CallApi = await axios.get(url);
  const infoFc = CallApi.data.results.map(async (e) => {
    const datos = await axios.get(e.url);
    return {
      ...datos,
    };
  });
  const res = await Promise.all(infoFc);
  const pokedata = await res.map((r) => r.data);
  const pokeinfo = await pokedata.map((p) => {
    return {
      id: p.id,
      name: p.name,
      img: p.sprites.front_default,
      hp: p.stats[0].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      speed: p.stats[5].base_stat,
      weight: p.weight,
      height: p.height,
      types: p.types.map((t) => t.type.name),
    };
  });
  const next = await axios.get(CallApi.data.next);
  const infoSc = next.data.results.map(async (e) => {
    const datos = await axios.get(e.url);
    return {
      ...datos,
    };
  });
  const resv2 = await Promise.all(infoSc);
  const pokedata2 = await resv2.map((r) => r.data);
  const pokeinfo2 = await pokedata2.map((p) => {
    return {
      id: p.id,
      name: p.name,
      img: p.sprites.front_default,
      hp: p.stats[0].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      speed: p.stats[5].base_stat,
      weight: p.weight,
      height: p.height,
      types: p.types.map((t) => t.type.name),
    };
  });
  let dbPokes = await Pokemon.findAll({
    attributes: [
      "name",
      "life",
      "img",
      "inDB",
      "speed",
      "attack",
      "defense",
      "weight",
      "height",
    ],
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  dbPokes = dbPokes.map((p) => ({
    ...p.dataValues,
    types: p.dataValues.types.map((t) => t.name),
  }));

  const AllPokes = pokeinfo.concat(pokeinfo2, dbPokes);
  return AllPokes;
};

const getPokeById = async (id) => {
  const allPokes = await getAllPokemons();
  const pokemon = allPokes.filter((p) => p.id == id);
  return pokemon;
};

const postPokemon = async (
  name,
  life,
  attack,
  defense,
  speed,
  img,
  height,
  weight,
  types
) => {
  let createPokemon = await Pokemon.create({
    name,
    life,
    attack,
    defense,
    speed,
    img,
    height,
    weight,
    types,
  });
  return createPokemon;
};

const getTypes = async () => {
  const ulrtype = "https://pokeapi.co/api/v2/type";
  let find = await Type.findAll();
  if (!find.length) {
    let get = await axios.get(ulrtype);
    let res = await get.data.results.map((t) => {
      return {
        name: t.name,
        id: t.id,
      };
    });
    await Type.bulkCreate(res);
    let typesDB = Type.findAll();
    return typesDB;
  } else {
    return find;
  }
};

module.exports = {
  getAllPokemons,
  getPokeById,
  postPokemon,
  getTypes,
};
