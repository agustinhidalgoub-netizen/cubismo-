// =========================
// CUBISMO - JAVASCRIPT GENERAL
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MENU MOBILE
  // =========================

  const nav = document.querySelector(".nav-header");
  const menu = document.querySelector(".menu-principal");

  if (nav && menu) {
    const botonMenu = document.createElement("button");
    botonMenu.classList.add("boton-menu");
    botonMenu.innerText = "MENÚ";

    nav.appendChild(botonMenu);

    botonMenu.addEventListener("click", () => {
      menu.classList.toggle("menu-activo");

      if (menu.classList.contains("menu-activo")) {
        botonMenu.innerText = "CERRAR";
      } else {
        botonMenu.innerText = "MENÚ";
      }
    });
  }

  // =========================
  // LINK ACTIVO EN EL MENU
  // =========================

  const paginaActual = window.location.pathname.split("/").pop();
  const linksMenu = document.querySelectorAll(".menu-principal a");

  linksMenu.forEach(link => {
    const href = link.getAttribute("href");

    if (href === paginaActual || (paginaActual === "" && href === "index.html")) {
      link.classList.add("link-activo");
    }
  });

  // =========================
  // ANIMACION AL SCROLL
  // =========================

  const elementosAnimados = document.querySelectorAll(
    "section, .tarjeta-artista, .tarjeta-obra, .detalle-texto, .detalle-imagen, .historia-bloque"
  );

  elementosAnimados.forEach(elemento => {
    elemento.classList.add("aparece");
  });

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.15
  });

  elementosAnimados.forEach(elemento => observer.observe(elemento));

  // =========================
  // CARRUSEL GALERIA INDEX
  // =========================

  const galeria = document.querySelector(".galeria");

  if (galeria) {
    const contenedorCarrusel = document.createElement("div");
    contenedorCarrusel.classList.add("controles-carrusel");

    const btnIzq = document.createElement("button");
    btnIzq.innerText = "←";
    btnIzq.setAttribute("aria-label", "Imagen anterior");

    const btnDer = document.createElement("button");
    btnDer.innerText = "→";
    btnDer.setAttribute("aria-label", "Imagen siguiente");

    contenedorCarrusel.appendChild(btnIzq);
    contenedorCarrusel.appendChild(btnDer);

    galeria.parentNode.insertBefore(contenedorCarrusel, galeria);

    btnIzq.addEventListener("click", () => {
      galeria.scrollBy({
        left: -320,
        behavior: "smooth"
      });
    });

    btnDer.addEventListener("click", () => {
      galeria.scrollBy({
        left: 320,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // LIGHTBOX PARA IMAGENES
  // =========================

  const imagenes = document.querySelectorAll(
    ".galeria img, .tarjeta-artista img, .tarjeta-obra img, .grilla-obras-destacadas img, .detalle-imagen img, .historia-img"
  );

  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  lightbox.innerHTML = `
    <div class="lightbox-contenido">
      <button class="cerrar-lightbox">×</button>
      <img src="" alt="">
      <p></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxTexto = lightbox.querySelector("p");
  const cerrarLightbox = lightbox.querySelector(".cerrar-lightbox");

  imagenes.forEach(imagen => {
    imagen.addEventListener("click", () => {
      lightboxImg.src = imagen.src;
      lightboxImg.alt = imagen.alt;
      lightboxTexto.innerText = imagen.alt;
      lightbox.classList.add("lightbox-activo");
    });
  });

  cerrarLightbox.addEventListener("click", () => {
    lightbox.classList.remove("lightbox-activo");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("lightbox-activo");
    }
  });

  // =========================
  // FAQ - CERRAR UNA PREGUNTA AL ABRIR OTRA
  // =========================

  const preguntas = document.querySelectorAll(".faq details");

  preguntas.forEach(pregunta => {
    pregunta.addEventListener("toggle", () => {
      if (pregunta.open) {
        preguntas.forEach(otraPregunta => {
          if (otraPregunta !== pregunta) {
            otraPregunta.removeAttribute("open");
          }
        });
      }
    });
  });

  // =========================
  // BOTON VOLVER ARRIBA
  // =========================

  const botonArriba = document.createElement("button");
  botonArriba.classList.add("boton-arriba");
  botonArriba.innerText = "↑";

  document.body.appendChild(botonArriba);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      botonArriba.classList.add("boton-arriba-visible");
    } else {
      botonArriba.classList.remove("boton-arriba-visible");
    }
  });

  botonArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});