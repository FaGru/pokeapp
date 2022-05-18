const pokemonModel = require("../models/pokemonModel");
const asyncHandler = require("express-async-handler");

// @desc  Get Pokemons
// @route GET /pokemons
// @acess     privat

const getPokemons = asyncHandler(async (req, res) => {
  res.json({ message: "test" });
});

//  @desc Set Pokemons
//  @route GET /pokemons
//  @acess    privat

const setPokemon = asyncHandler(async (req, res) => {
  res.json({ message: "set Pokemon" });
});

const updatePokemon = asyncHandler(async (req, res) => {
  res.json({ message: "update Pokemon" });
});

const deletePokemon = asyncHandler(async (req, res) => {
  res.json({ message: "del delete" });
});
module.exports = {
  getPokemons,
  setPokemon,
  updatePokemon,
  deletePokemon,
};
