export const navigation = (a) => {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');

    a.classList.toggle('menu-active');
}
