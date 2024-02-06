// import styles from "../../styles/Pokedex.module.scss";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import PokedexDynamic from "@/pages/pokedex/[name]";

// const Api = () => {
//   const [pokemon, setPokemon] = useState({});
//   const [pokemonSpecies, setPokemonSpecies] = useState({});
//   const router = useRouter();

//   useEffect(() => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`)
//       .then((res) => res.json())
//       .then((data) => setPokemon(data));
//   }, [router.query.name]);
//   useEffect(() => {
//     fetch(
//       `https://pokeapi.co/api/v2/pokemon-species/${router.query.name}/?language_id=9`
//     )
//       .then((res) => res.json())
//       .then((data) => setPokemonSpecies(data));
//   }, [router.query.name]);

//   return (
//     <>
//       <PokedexDynamic
//         pokemon={pokemon}
//         setPokemon={setPokemon}
//         setPokemonSpecies={setPokemonSpecies}
//         pokemonSpecies={pokemonSpecies}
//       />
//     </>
//   );
// };

// export default Api;
