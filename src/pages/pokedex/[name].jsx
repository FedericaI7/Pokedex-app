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

  const colorBackPokemon = () => {
    if (pokemonSpecies.color?.name === "green") {
      return "#48d0b0";
    }
    if (pokemonSpecies.color?.name === "yellow") {
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

  return (
    <div className={styles.containerPokedex}>
      {pokemon && pokemonSpecies && (
        <div
          className={styles.Pokedex}
          style={{ backgroundColor: colorBackPokemon() }}
        >
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
          <div className={styles.downSection}>
            <nav className={styles.nav}>
              {/* ---UL NAV ------ ---------------------------------------- */}
              <ul className={styles.navUl}>
                <button onClick={() => onhandleBtn("About")}>
                  <li
                    className={styles.About}
                    style={
                      actualTab === "About"
                        ? {
                            color: "black",
                            borderBottom: `2px solid ${colorBackPokemon()}`,
                          }
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
                        ? {
                            color: "black",
                            borderBottom: `2px solid ${colorBackPokemon()}`,
                          }
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
                        ? {
                            color: "black",
                            borderBottom: `2px solid ${colorBackPokemon()}`,
                          }
                        : {}
                    }
                  >
                    Moves
                  </li>
                </button>
              </ul>
            </nav>
            {actualTab === "About" && (
              <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
            )}
            {actualTab === "BaseStats" && <BaseStats pokemon={pokemon} />}
            {actualTab === "Moves" && <Moves pokemon={pokemon} />}
          </div>
        </div>
      )}
    </div>
  );
}
