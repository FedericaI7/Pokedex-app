import styles from "../../styles/Pokedex.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import About from "@/components/about";
import BaseStats from "@/components/baseStats";
import Moves from "@/components/moves";
import TopPagePokemon from "@/components/topPagePokemon";
import colorBackPokemon from "./colorBackPokemon";

export default function PokedexDynamic() {
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
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Pokeball_icon.png" />
      </Head>

      <div className={styles.containerPokedex}>
        {pokemon && pokemonSpecies && (
          <div
            className={styles.Pokedex}
            style={{ backgroundColor: colorBackPokemon(pokemonSpecies) }}
          >
            <TopPagePokemon pokemon={pokemon} />

            <div
              className={styles.bottomSection}
              style={{
                background: `linear-gradient(to top, ${colorBackPokemon(
                  pokemonSpecies
                )} 2%, rgb(255, 244, 244) 30%)`,
              }}
            >
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
                              borderBottom: `2px solid ${colorBackPokemon(
                                pokemonSpecies
                              )}`,
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
                              borderBottom: `2px solid ${colorBackPokemon(
                                pokemonSpecies
                              )}`,
                            }
                          : {}
                      }
                    >
                      Base Stats
                    </li>
                  </button>
                  <button onClick={() => onhandleBtn("Moves")}>
                    <li
                      className={styles.Moves}
                      style={
                        actualTab === "Moves"
                          ? {
                              color: "black",
                              borderBottom: `2px solid ${colorBackPokemon(
                                pokemonSpecies
                              )}`,
                            }
                          : {}
                      }
                    >
                      Moves
                    </li>
                  </button>
                </ul>
              </nav>
              <p>{console.log(pokemonSpecies.color?.name)}</p>
              {actualTab === "About" && (
                <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
              )}
              {actualTab === "BaseStats" && <BaseStats pokemon={pokemon} />}
              {actualTab === "Moves" && <Moves pokemon={pokemon} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
