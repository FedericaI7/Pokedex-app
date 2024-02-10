import styles from "../../styles/ProgressBar.module.scss";

const ProgressBar = ({ value }) => {
  return (
    <aside className={styles.ProgressBar}>
      <div className={styles.barChart} style={{ width: `${value}%` }}></div>
    </aside>
  );
};

export default ProgressBar;
