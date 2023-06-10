const pokemonListElement = document.getElementById('pokemon-list');

async function fetchPokemon(url) {
  try {
    console.log("Dhilli_3",url)
    const response = await fetch(url);
    const data = await response.json();
    console.log("Dhilli_4",data)
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

async function getPokemonData(pokemonUrl) {
  console.log("Dhilli_2",pokemonUrl)
  const pokemonData = await fetchPokemon(pokemonUrl);
  console.log("Dhilli_5",fetchPokemon(pokemonUrl))

  const abilities = pokemonData.abilities.map((ability) => ability.ability.name);
  console.log("Dhilli_6",abilities)
  const moves = pokemonData.moves.map((move) => move.move.name);
  console.log("Dhilli_7",moves)
  const weight = pokemonData.weight;
  console.log("Dhilli_8",weight)

  return { abilities, moves, weight };
}

async function displayPokemonList() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const data = await response.json();

    for (const pokemon of data.results) {
      console.log("Dhilli_1",pokemon.url)
      const pokemonData = await getPokemonData(pokemon.url);
      console.log("Dhillipan_9",pokemon.url)

      const pokemonElement = document.createElement('div');
      console.log("Dhillipan_10")
      pokemonElement.innerHTML = `
        <h3>${pokemon.name}</h3>
        <p>Abilities: ${pokemonData.abilities.join(', ')}</p>
        <p>Moves: ${pokemonData.moves.join(', ')}</p>
        <p>Weight: ${pokemonData.weight}</p>
        <hr>
      `;

      pokemonListElement.appendChild(pokemonElement);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

displayPokemonList();


