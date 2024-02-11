import styles from "../../styles/SearchPokedex.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPokemon } from "@/components/API/Api";
import Image from "next/image";

import ColorBackPokemon from "@/components/colorBackPokemon";
import Sidebar from "@/components/sidebar";

export default function Pokedex() {
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();
  const [apiData, setApiData] = useState({});
  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const limitNumberPokemon = "?limit=9";
      const ninePokemon = await fetchPokemon(limitNumberPokemon);
      setApiData(ninePokemon);

      if (ninePokemon.results && ninePokemon.results.length > 0) {
        const fetchedPokemonData = await Promise.all(
          ninePokemon.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();

            const speciesResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/?language_id=9`
            );
            const speciesData = await speciesResponse.json();

            return { ...pokemonData, species: speciesData };
          })
        );
        setPokemonData(fetchedPokemonData);
      }
    };

    fetchData();
    fetchAllPokemon();
  }, []);

  const allPokemon = "?limit=100000&offset=0";
  const fetchAllPokemon = async () => {
    const allPokemonData = await fetchPokemon(allPokemon);
    const allPokemonNames = allPokemonData.results.map(
      (pokemon) => pokemon.name
    );
    setAllPokemonNames(allPokemonNames);
  };

  const onHandleInput = (e) => {
    setValueInput(e.target.value.toLowerCase());
    const suggestions = allPokemonNames
      .filter((name) =>
        name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setSuggestions(suggestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValueInput("");

    //search just the name that exists
    if (allPokemonNames.includes(valueInput)) {
      router.push(`/pokedex/${valueInput}`);
    }
  };

  const onHandleclickCard = (pokemon) => {
    router.push(`/pokedex/${pokemon}`);
  };

  const showSettings = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Pokeball_icon.png" />
      </Head>
      <header className={styles.SearchPokedex}>
        <nav className={styles.navSearchPokedex}>
          <div className={styles.titleAndMenu}>
            <div className={styles.leftNav}>
              <h1>What Pokemon are you looking for?</h1>
              <form onSubmit={handleSubmit} className={styles.containerInput}>
                <input
                  value={valueInput}
                  onChange={onHandleInput}
                  type="text"
                  placeholder="Search your pokemon"
                />
                <button onClick={handleSubmit}>Search</button>
              </form>
              {suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      className={styles.resultSuggestion}
                      key={index}
                      onClick={() => setValueInput(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Sidebar />

            <Image
              width={75}
              height={75}
              className={styles.backMenu}
              src="/Pokeball.svg"
              alt="logo pokeball"
              priority={true}
            ></Image>
          </div>
        </nav>
      </header>

      <main className={styles.sectionCard}>
        {/* Card Section Pokemon  */}
        {pokemonData.map((pokemon, index) => (
          <div
            onClick={() => onHandleclickCard(pokemon.name)}
            key={index}
            className={styles.cardPokemon}
            style={{
              backgroundColor: ColorBackPokemon(pokemon.species),
              cursor: "pointer",
            }}
          >
            <div>
              {/* ----Number---- */}
              {
                <span className={styles.numberPokemon}>
                  {"#" + pokemon.order}
                </span>
              }
              <h2>
                {/* ---Name---- */}
                {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
              </h2>
              <div className={styles.containerTypes}>
                {/* ---Types---- */}
                {pokemon.types &&
                  pokemon.types.map((el) => (
                    <p className={styles.type} key={el.type.name}>
                      {el.type.name}
                    </p>
                  ))}
              </div>
            </div>
            {/* ----Image---- */}
            <Image
              className={styles.imgPokemon}
              width={100}
              height={50}
              src={pokemon.sprites.other.dream_world.front_default}
              alt={`image pokemon ${pokemon.name}`}
            />
          </div>
        ))}
      </main>
    </>
  );
}
