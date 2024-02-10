const ColorBackPokemon = (pokemonSpecies) => {
  if (!pokemonSpecies || !pokemonSpecies.color) {
    return "";
  }

  if (pokemonSpecies.color?.name === "green") {
    return "#48d0b0";
  } else if (pokemonSpecies.color?.name === "yellow") {
    return "#ffd970";
  }
  if (pokemonSpecies.color?.name === "red") {
    return "#fb6c6c";
  }
  if (pokemonSpecies.color?.name === "blue") {
    return "#92cbfe";
  }
  if (pokemonSpecies.color?.name === "pink") {
    return "#f0afed";
  }
  if (pokemonSpecies.color?.name === "purple") {
    return "#be58ee";
  }
  if (pokemonSpecies.color?.name === "brown") {
    return "#f47a2e";
  }
  if (pokemonSpecies.color?.name === "black") {
    return "rgb(53, 47, 47)";
  }
  if (pokemonSpecies.color?.name === "white") {
    return "rgb(227, 200, 200)";
  }
  if (pokemonSpecies.color?.name === "gray") {
    return "rgb(168, 168, 168)";
  }
};

export default ColorBackPokemon;
