const Pokemon = require("../models/pokemonModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc  Get Pokemons
// @route GET /pokemons
// @acess     privat

const getPokemons = asyncHandler(async (req, res) => {
  const pokemons = await Pokemon.find({ user: req.user.id });

  res.status(200).json(pokemons);
});

//  @desc Set Pokemons
//  @route POST /pokemons
//  @acess    privat

const setPokemon = asyncHandler(async (req, res) => {
  if (!req.body.favoritePokemonList) {
    res.status(400);
    throw new Error("PLease add a text field");
  }

  const pokemon = await Pokemon.create({
    favoritePokemonList: req.body.favoritePokemonList,
    user: req.user.id,
  });

  res.json({ message: "set Pokemon" });
});

const updatePokemon = asyncHandler(async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);

  const user = await User.findById(req.user.id);

  if (!pokemon) {
    res.status(400);
    throw new Error("Pokemon not found");
  }

  const updatePokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //Check for the user
  if (!user) {
    //not authorized
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure logged in user matches the pokemon user
  if (pokemon.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(updatePokemon);
});

const deletePokemon = asyncHandler(async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const deletePokemon = await Pokemon.findByIdAndDelete(req.params.id, req.body);

  //Check for the user
  if (!user) {
    //not authorized
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure logged in user matches the pokemon user
  if (pokemon.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(deletePokemon);
});
module.exports = {
  getPokemons,
  setPokemon,
  updatePokemon,
  deletePokemon,
};
