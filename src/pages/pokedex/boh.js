<section className={styles.sectionCard}>
  {/* Card Section Pokemon  */}
  {pokemonData.map((pokemon, index) => (
    <div
      key={index}
      className={styles.cardPokemon}
      style={{
        backgroundColor: colorBackPokemon(pokemon.species),
      }}
    >
      <div className={styles.sdosndono}>
        {/* ----Number---- */}
        {<span className={styles.numberPokemon}>{"#" + pokemon.order}</span>}
        <h2>
          {/* ---Name---- */}
          {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
        </h2>
        <div className={styles.containerTypes}>
          {/* ---Types---- */}
          {pokemon.types &&
            pokemon.types.map((el) => (
              <p className={styles.type} key={el.type.name}>
                {el.type.name}
              </p>
            ))}
        </div>
      </div>
      {/* ----Image---- */}
      <Image
        className={styles.imgPokemon}
        width={100}
        height={50}
        src={pokemon.sprites.other.dream_world.front_default}
        alt={`image pokemon ${pokemon.name}`}
      />
    </div>
  ))}
</section>;
