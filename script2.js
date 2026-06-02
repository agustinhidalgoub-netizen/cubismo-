/* =========================
   CUBISMO - JAVASCRIPT PRO
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. MENÚ MOBILE PRO
  ========================= */

  const nav = document.querySelector(".nav-header");
  const menu = document.querySelector(".menu-principal");

  if (nav && menu) {

    const botonMenu = document.createElement("button");

    botonMenu.className = "boton-menu";

    botonMenu.setAttribute("aria-label", "Abrir menú");

    botonMenu.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    nav.appendChild(botonMenu);

    botonMenu.addEventListener("click", () => {

      menu.classList.toggle("menu-activo");

      botonMenu.classList.toggle("boton-menu-activo");

      document.body.classList.toggle("menu-abierto");

    });

    menu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menu.classList.remove("menu-activo");

        botonMenu.classList.remove("boton-menu-activo");

        document.body.classList.remove("menu-abierto");

      });

    });

  }

  /* =========================
     2. LINK ACTIVO
  ========================= */

  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  const linksMenu =
    document.querySelectorAll(".menu-principal a");

  linksMenu.forEach(link => {

    if (link.getAttribute("href") === paginaActual) {

      link.classList.add("link-activo");

    }

  });

  /* =========================
     3. HEADER CON SOMBRA
  ========================= */

  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

      header.classList.add("header-scroll");

    } else {

      header.classList.remove("header-scroll");

    }

  });

  /* =========================
     4. ANIMACIONES
  ========================= */

  const elementosAnimados = document.querySelectorAll(`
    main section,
    .tarjeta-artista,
    .tarjeta-obra,
    .detalle-texto,
    .detalle-imagen,
    .historia-bloque,
    .obras-destacadas,
    footer
  `);

  elementosAnimados.forEach((elemento, index) => {

    elemento.classList.add("animado");

    elemento.style.transitionDelay =
      `${Math.min(index * 0.04, 0.35)}s`;

  });

  const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

      if (entrada.isIntersecting) {

        entrada.target.classList.add("visible");

      }

    });

  }, {
    threshold: 0.15
  });

  elementosAnimados.forEach(elemento => {

    observador.observe(elemento);

  });

  /* =========================
     5. TEXTO MÁQUINA
  ========================= */

  const tituloPrincipal = document.querySelector("h1");

  if (tituloPrincipal) {

    const textoOriginal = tituloPrincipal.textContent;

    tituloPrincipal.textContent = "";

    tituloPrincipal.classList.add("titulo-escribiendo");

    let i = 0;

    const escribir = () => {

      if (i < textoOriginal.length) {

        tituloPrincipal.textContent +=
          textoOriginal.charAt(i);

        i++;

        setTimeout(escribir, 28);

      } else {

        tituloPrincipal.classList.remove("titulo-escribiendo");

      }

    };

    escribir();

  }

  /* =========================
     6. CARRUSEL
  ========================= */

  const galeria = document.querySelector(".galeria");

  if (galeria) {

    const controles = document.createElement("div");

    controles.className = "controles-carrusel";

    const btnAnterior = document.createElement("button");

    btnAnterior.innerText = "←";

    const btnSiguiente = document.createElement("button");

    btnSiguiente.innerText = "→";

    controles.appendChild(btnAnterior);

    controles.appendChild(btnSiguiente);

    galeria.parentNode.insertBefore(controles, galeria);

    btnAnterior.addEventListener("click", () => {

      galeria.scrollBy({
        left: -340,
        behavior: "smooth"
      });

    });

    btnSiguiente.addEventListener("click", () => {

      galeria.scrollBy({
        left: 340,
        behavior: "smooth"
      });

    });

  }

  /* =========================
     7. LIGHTBOX
  ========================= */

  const imagenes = document.querySelectorAll(`
    .galeria img,
    .tarjeta-artista img,
    .tarjeta-obra img,
    .grilla-obras-destacadas img,
    .detalle-imagen img,
    .historia-img,
    .imagen-principal
  `);

  const lightbox = document.createElement("div");

  lightbox.className = "lightbox";

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

  const cerrarLightbox =
    lightbox.querySelector(".cerrar-lightbox");

  imagenes.forEach(img => {

    img.addEventListener("click", () => {

      lightboxImg.src = img.src;

      lightboxImg.alt = img.alt;

      lightboxTexto.textContent = img.alt;

      lightbox.classList.add("lightbox-activo");

      document.body.classList.add("sin-scroll");

    });

  });

  const cerrarModal = () => {

    lightbox.classList.remove("lightbox-activo");

    document.body.classList.remove("sin-scroll");

  };

  cerrarLightbox.addEventListener("click", cerrarModal);

  lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

      cerrarModal();

    }

  });

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      cerrarModal();

    }

  });

  /* =========================
     8. FAQ
  ========================= */

  const faqs =
    document.querySelectorAll(".faq details");

  faqs.forEach(faq => {

    faq.addEventListener("toggle", () => {

      if (faq.open) {

        faqs.forEach(otra => {

          if (otra !== faq) {

            otra.removeAttribute("open");

          }

        });

      }

    });

  });

  /* =========================
     9. BOTÓN ARRIBA
  ========================= */

  const botonArriba = document.createElement("button");

  botonArriba.className = "boton-arriba";

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