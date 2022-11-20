import { API, RANDOM } from "./api.js";
import { accessKey, secretKey } from "./config.js";

//variable
//navegacion
const menu = document.querySelector('.menu-hamburguer');
const nav = document.querySelector('.nav');

//Busqueda
const input = document.querySelector('.form__search');

//contenedor
const main = document.querySelector('.app-img')

//Mas
const btnMore = document.querySelector('.buttons__more');


menu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    menu.classList.toggle('menu-active');
});

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
