import styles from "../../styles/Pokedex.module.scss";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

const TopPagePokemon = ({ pokemon }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // const onHandleHeart = () => {
  //   setIsHeartClicked((prev) => !prev);
  //   if (!isHeartClicked) {
  //     setFavorites([...favorites, pokemon]);
  //   } else {
  //     setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
  //   }
  // };

  const onHandleHeart = () => {
    setIsHeartClicked((prev) => !prev);
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (!isHeartClicked) {
      const updatedFavorites = [...favoritesFromStorage, pokemon];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favoritesFromStorage.filter(
        (fav) => fav.id !== pokemon.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const imageSrc = pokemon.sprites?.other?.["official-artwork"]?.front_default;

  const iconHeart = isHeartClicked == true ? <FaHeart /> : <FaRegHeart />;

  return (
    <>
      <div className={styles.containerArrowTitleHeart}>
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
          onClick={onHandleHeart}
        >
          {iconHeart}
        </div>
      </div>
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
        {imageSrc ? (
          <Image
            className={styles.imgPokemon}
            src={imageSrc}
            width={1000}
            height={1000}
            alt={pokemon.name + " picture"}
          />
        ) : (
          <p>Immagine non disponibile</p>
        )}
        {/* <Image
          className={styles.imgPokemon}
          src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          width={1000}
          height={1000}
          alt={pokemon.name + " picture"}
        /> */}
        <span>
          {"#" +
            (typeof pokemon.order === "number"
              ? pokemon.order
              : "Numero non disponibile")}
        </span>
      </div>
    </>
  );
};

export default TopPagePokemon;
