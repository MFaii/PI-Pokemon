const express = require("express");
const { getTypes } = require("../controllers/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let types = await getTypes();
    res.status(200).send(types);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
