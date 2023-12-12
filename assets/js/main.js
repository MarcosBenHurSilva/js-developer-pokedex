const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Adicionar classe .zoom ao card de Pokémon
pokemonList.querySelectorAll('.pokemon').forEach((pokemon) => {
    pokemon.classList.add('zoom')
})

// Adicionar evento listener ao card de Pokémon para o evento 'mouseenter'
pokemonList.querySelectorAll('.pokemon').forEach((pokemon) => {
    pokemon.addEventListener('mouseenter', () => {
    // Aplicar zoom ao card
    pokemon.style.transform = 'scale(1.2)'

    // Adicionar informações e habilidades do Pokémon
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('info')
    infoDiv.innerHTML = `
      <h3>${card.querySelector('.name').innerHTML}</h3>
      <p>Número: ${card.querySelector('.number').innerHTML}</p>
      <p>Tipos: ${card.querySelector('.types li').innerHTML}</p>
      <p>Habilidades: ${card.querySelector('.abilities li').innerHTML}</p>
    `
    card.appendChild(infoDiv)
  })
})

// Aplicar zoom ao card com transição
pokemon.style.transform = 'scale(1.2)'
pokemon.style.transition = 'transform 0.2s ease-in-out'