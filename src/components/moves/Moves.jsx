import styles from "../../styles/Pokedex.module.scss";

const Moves = ({ pokemon }) => {
  return (
    <div className={StyleSheet.containerInfo}>
      {pokemon.moves?.map((el) => (
        <div className={styles.data}>
          <div className={styles.species}>
            <h5>Prova</h5>
          </div>
          <div className={styles.info}>
            <p>{el.move.name}</p>
          </div>
        </div>
      ))}
      <p>{console.log(pokemon.moves.map((el) => el.move.name))}</p>
    </div>
  );
};

export default Moves;
