import styles from "../../styles/Pokedex.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [router.query.name]);
  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${router.query.name}/?language_id=9`
    )
      .then((res) => res.json())
      .then((data) => setPokemonSpecies(data));
  }, [router.query.name]);

  return (
    <div className={styles.containerPokedex}>
      {pokemon && pokemonSpecies && (
        <div className={styles.Pokedex}>
          <h1>
            {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
          </h1>
        </div>
      )}
    </div>
  );
}
