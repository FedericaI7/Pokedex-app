import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Pokeball_icon.png" />
      </Head>
      <main className={styles.main}>
        <Image
          className={styles.logoPokedex}
          src="/Pokedex_logo.png"
          alt="logo Pokedex"
          width="1000"
          height="300"
        ></Image>
        <Link href="/pokedex" className={styles.start} title="Pokedex page">
          START
        </Link>
      </main>
    </>
  );
}
