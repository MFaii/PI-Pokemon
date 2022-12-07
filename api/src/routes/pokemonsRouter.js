const express = require("express");
const { getAllPokemons, getPokeById } = require("../controllers/index");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const pokemons = await getAllPokemons();
    if (name) {
      const PokeFilter = pokemons.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      PokeFilter.length
        ? res.status(200).send(PokeFilter)
        : res.status(400).send("Pokemon not found");
    } else {
      res.status(200).send(pokemons);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const info = await getPokeById(id);
    if (info) res.status(200).send(info);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
