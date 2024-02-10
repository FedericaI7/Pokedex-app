import { useEffect, useState } from "react";
import styles from "../../styles/Pokedex.module.scss";
import { fetchPokemonSpecies, fetchPokemon } from "@/components/API/Api";
import Image from "next/image";
import { useRouter } from "next/router";

const Evolution = ({ pokemon }) => {
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [evolutionData, setEvolutionData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDataSpecies = async () => {
      const pokemonSpeciesData = await fetchPokemonSpecies(pokemon.name);
      setPokemonSpecies(pokemonSpeciesData);

      if (pokemonSpeciesData?.evolution_chain?.url) {
        const evolutionChain = await fetch(
          pokemonSpeciesData.evolution_chain.url
        );
        const evolutionChainData = await evolutionChain.json();

        const chainArray = await listEvolution(evolutionChainData.chain);
        setEvolutionData(chainArray);
      }
    };

    fetchDataSpecies();
  }, [pokemon.name]);

  const fetchPokemonData = async (url) => {
    const pokemonId = url.split("/").slice(-2, -1)[0];
    const pokemonData = await fetchPokemon(pokemonId);
    return pokemonData;
  };

  const listEvolution = async (chain) => {
    const evolutionDataArray = [];

    const list = async (chain) => {
      const pokemonData = await fetchPokemonData(chain.species.url);
      evolutionDataArray.push({
        name: chain.species.name,
        url: chain.species.url,
        image: pokemonData.sprites.other.showdown.front_default,
        // image:
        //   pokemonData.sprites.versions["generation-v"]["black-white"].animated
        //     .front_default,
      });

      if (chain.evolves_to && chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
          await list(evolution);
        }
      }
    };

    await list(chain);
    return evolutionDataArray;
  };

  const onHandleclickCard = (pokemon) => {
    router.push(`/pokedex/${pokemon.name}`);
  };

  return (
    <div className={styles.containerInfoEvolution}>
      {evolutionData.map((pokemon, index) => (
        <div key={index} className={styles.evolutionInfo}>
          <p>{pokemon.name}</p>
          <Image
            onClick={() => onHandleclickCard(pokemon)}
            style={{ cursor: "pointer" }}
            className={styles.imgPokemon}
            src={pokemon.image}
            alt={`image pokemon ${pokemon}`}
            width={1000}
            height={100}
          />
        </div>
      ))}
    </div>
  );
};

export default Evolution;
