/*********************************
 * Script del Menu de navegación *
 *********************************/

// Cierra el menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav');
    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    if (!menuHamburguesa.contains(event.target) && !nav.contains(event.target)) {
        nav.classList.remove('active');
    }
});

