import React, { useState } from "react";
import styles from "@/styles/Sidebar.module.scss";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.containerMenu}>
      {isOpen ? (
        <IoClose
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            fontSize: "40px",
            color: "rgb(63, 57, 57)",
          }}
        />
      ) : (
        <IoMenu
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            fontSize: "40px",
            color: "rgb(63, 57, 57)",
          }}
        />
      )}

      {isOpen && (
        <ul className={styles.containerListItem}>
          <li className={styles.containerLink}>
            <Link className={styles.itemList} href=".">
              Home
            </Link>
          </li>
          <li className={styles.containerLink}>
            <Link className={styles.itemList} href="/pokedex">
              Pokedex
            </Link>
          </li>
          <li className={styles.containerLink}>
            <Link className={styles.itemList} href="/favorites">
              Favorites
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
