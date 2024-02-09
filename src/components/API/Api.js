export const fetchPokemon = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.json();
};

export const fetchPokemonSpecies = async (name) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}/?language_id=9`
  );
  return res.json();
};
