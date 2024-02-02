import { useState } from "react";
import styles from "../../styles/Pokedex.module.scss";
import { useRouter } from "next/router";

export default function Pokedex() {
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();

  const onHandleInput = (e) => {
    setValueInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValueInput("");
    router.push(`/pokedex/${valueInput}`);
  };

  return (
    <div className={styles.Pokedex}>
      <form onSubmit={handleSubmit}>
        <input
          value={valueInput}
          onChange={onHandleInput}
          type="text"
          placeholder="Search your pokemon"
        />
      </form>
    </div>
  );
}
