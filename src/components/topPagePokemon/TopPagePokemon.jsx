import styles from "../../styles/Pokedex.module.scss";
import { useState } from "react";
import { useEffect } from "react";

import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

const TopPagePokemon = ({ pokemon }) => {
  const [favorites, setFavorites] = useState([]);
  const [hearts, setHearts] = useState(false);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
  }, []);

  const isFavorite =
    favorites.filter((fav) => fav.id === pokemon.id).length > 0;

  const toggleFavorite = () => {
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const imageSrc = pokemon.sprites?.other?.["official-artwork"]?.front_default;
  const imgShiny = pokemon.sprites?.other?.["official-artwork"]?.front_shiny;

  const onHandleHeart = () => {
    setHearts((prev) => !prev);
    setTimeout(() => setHearts(false), 5000);
  };

  return (
    <>
      <header className={styles.containerArrowTitleHeart}>
        <Link href="/pokedex">
          <FaArrowLeft
            style={{ color: "var(--name-color)", fontSize: "20px" }}
          />
        </Link>

        <h1>
          {pokemon.name
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : "Nome non disponibile"}
        </h1>
        <div
          style={{
            color: "var(--name-color)",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={toggleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
      </header>
      {/* type */}
      <div className={styles.containerTypes}>
        {pokemon.types &&
          pokemon.types.map((el) => (
            <p className={styles.type} key={el.type.name}>
              {el.type.name}
            </p>
          ))}
      </div>
      <section>
        <div className={styles.containerImgandNumber}>
          {/* //---heart--- */}
          {hearts && (
            <div className={styles.hearts}>
              <FaHeart />
            </div>
          )}
          {imageSrc ? (
            <Image
              onClick={onHandleHeart}
              className={styles.imgPokemon}
              src={hearts == true ? imgShiny : imageSrc}
              width={1000}
              height={1000}
              alt={pokemon.name + " picture"}
            />
          ) : (
            <p>Immagine non disponibile</p>
          )}

          <span>
            {"#" +
              (typeof pokemon.order === "number"
                ? pokemon.order
                : "Numero non disponibile")}
          </span>
        </div>
      </section>
    </>
  );
};

export default TopPagePokemon;
