import styles from "../../styles/Pokedex.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import About from "@/components/about";
import BaseStats from "@/components/baseStats";
import Moves from "@/components/moves";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const router = useRouter();
  const [actualTab, setActualTab] = useState("About");

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

  const onhandleBtn = (tab) => {
    if (tab === "BaseStats") {
      setActualTab("BaseStats");
    }
    if (tab === "About") {
      setActualTab("About");
    }
    if (tab === "Moves") {
      setActualTab("Moves");
    }
  };

  return (
    <div className={styles.containerPokedex}>
      {pokemon && pokemonSpecies && (
        <div className={styles.Pokedex}>
          <h1>
            {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
          </h1>

          {/* type */}
          <div className={styles.containerTypes}>
            {pokemon.types &&
              pokemon.types.map((el) => (
                <p className={styles.type} key={el.type.name}>
                  {el.type.name}
                </p>
              ))}
          </div>
          <div className={styles.containerImgandNumber}>
            <Image
              className={styles.imgPokemon}
              src={
                pokemon.sprites &&
                pokemon.sprites.other?.["official-artwork"]?.front_default
              }
              width={1000}
              height={1000}
              alt={pokemon.name + " picture"}
            />
            <span>{"#" + pokemon.order}</span>
          </div>

          <nav className={styles.box}>
            {/* ---UL NAV ------ ---------------------------------------- */}
            <ul className={styles.navUl}>
              <button onClick={() => onhandleBtn("About")}>
                <li
                  className={styles.About}
                  style={
                    actualTab === "About"
                      ? { color: "black", borderBottom: "2px solid red" }
                      : {}
                  }
                >
                  About
                </li>
              </button>
              <button onClick={() => onhandleBtn("BaseStats")}>
                <li
                  className={styles.BaseStats}
                  style={
                    actualTab === "BaseStats"
                      ? { color: "black", borderBottom: "2px solid red" }
                      : {}
                  }
                >
                  Base Stats
                </li>
              </button>
              <button onClick={() => onhandleBtn("Moves")}>
                <li
                  className={styles.BaseStats}
                  style={
                    actualTab === "Moves"
                      ? { color: "black", borderBottom: "2px solid red" }
                      : {}
                  }
                >
                  Moves
                </li>
              </button>
            </ul>
            {actualTab === "About" && (
              <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
            )}
            {actualTab === "BaseStats" && <BaseStats pokemon={pokemon} />}
            {actualTab === "Moves" && <Moves pokemon={pokemon} />}
          </nav>
        </div>
      )}
    </div>
  );
}
