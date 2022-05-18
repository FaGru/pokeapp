const express = require("express");
const router = express.Router();

const { getPokemons, setPokemon, updatePokemon, deletePokemon } = require("../controllers/pokemonController");

router.route("/").get(getPokemons).post(setPokemon);
router.route("/:id").put(updatePokemon).delete(deletePokemon);

module.exports = router;
