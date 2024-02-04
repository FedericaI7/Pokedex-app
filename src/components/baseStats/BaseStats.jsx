import styles from "../../styles/Pokedex.module.scss";

const BaseStats = ({ pokemon }) => {
  let totalBaseStats = 0;

  pokemon.stats?.forEach((el) => {
    totalBaseStats += el.base_stat;
  });

  return (
    <div className={styles.containerInfo}>
      {pokemon.stats?.map((el) => (
        <div className={styles.data}>
          <div className={styles.species}>
            <h5>{el.stat.name}</h5>
          </div>

          <div className={styles.info}>
            <p>{el.base_stat}</p>
          </div>
        </div>
      ))}
      <div className={styles.data}>
        <div className={styles.species}>
          <h5>Total</h5>
        </div>
        <div className={styles.info}>
          <p>{totalBaseStats}</p>
        </div>
      </div>
    </div>
  );
};

export default BaseStats;
