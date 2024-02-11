import styles from "../../styles/Pokedex.module.scss";
import ProgressBar from "../progressBar";

const BaseStats = ({ pokemon }) => {
  let totalBaseStats = 0;

  pokemon.stats?.forEach((el) => {
    totalBaseStats += el.base_stat;
  });

  return (
    <section className={styles.containerInfo}>
      {pokemon.stats?.map((el, index) => (
        <div key={index} className={styles.data}>
          <div className={styles.containerName}>
            <h5>{el.stat.name}</h5>
          </div>

          <ProgressBar value={el.base_stat} />

          <div className={styles.info}>
            <p>{el.base_stat}</p>
          </div>
        </div>
      ))}
      <div className={styles.data}>
        <div className={styles.containerName}>
          <h5>Total</h5>
        </div>
        <div className={styles.info}>
          <p>{totalBaseStats}</p>
        </div>
      </div>
    </section>
  );
};

export default BaseStats;
