import styles from "../../styles/Pokedex.module.scss";

const Moves = ({ pokemon }) => {
  return (
    <div className={StyleSheet.containerInfo}>
      {pokemon.moves?.map((el) => (
        <div className={styles.data}>
          <div className={styles.containerName}>
            <h5>{el.move.name}</h5>
          </div>

          <div className={styles.info}>
            <p>{el.version_group_details?.[0].level_learned_at}</p>
          </div>

          <div className={styles.info}>
            {el.version_group_details?.[0].move_learn_method?.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Moves;
