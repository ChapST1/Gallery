import { API, RANDOM } from "./api.js";
import { navigation } from "./nav.js";

//variable
const accessKey = "K-rbAXsWHZp9Wn_BpIkdDYESaR3Et_99ql4TFohhn-4";
const secretKey = "YUtsn8ARZKVUe3fPul3FCaK0IrajRai_GiQt7zBGOTg";

//navegacion
const nav = document.querySelector('.menu-hamburguer');

//Busqueda
const input = document.querySelector('.form__search');

//contenedor
const main = document.querySelector('.app-img')

//Mas
const btnMore = document.querySelector('.buttons__more');


nav.addEventListener('click', () => navigation(nav));

/* photos randoms */
const urlRandom = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const random = new RANDOM(urlRandom);
random.getData();

/* Buscar photos */
document.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = input;
    if (value !== "") {
        let iterator = 1;
        const url = `https://api.unsplash.com/search/photos?page=${iterator}&query=${value}&per_page=9&client_id=${accessKey}`;
        const api = new API(url);
        main.textContent = "";
        btnMore.style.display = "block";
        api.getData(value);

        /* load more */
        btnMore.addEventListener('click', () => {
            main.textContent = ""
            iterator++;
            api.loadMore(iterator);
        })
    }


})
