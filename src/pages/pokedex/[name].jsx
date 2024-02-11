import styles from "../../styles/Pokedex.module.scss";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPokemon, fetchPokemonSpecies } from "@/components/API/Api";

import About from "@/components/about";
import BaseStats from "@/components/baseStats";
import Moves from "@/components/moves";
import Evolution from "@/components/evolution";
import TopPagePokemon from "@/components/topPagePokemon";
import ColorBackPokemon from "@/components/colorBackPokemon";

export default function PokedexDynamic() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const router = useRouter();
  const [actualTab, setActualTab] = useState("About");

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await fetchPokemon(router.query.name);
      setPokemon(pokemonData);

      const pokemonSpeciesData = await fetchPokemonSpecies(router.query.name);
      setPokemonSpecies(pokemonSpeciesData);
    };

    fetchData();
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
    if (tab === "Evolution") {
      setActualTab("Evolution");
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

      <main className={styles.containerPokedex}>
        {pokemon && pokemonSpecies && (
          <div
            className={styles.Pokedex}
            style={{ backgroundColor: ColorBackPokemon(pokemonSpecies) }}
          >
            <TopPagePokemon pokemon={pokemon} />

            <div
              className={styles.bottomSection}
              style={{
                background: `linear-gradient(to top, ${ColorBackPokemon(
                  pokemonSpecies
                )} 2%, rgb(255, 244, 244) 30%)`,
              }}
            >
              <nav className={styles.nav}>
                <ul className={styles.navUl}>
                  <button onClick={() => onhandleBtn("About")}>
                    <li
                      key="about"
                      className={styles.About}
                      style={
                        actualTab === "About"
                          ? {
                              color: "black",
                              borderBottom: `2px solid ${ColorBackPokemon(
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
                      key="baseStats"
                      className={styles.BaseStats}
                      style={
                        actualTab === "BaseStats"
                          ? {
                              color: "black",
                              borderBottom: `2px solid ${ColorBackPokemon(
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
                      key="moves"
                      className={styles.Moves}
                      style={
                        actualTab === "Moves"
                          ? {
                              color: "black",
                              borderBottom: `2px solid ${ColorBackPokemon(
                                pokemonSpecies
                              )}`,
                            }
                          : {}
                      }
                    >
                      Moves
                    </li>
                  </button>
                  <button onClick={() => onhandleBtn("Evolution")}>
                    <li
                      key="evolution"
                      className={styles.Moves}
                      style={
                        actualTab === "Evolution"
                          ? {
                              color: "black",
                              borderBottom: `2px solid ${ColorBackPokemon(
                                pokemonSpecies
                              )}`,
                            }
                          : {}
                      }
                    >
                      Evolution
                    </li>
                  </button>
                </ul>
              </nav>

              {actualTab === "About" && (
                <About pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
              )}
              {actualTab === "BaseStats" && <BaseStats pokemon={pokemon} />}
              {actualTab === "Moves" && <Moves pokemon={pokemon} />}
              {actualTab === "Evolution" && <Evolution pokemon={pokemon} />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
