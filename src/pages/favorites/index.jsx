import { useEffect, useState } from "react";
import styles from "@/styles/Favorites.module.scss";
import Image from "next/image";

export default function Favorites() {
  const [favoritesFromStorage, setFavoritesFromStorage] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesFromStorage(favorites);
    }
  }, []);

  return (
    <div className={styles.Favorites}>
      <h1>Preferred Pokémon</h1>
      <ul>
        {favoritesFromStorage.map((pokemon, index) => (
          <div key={index}>
            <h2>{pokemon.name}</h2>
            <div className={styles.containerTypes}>
              {pokemon.types &&
                pokemon.types.map((el) => (
                  <p className={styles.type} key={el.type.name}>
                    {el.type.name}
                  </p>
                ))}

              <Image
                className={styles.imgPokemon}
                src={
                  pokemon.sprites?.other?.["official-artwork"]?.front_default
                }
                width={1000}
                height={1000}
                alt={pokemon.name + " picture"}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
