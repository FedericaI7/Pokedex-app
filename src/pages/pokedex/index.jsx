import { useEffect, useState } from "react";
import styles from "../../styles/SearchPokedex.module.scss";
import styles2 from "@/styles/Pokedex.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";

export default function Pokedex({ pokemon }) {
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();
  const [apiData, setApiData] = useState({});
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=12").then((res) =>
      res.json().then((data) => setApiData(data))
    );
  }, []);

  useEffect(() => {
    if (apiData.results && apiData.results.length > 0) {
      Promise.all(
        apiData.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        })
      ).then((fetchedPokemonData) => {
        setPokemonData(fetchedPokemonData);
      });
    }
  }, [apiData]);

  const onHandleInput = (e) => {
    setValueInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValueInput("");
    router.push(`/pokedex/${valueInput}`);
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Pokeball_icon.png" />
      </Head>
      <main className={styles.SearchPokedex}>
        <div className={styles.navSearchPokedex}>
          <div className={styles.titleAndMenu}>
            <h1>What Pokemon are you looking for?</h1>

            <IoMenu style={{ fontSize: "30px" }} />
            <Image
              width={500}
              height={500}
              className={styles.backMenu}
              src="/Pokeball.svg"
            ></Image>
          </div>

          <div className={styles.containerInput}>
            <form onSubmit={handleSubmit}>
              <input
                value={valueInput}
                onChange={onHandleInput}
                type="text"
                placeholder="Search your pokemon"
              />
              <button>Search</button>
            </form>
          </div>
        </div>
        <section>
          {pokemonData.map((pokemon, index) => (
            <div key={index} className={styles.containerCardPokemongi}>
              {pokemon.sprites && (
                <div className={styles2.Pokedex}>
                  <Image
                    width={100}
                    height={50}
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={`image pokemon ${pokemon.name}`}
                  />
                  <h3>{pokemon.name}</h3>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
