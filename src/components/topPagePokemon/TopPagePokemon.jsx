import styles from "../../styles/Pokedex.module.scss";
import Image from "next/image";

const TopPagePokemon = ({ pokemon }) => {
  return (
    <>
      <h1>{pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}</h1>

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
