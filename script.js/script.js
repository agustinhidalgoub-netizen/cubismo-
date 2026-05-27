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

  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  const linksMenu = document.querySelectorAll(".menu-principal a");

  linksMenu.forEach(link => {
    if (link.getAttribute("href") === paginaActual) {
      link.classList.add("link-activo");
    }
  });

  /* =========================
     3. HEADER CON SOMBRA AL SCROLL
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
     4. ANIMACIONES AL ENTRAR EN PANTALLA
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
    elemento.style.transitionDelay = `${Math.min(index * 0.04, 0.35)}s`;
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

  elementosAnimados.forEach(elemento => observador.observe(elemento));

  /* =========================
     5. TEXTO TIPO MÁQUINA EN H1
  ========================= */

  const tituloPrincipal = document.querySelector("h1");

  if (tituloPrincipal) {
    const textoOriginal = tituloPrincipal.textContent;
    tituloPrincipal.textContent = "";
    tituloPrincipal.classList.add("titulo-escribiendo");

    let i = 0;

    const escribir = () => {
      if (i < textoOriginal.length) {
        tituloPrincipal.textContent += textoOriginal.charAt(i);
        i++;
        setTimeout(escribir, 28);
      } else {
        tituloPrincipal.classList.remove("titulo-escribiendo");
      }
    };

    escribir();
  }

  /* =========================
     6. CARRUSEL PRO PARA GALERÍA
  ========================= */

  const galeria = document.querySelector(".galeria");

  if (galeria) {
    const wrapperCarrusel = document.createElement("div");
    wrapperCarrusel.className = "carrusel-wrapper";

    const controles = document.createElement("div");
    controles.className = "controles-carrusel";

    const btnAnterior = document.createElement("button");
    btnAnterior.innerText = "←";
    btnAnterior.setAttribute("aria-label", "Imagen anterior");

    const btnSiguiente = document.createElement("button");
    btnSiguiente.innerText = "→";
    btnSiguiente.setAttribute("aria-label", "Imagen siguiente");

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

    let autoCarrusel = setInterval(() => {
      if (galeria.scrollLeft + galeria.clientWidth >= galeria.scrollWidth - 10) {
        galeria.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      } else {
        galeria.scrollBy({
          left: 320,
          behavior: "smooth"
        });
      }
    }, 3500);

    galeria.addEventListener("mouseenter", () => {
      clearInterval(autoCarrusel);
    });
  }

  /* =========================
     7. LIGHTBOX PRO
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
      <button class="cerrar-lightbox" aria-label="Cerrar imagen">×</button>
      <img src="" alt="">
      <p></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxTexto = lightbox.querySelector("p");
  const cerrarLightbox = lightbox.querySelector(".cerrar-lightbox");

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
     8. FAQ INTELIGENTE
  ========================= */

  const faqs = document.querySelectorAll(".faq details");

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
     9. CONTADOR ANIMADO EN ARTISTAS
  ========================= */

  const paginaArtistas = document.querySelector(".pagina-artistas");

  if (paginaArtistas) {
    const artistas = document.querySelectorAll(".tarjeta-artista");

    const bloqueDato = document.createElement("section");
    bloqueDato.className = "contador-artistas";
    bloqueDato.innerHTML = `
      <span data-numero="${artistas.length}">0</span>
      <p>artistas destacados del Cubismo</p>
    `;

    const main = document.querySelector("main");
    main.appendChild(bloqueDato);

    const numero = bloqueDato.querySelector("span");

    const observadorContador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          let valor = 0;
          const objetivo = Number(numero.dataset.numero);

          const intervalo = setInterval(() => {
            valor++;
            numero.textContent = valor;

            if (valor >= objetivo) {
              clearInterval(intervalo);
            }
          }, 180);

          observadorContador.disconnect();
        }
      });
    });

    observadorContador.observe(bloqueDato);
  }

  /* =========================
     10. FILTRO SIMPLE EN OBRAS
  ========================= */

  const paginaObras = document.querySelector(".pagina-obras");
  const tarjetasObras = document.querySelectorAll(".tarjeta-obra");

  if (paginaObras && tarjetasObras.length > 0) {
    const buscador = document.createElement("div");
    buscador.className = "buscador-obras";
    buscador.innerHTML = `
      <input type="text" placeholder="Buscar obra o artista...">
    `;

    const seccionObras = document.querySelector(".seccion-obras");
    seccionObras.insertBefore(buscador, document.querySelector(".grilla-obras"));

    const input = buscador.querySelector("input");

    input.addEventListener("input", () => {
      const valor = input.value.toLowerCase();

      tarjetasObras.forEach(tarjeta => {
        const texto = tarjeta.textContent.toLowerCase();

        if (texto.includes(valor)) {
          tarjeta.style.display = "block";
        } else {
          tarjeta.style.display = "none";
        }
      });
    });
  }

  /* =========================
     11. PROGRESO DE LECTURA
  ========================= */

  const barraProgreso = document.createElement("div");
  barraProgreso.className = "barra-progreso";
  document.body.appendChild(barraProgreso);

  window.addEventListener("scroll", () => {
    const altoDocumento = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = (window.scrollY / altoDocumento) * 100;
    barraProgreso.style.width = `${progreso}%`;
  });

  /* =========================
     12. BOTÓN VOLVER ARRIBA
  ========================= */

  const botonArriba = document.createElement("button");
  botonArriba.className = "boton-arriba";
  botonArriba.innerText = "↑";
  botonArriba.setAttribute("aria-label", "Volver arriba");

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