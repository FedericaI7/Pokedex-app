import styles from "../../styles/Pokedex.module.scss";

const About = ({ pokemon, pokemonSpecies }) => {
  return (
    <div className={styles.containerInfo}>
      {/* Type */}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Type:</h5>
        </div>
        <div className={styles.info}>
          <p>{pokemon?.types?.[0]?.type?.name}</p>
        </div>
      </div>

      {/* ----Egg groups----- */}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Egg Groups:</h5>
        </div>
        <div className={styles.info}>
          {pokemonSpecies.egg_groups &&
            pokemonSpecies.egg_groups.map((el) => (
              <p key={el.name}>{el.name}</p>
            ))}
        </div>
      </div>
      {/* Height */}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Height:</h5>
        </div>
        <div className={styles.info}>
          <p>{pokemon.height * 10 + "cm"}</p>
        </div>
      </div>
      {/* Weight */}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Weight:</h5>
        </div>
        <div className={styles.info}>
          <p>{pokemon.weight + "kg"}</p>
        </div>
      </div>
      {/* Abilities */}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Abilities:</h5>
        </div>
        <div className={styles.info}>
          {pokemon.abilities?.map((el) => (
            <p key={el.name}>{el.ability?.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
