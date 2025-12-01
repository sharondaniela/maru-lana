document.addEventListener('DOMContentLoaded', () => {

    const navLogin = document.getElementById('nav-login');
    const navRegistro = document.getElementById('nav-registro');
    const navPerfil = document.getElementById('nav-perfil');
    const navLogout = document.getElementById('nav-logout');
    const logoutLink = document.getElementById('logout-link');

    function updateNavbarAuthLinks() {
        const user = localStorage.getItem('loggedInUser'); 

        if (user) {
       
            if (navLogin) navLogin.style.display = 'none';
            if (navRegistro) navRegistro.style.display = 'none';
            
            if (navPerfil) navPerfil.style.display = 'block'; 
            if (navLogout) navLogout.style.display = 'block'; 

        } else {
           
            if (navLogin) navLogin.style.display = 'block'; 
            if (navRegistro) navRegistro.style.display = 'block'; 

            if (navPerfil) navPerfil.style.display = 'none';
            if (navLogout) navLogout.style.display = 'none';
        }
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const response = await fetch('/logout', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('userEmail'); 
                    alert('Sesión cerrada.');
                    updateNavbarAuthLinks(); 
                    window.location.href = 'index.html';
                } else {
                    alert('Error al cerrar sesión: ' + (data.error || 'Inténtalo de nuevo.'));
                }
            } catch (error) {
                console.error('Error al intentar cerrar sesión:', error);
                alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    }


    updateNavbarAuthLinks(); 
    

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

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('main-menu');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.classList.toggle('active'); // animación del icono
    menu.classList.toggle('show');                        // muestra/oculta menú
    toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Cerrar al pulsar fuera del menú (opcional, elegante)
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('show')) return;
    const insideMenu = menu.contains(e.target) || toggleBtn.contains(e.target);
    if (!insideMenu) {
      menu.classList.remove('show');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      menu.classList.remove('show');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
});
