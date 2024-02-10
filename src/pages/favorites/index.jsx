import { useEffect, useState } from "react";
import styles from "@/styles/SearchPokedex.module.scss";

import Image from "next/image";
import Head from "next/head";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Favorites() {
  const [favoritesFromStorage, setFavoritesFromStorage] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesFromStorage(favorites);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValueInput("");
    router.push(`/pokedex/${valueInput}`);
  };

  const onHandleclickCard = (pokemon) => {
    router.push(`/pokedex/${pokemon.name}`);
  };

  const onHandleInput = (e) => {
    setValueInput(e.target.value.toLowerCase());
  };

  const toggleFavorite = (pokemon) => {
    let updatedFavorites;
    if (favoritesFromStorage.filter((fav) => fav.id === pokemon.id)) {
      updatedFavorites = favoritesFromStorage.filter(
        (fav) => fav.id !== pokemon.id
      );
    } else {
      updatedFavorites = [...favoritesFromStorage, pokemon];
    }

    setFavoritesFromStorage(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log("Updated favorites:", updatedFavorites);
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
            </div>

            <Sidebar />

            <Image
              width={75}
              height={75}
              className={styles.backMenu}
              src="/Pokeball.svg"
              alt="logo pokeball"
              priority={true}
            />
          </div>
        </div>
        <div className={styles.containerBottom}>
          <section className={styles.sectionCard}>
            {favoritesFromStorage.map((pokemon, index) => (
              <div
                key={index}
                className={`${styles.cardPokemon} ${styles.cardPokemonFavorites}`}
              >
                {/* //---heart icon-- */}

                <span
                  className={styles.iconHeart}
                  onClick={() => toggleFavorite(pokemon)}
                >
                  {favoritesFromStorage.filter(
                    (fav) => fav.id === pokemon.id
                  ) ? (
                    <FaHeart
                      style={{
                        color: "var(--name-color)",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      style={{
                        color: "var(--name-color)",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </span>

                {/* ---//Info Pokemon--- */}
                <div
                  onClick={() => onHandleclickCard(pokemon)}
                  style={{ cursor: "pointer" }}
                  className={styles.infoPokemon}
                >
                  {/* ----Number---- */}
                  {
                    <span className={styles.numberPokemon}>
                      {"#" + pokemon.order}
                    </span>
                  }
                  <h2>
                    {/* ---Name---- */}
                    {pokemon.name?.charAt(0).toUpperCase() +
                      pokemon.name?.slice(1)}
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
                {/* -----Image---- */}
                <Image
                  onClick={() => onHandleclickCard(pokemon)}
                  style={{ cursor: "pointer" }}
                  className={styles.imgPokemon}
                  src={
                    pokemon.sprites?.other?.dream_world?.front_default ||
                    pokemon.sprites?.other?.["official-artwork"].front_default
                  }
                  width={500}
                  height={500}
                  alt={pokemon.name + " picture"}
                />
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
