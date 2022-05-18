const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add pokemon number"],
      ref: "User",
    },
    pokedexNumber: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Pokemon", pokemonSchema);
