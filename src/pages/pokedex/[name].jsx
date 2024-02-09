import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPokemon, fetchPokemonSpecies } from "@/components/API/Api";
import styles from "../../styles/Pokedex.module.scss";
import Head from "next/head";
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
