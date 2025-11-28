class BackToTopButton extends HTMLElement {
  constructor() {
    super();

    // Crear Shadow DOM
    this.attachShadow({ mode: 'open' });

    // Estructura del botón
this.shadowRoot.innerHTML = `
  <style>
    :host {
      display: block;
    }

    #back-to-top-btn {
      display: none;
      position: fixed;
      bottom: 1vw;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9990;

      /* Fondo y bordes */
      background-color: rgba(181, 46, 177, 0.5);
      color: white;
      border: none;
      border-radius: 50%; /* Círculo */
      cursor: pointer;
      box-shadow: 0px 0.4em 0.6em rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, transform 0.3s ease;

      /* Dimensiones CUADRADAS para garantizar círculo */
      width: 1.1rem;
      height: 1.1rem;
      min-width: 44px;
      min-height: 44px;

      /* Centrar ícono vertical y horizontalmente */
      padding: 0;
      margin: 0;
      font-size: 1.2rem; /* Ajusta el tamaño del ícono */
      font-family: sans-serif, 'Arial', 'Segoe UI';
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      /* Evitar selección accidental */
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    #back-to-top-btn:hover {
      background-color: rgba(179, 76, 224, 0.2);
      transform: translateX(-50%) scale(1.2);
    }

    #back-to-top-btn:focus-visible {
  outline: 3px solid var(--color-chatsbotses, #0ff); /* Color de contraste del tema */
  outline-offset: 2px;
}
#back-to-top-btn:focus:not(:focus-visible) {
  outline: none; /* Mejorar UX (para clics de ratón) */
}

    /* Asegurar que el ícono no se deforme */
    #back-to-top-btn::before {
      display: inline-block;
    }
  </style>
  <button id="back-to-top-btn" aria-label="Volver arriba">𖤂</button>
`;

    // Referencias
    this.button = this.shadowRoot.getElementById('back-to-top-btn');
    this.scrollThreshold = 500;

    // Bind de métodos
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  // Cuando el componente se conecta al DOM
  connectedCallback() {
    // Añadir evento de scroll
    window.addEventListener('scroll', this.handleScroll);
    // Añadir evento de clic al botón
    this.button.addEventListener('click', this.scrollToTop);

    // Verificar estado inicial de scroll
    this.handleScroll();
  }

  // Cuando el componente se desconecta del DOM
  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
    this.button.removeEventListener('click', this.scrollToTop);
  }

  // Maneja la visibilidad del botón según el scroll
  handleScroll() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    this.button.style.display = scrollTop > this.scrollThreshold ? 'block' : 'none';
  }

  // Desplazamiento suave hacia arriba
  scrollToTop() {
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    });
    
  }
}

// Registrar el componente personalizado
customElements.define('boton-volver-arriba', BackToTopButton);
