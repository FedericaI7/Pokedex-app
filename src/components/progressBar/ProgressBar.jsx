import styles from "../../styles/ProgressBar.module.scss";

const ProgressBar = ({ value }) => {
  return (
    <div className={styles.ProgressBar}>
      <div className={styles.barChart} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default ProgressBar;
