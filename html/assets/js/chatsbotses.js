document.addEventListener('DOMContentLoaded', () => {
  // --- CONSTANTES Y SELECCIONES ---
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const submenuItems = document.querySelectorAll('.has-submenu');
  const MOBILE_BREAKPOINT = 768;
  
  // Selectores para focus trap
  const focusableElementsSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // --- UTILIDADES ---
  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  // --- GESTIÓN DE ESTADO (ABRIR/CERRAR) ---
  
  const closeMobileMenu = () => {
    if (!menu.classList.contains('active')) return;
    
    menu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Accesibilidad: Ocultar contenido a lectores de pantalla cuando está cerrado en móvil
    menu.setAttribute('aria-hidden', 'true'); 
    
    closeAllSubmenus();
    hamburger.focus(); // Devolver foco al botón al cerrar
  };

  const openMobileMenu = () => {
    menu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    
    // Esperar transición CSS y poner foco en el primer elemento
    setTimeout(() => {
      const firstLink = menu.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }, 100);
  };

  const toggleMobileMenu = () => {
    menu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
  };

  // --- GESTIÓN DE SUBMENÚS ---
  
  const closeSubmenu = (item) => {
    const toggle = item.querySelector('.submenu-toggle');
    const submenu = item.querySelector('.submenu');
    
    item.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (submenu) submenu.style.maxHeight = '0px'; // Colapsar
  };

  const openSubmenu = (item) => {
    // Primero cerramos otros para comportamiento de acordeón
    closeAllSubmenus();

    const toggle = item.querySelector('.submenu-toggle');
    const submenu = item.querySelector('.submenu');
    
    item.classList.add('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    
    // Cálculo dinámico de altura
    if (submenu) submenu.style.maxHeight = `${submenu.scrollHeight}px`;
  };

  const toggleSubmenu = (item, e) => {
    // En móvil prevenimos navegación, en escritorio dejamos que el hover CSS haga el trabajo
    // o permitimos click si es táctil híbrido.
    if (isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        item.classList.contains('open') ? closeSubmenu(item) : openSubmenu(item);
    }
  };

  const closeAllSubmenus = () => {
    submenuItems.forEach(item => {
      if (item.classList.contains('open')) closeSubmenu(item);
    });
  };

  // --- LISTENERS ---

  // 1. Hamburguesa
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // 2. Submenús (Click en flecha O en texto padre en móvil)
  submenuItems.forEach(item => {
    const toggle = item.querySelector('.submenu-toggle');
    const link = item.querySelector('.menu-item-wrapper > a');

    // Click en la flecha (funciona siempre)
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar burbujeo
        item.classList.contains('open') ? closeSubmenu(item) : openSubmenu(item);
      });
    }

    // Click en el texto (Solo actúa como toggle en móvil)
    if (link) {
      link.addEventListener('click', (e) => toggleSubmenu(item, e));
    }
  });

  // 3. Clic fuera (Close outside)
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      if (menu.classList.contains('active')) closeMobileMenu();
      closeAllSubmenus(); // También cierra submenús si pinchas fuera en escritorio
    }
  });

  // 4. Tecla ESCAPE (Mejora de Accesibilidad)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        // Si no está el menú móvil, quizás hay un submenú abierto en escritorio
        closeAllSubmenus();
      }
    }
  });

  // 5. Trampa de foco (Focus Trap) para móvil
  menu.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('active') || !isMobile()) return;
    
    const focusableElements = Array.from(menu.querySelectorAll(focusableElementsSelector))
        .filter(el => el.offsetParent !== null); // Solo visibles

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else { // Tab normal
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // 6. Resize con DEBOUNCE (Mejora de Rendimiento)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Lógica que se ejecuta al terminar de redimensionar
      if (!isMobile()) {
        // Escritorio: limpiar clases de móvil y asegurar visibilidad ARIA
        menu.classList.remove('active');
        menu.removeAttribute('aria-hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        // Móvil: Si no está activo, ocultar para lectores
        if (!menu.classList.contains('active')) {
            menu.setAttribute('aria-hidden', 'true');
        }
      }
      
      // Recalcular alturas de submenús abiertos (por si cambia el ancho y el texto ocupa más líneas)
      document.querySelectorAll('.has-submenu.open .submenu').forEach(submenu => {
        submenu.style.maxHeight = `${submenu.scrollHeight}px`;
      });
    }, 100); // 100ms de espera
  });

  // --- INICIALIZACIÓN ---
  // Asegurar estado correcto al cargar
  if (isMobile()) menu.setAttribute('aria-hidden', 'true');
});
