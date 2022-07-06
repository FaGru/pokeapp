const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getPokemons, setPokemon, updatePokemon, deletePokemon } = require("../controllers/pokemonController");

router.route("/favorites").get(protect, getPokemons).post(protect, setPokemon);
router.route("/catch/:id").put(protect, updatePokemon).delete(protect, deletePokemon);

module.exports = router;
