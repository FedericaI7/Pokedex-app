import styles from "../../styles/Pokedex.module.scss";

const Moves = ({ pokemon }) => {
  return (
    <div className={StyleSheet.containerInfo}>
      <div className={styles.navMoves}>
        <div className={`${styles.containerName} ${styles.containerTitleNav} `}>
          <p>Moves</p>
        </div>

        <div className={`${styles.infoTwo} ${styles.containerTitleNav}`}>
          <p>Learned Method/At</p>
        </div>
      </div>

      {pokemon.moves?.map((el) => (
        <div className={styles.navMoves}>
          <div className={styles.containerName}>
            <h5>{el.move.name}</h5>
          </div>

          <div className={styles.infoTwo}>
            {el.version_group_details?.[0].move_learn_method?.name}
          </div>

          <div className={styles.infoTwo}>
            <p>{el.version_group_details?.[0].level_learned_at}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moves;
