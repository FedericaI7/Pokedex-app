import styles from "../../styles/Pokedex.module.scss";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

const TopPagePokemon = ({ pokemon }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const onHandleHeart = () => {
    setIsHeartClicked((prev) => !prev);
  };

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
          {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
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
    </>
  );
};

export default TopPagePokemon;
