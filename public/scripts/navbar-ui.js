document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del menú de autenticación
    const navLogin = document.getElementById('nav-login');
    const navRegistro = document.getElementById('nav-registro');
    const navPerfil = document.getElementById('nav-perfil');
    const navLogout = document.getElementById('nav-logout');
    const logoutLink = document.getElementById('logout-link'); // El 'a' dentro de navLogout

    function updateNavbarAuthLinks() {
        const user = localStorage.getItem('loggedInUser'); // Obtener el nombre del usuario

        if (user) {
            // Usuario logueado: Ocultar Login/Registro, Mostrar Perfil/Cerrar Sesión
            if (navLogin) navLogin.style.display = 'none';
            if (navRegistro) navRegistro.style.display = 'none';
            
            if (navPerfil) navPerfil.style.display = 'block'; // O 'flex', 'inline-block' según tu CSS
            if (navLogout) navLogout.style.display = 'block'; // O 'flex', 'inline-block'

        } else {
            // Usuario no logueado: Mostrar Login/Registro, Ocultar Perfil/Cerrar Sesión
            if (navLogin) navLogin.style.display = 'block'; // O 'flex', 'inline-block'
            if (navRegistro) navRegistro.style.display = 'block'; // O 'flex', 'inline-block'

            if (navPerfil) navPerfil.style.display = 'none';
            if (navLogout) navLogout.style.display = 'none';
        }
    }

    // Event listener para "Cerrar Sesión"
    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const response = await fetch('/logout', {
                    method: 'POST', // Esto es crucial y debe coincidir con tu server.js
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('userEmail'); // ¡Añadido! Si estás guardando el email
                    alert('Sesión cerrada.');
                    updateNavbarAuthLinks(); // Actualiza el navbar inmediatamente
                    window.location.href = 'index.html'; // Redirige al inicio
                } else {
                    alert('Error al cerrar sesión: ' + (data.error || 'Inténtalo de nuevo.'));
                }
            } catch (error) {
                console.error('Error al intentar cerrar sesión:', error);
                alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    }

    // Inicializa el navbar al cargar la página
    updateNavbarAuthLinks(); 
    
    // Lógica existente para el carrito (mantener como está)
    actualizarNumeroCarritoEnNavbar(); 
});

function actualizarNumeroCarritoEnNavbar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const carritoIcon = document.querySelector('.menu li a[href="carrito.html"]'); 
    
    if (carritoIcon) {
        let itemCountSpan = carritoIcon.querySelector('.item-count');
        if (!itemCountSpan) {
            itemCountSpan = document.createElement('span');
            itemCountSpan.classList.add('item-count');
            itemCountSpan.style.backgroundColor = 'red';
            itemCountSpan.style.color = 'white';
            itemCountSpan.style.borderRadius = '50%';
            itemCountSpan.style.padding = '2px 6px';
            itemCountSpan.style.marginLeft = '5px';
            itemCountSpan.style.verticalAlign = 'super';
            carritoIcon.appendChild(itemCountSpan);
        }
        itemCountSpan.textContent = totalItems > 0 ? totalItems : '';
        itemCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}
