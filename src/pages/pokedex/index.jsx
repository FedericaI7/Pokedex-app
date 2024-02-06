import { useEffect, useState } from "react";
import styles from "../../styles/SearchPokedex.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";

export default function Pokedex({ pokemon }) {
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=12").then((res) =>
      res.json().then((data) => setApiData(data))
    );
  }, []);

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
              {/* <IoSearch style={{ fontSize: "22px" }} /> */}
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
          <h1>
            {apiData.results?.map((el) => (
              <p>{el.name}</p>
            ))}
          </h1>
          {/* <Image
            className={styles.imgPokemon}
            src={
              pokemon.sprites &&
              pokemon.sprites.other?.["official-artwork"]?.front_default
            }
            width={1000}
            height={1000}
            alt={pokemon.name + " picture"}
          /> */}
        </section>
      </main>
    </>
  );
}
