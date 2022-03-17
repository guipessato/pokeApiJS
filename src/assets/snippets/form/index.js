// API
const URL = 'https://pokeapi.co/api/v2/pokemon/';

// Pegando elementos
const searchInput = getElement('.form-pokemon__input'), // Pegando o input de busca
    searchButton = getElement('.form-pokemon__search'), // Pegando o botao de busca
    container = getElement('.pokemon'), // Pegando o container/div/elemento que ira receber o consumo da API
    erroMessage = getElement('.error'); // Pegando o container/div/elemento que ira receber o erro da API

var namePokemon, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por guardar os dados recebidos da API
    card; // Responsavel por receber o HTML 

// Construindo as funcoes

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
    return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
        })
        .catch(err => console.log(err));
}

// Função responsavel por montar o HTML exibido na pagina
function createCard() {
    card = `
    <figure class="pokemon__imagem"><img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}"></figure>
    <div class="pokemon__informations">
        <h1 class="pokemon__name">Name: ${pokemon.name}</h1>
        <h2 class="pokemon__number">Nº ${pokemon.id}</h2>
        <h3 class="pokemon__type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h3 class="pokemon__weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="pokemon__height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
    return card;
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(namePokemon) {
    requestPokeInfo(URL, namePokemon);

    setTimeout(function () {
        //Exibe uma mensagem caso o pokemon pesquisado não exista
        if (pokemon.detail) {
            erroMessage.style.display = 'block';
            container.style.display = 'none';
        } else {
            erroMessage.style.display = 'none';
            container.style.display = 'flex';
            container.innerHTML = createCard();
        }
    }, 2000);
}

// Envento de busca no click do botao
searchButton.addEventListener('click', event => {
    event.preventDefault();
    namePokemon = searchInput.value.toLowerCase();
    startApp(namePokemon);
});