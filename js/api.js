//Creamos la clase API
export class API {
  constructor(url) {
    this.url = url;
  }
  async getData(url) {
    const res = await fetch(this.url);
    const json = await res.json();

    this.verify(json);
    this.loadImage();
    this.openModal();
  }
  //verificar si el json tiene o no results
  verify(obj) {
    let view = obj.results
      ? this.showDataSearch(obj)
      : this.showDataRandom(obj);
  }
  //Mostrar los datos de busqueda
  showDataSearch(json) {
    const fragment = document.createDocumentFragment();
    const main = document.querySelector(".app-img");
    json.results.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
            <div class="img-container">
                <div class="loader">
                    
                </div>
                <img src="${element.urls.regular}" class="img__images" data-user="${element.user.links.photos}" data-avatar="${element.user.profile_image.small}" data-name="${element.user.first_name}" data-lastname="${element.user.last_name}" data-likes="${element.likes}" data-downloads="${element.user.total_photos}" data-image="${element.links.download}" data-bio="${element.user.bio}" data-views="${element.user.total_likes}" data-time="${element.created_at}" data-location="${element.user.location}">                
            </div>`;

      fragment.appendChild(div);
    });
    main.appendChild(fragment);
  }
  //Mostrar datos Random
  showDataRandom(json) {
    const fragment = document.createDocumentFragment();
    const main = document.querySelector(".app-img");
    json.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
            <div class="img-container">
                <div class="loader">
                   
                </div>
                <img src="${element.urls.regular}" class="img__images" data-user="${element.user.links.photos}" data-avatar="${element.user.profile_image.small}" data-name="${element.user.first_name}" data-lastname="${element.user.last_name}" data-likes="${element.likes}" data-image="${element.links.download}" data-bio="${element.user.bio}" data-views="${element.views}" data-time="${element.created_at}" data-location="${element.location.title}">
            </div>`;
      fragment.appendChild(div);
    });
    main.appendChild(fragment);
  }
  //agregar el loader a todas las imagenes
  loadImage() {
    const allImage = document.querySelectorAll(".img__images");
    const loaders = document.querySelectorAll(".loader");

    this.addClass(loaders, allImage, "loader-active");
    this.removeClass(allImage, "loader-active");
  }
  addClass(loader, img, className) {
    loader.forEach((element) => {
      element.classList.add(className);
    });
    img.forEach((element) => {
      element.style.display = "none";
    });
  }
  removeClass(img, className) {
    img.forEach((element) => {
      element.addEventListener("load", () => {
        element.previousElementSibling.classList.remove(className);
        element.style.display = "block";
        element.parentElement.parentElement.style.height = "fit-content";
      });
    });
  }
  //Cargar mas imagenes Search
  loadMore(i) {
    let nextUrl = this.newUlr(i);
    const api = new API(nextUrl);
    api.getData();
  }
  //Obtener la nueva url
  newUlr(i) {
    let newUrl = this.url.replace(/\d+/, i);
    return newUrl;
  }
  //Abrir el modal
  openModal() {
    const allImages = document.querySelectorAll(".img__images");
    this.modalImage(allImages);
  }
  //Obtener los datos de los usuario
  async usersPhotos(url) {
    const response = await fetch(url);
    const json = await response.json();
    const userApp = document.getElementById("user-app");

    userApp.textContent = "";
    const fragment = document.createDocumentFragment();

    json.forEach((element) => {
      const container = document.createElement("div");
      container.classList.add("user-content");
      container.innerHTML = `
            <div class="img-container">
                <div class="user-loader">
                
                </div>
                <img src="${
                  element.urls.regular
                }" class="user__images" data-user="${
        element.user.links.photos
      }" data-avatar="${element.user.profile_image.small}" data-name="${
        element.user.first_name
      }" data-lastname="${element.user.last_name}" data-likes="${
        element.likes
      }" data-bio="${element.user.bio}" data-views="${Math.round(
        Math.random() * 10000
      )}" data-time="${element.created_at}" data-image="${element.urls.full}">
        </div>`;
      fragment.appendChild(container);
    });
    userApp.appendChild(fragment);
    //agregar los loaders a las imagenes
    const userLoaders = document.querySelectorAll(".user-loader"),
      userAllImages = document.querySelectorAll(".user__images");
    //llamamos a los metodos
    this.addClass(userLoaders, userAllImages, "loader-user-active");
    this.removeClass(userAllImages, "loader-user-active");
    this.modalImage(userAllImages);
  }
  modalImage(images) {
    const modal = document.querySelector(".modal-container");
    const closeModal = document.querySelector(".close-modal");

    const descriptionContainer = document.querySelector(
      ".description-container"
    );
    const modalContent = document.querySelector(".modal__content");
    images.forEach((e) => {
      e.addEventListener("click", () => {
        //cuando las imagenes del usuaio escuchen el click el scroll serA 0
        descriptionContainer.scrollTop = 0;
        modalContent.scrollTop = 0;
        //Capturar los datos de los atributos y lo mostramos
        const avatar = document
          .querySelector(".user__avatar")
          .setAttribute("src", e.getAttribute("data-avatar"));
        const name = (document.querySelector(
          ".user__name"
        ).textContent = `${e.getAttribute("data-name")} ${e.getAttribute(
          "data-lastname"
        )}`);
        const bio = (document.querySelector(".description__bio").textContent =
          e.getAttribute("data-bio") == "null"
            ? "No biography :("
            : e.getAttribute("data-bio"));
        const downloadImage = document
          .querySelector(".user-downloads")
          .setAttribute("href", e.getAttribute("data-image"));
        const likes = (document.querySelector(
          ".user__likes-number"
        ).textContent = e.getAttribute("data-likes"));
        const time = (document.querySelector(".description__time").textContent = e.getAttribute("data-time"));
        const nameUser = (document.querySelector(
          ".user__photos-name"
        ).textContent = `More photos of ${e.getAttribute("data-name") }
         ${e.getAttribute("data-lastname")}`);
        const location = (document.querySelector(
          ".location__text"
        ).textContent =
          e.getAttribute("data-location") == "null" || "undefine"
            ? "My House"
            : e.getAttribute("data-location") || "My Library");
        const view = (document.querySelector(".views").textContent =
          e.getAttribute("data-views"));

        //access key
        let access = "K-rbAXsWHZp9Wn_BpIkdDYESaR3Et_99ql4TFohhn-4";
        let getphotosUser = `${e.getAttribute(
          "data-user"
        )}?client_id=${access}`;
        this.usersPhotos(getphotosUser);

        // activar el modal
        modal.classList.add("modal-active");
        modal.firstElementChild.firstElementChild.firstElementChild.setAttribute(
          "src",
          e.getAttribute("src")
        );
        //desactivar el modal
        closeModal.addEventListener("click", () => {
          modal.classList.remove("modal-active");
        });
      });
    });
  }
}
//get random photos
export class RANDOM extends API {
  constructor(url) {
    super(url);
  }
}
