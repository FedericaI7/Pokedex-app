import { useEffect, useState } from "react";
import styles from "../../styles/SearchPokedex.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";

export default function Pokedex({ pokemon }) {
  const [valueInput, setValueInput] = useState("");
  const router = useRouter();
  const [apiData, setApiData] = useState({});

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon/?limit=12").then((res) =>
  //     res.json().then((data) => setApiData(data))
  //   );
  // }, []);

  const onHandleInput = (e) => {
    setValueInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValueInput("");
    router.push(`/pokedex/${valueInput}`);
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Pokeball_icon.png" />
      </Head>
      <main className={styles.SearchPokedex}>
        <div className={styles.navSearchPokedex}>
          <div className={styles.titleAndMenu}>
            <h1>What Pokemon are you looking for?</h1>

            <IoMenu style={{ fontSize: "30px" }} />
            <Image
              width={500}
              height={500}
              className={styles.backMenu}
              src="/Pokeball.svg"
            ></Image>
          </div>

          <div className={styles.containerInput}>
            <form onSubmit={handleSubmit}>
              <input
                value={valueInput}
                onChange={onHandleInput}
                type="text"
                placeholder="Search your pokemon"
              />
              <button>Search</button>
            </form>
          </div>
        </div>

        {/* <h1>
          {apiData.results?.map((el) => el.url)}
          <p>
            {console.log(
              apiData.results?.map((el) => el.url.pokemon?.forms?.name)
            )}
          </p>
        </h1> */}
        
      </main>
    </>
  );
}
