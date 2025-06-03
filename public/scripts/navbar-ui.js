// public/scripts/navbar-ui.js

document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('loggedInUser'); // Obtener el nombre del usuario
    const menu = document.querySelector('.menu'); // Asumiendo que tu menú tiene la clase 'menu'

    if (menu) {
        // Eliminar los elementos de Login/Registro si existen
        const loginMenuItem = menu.querySelector('li a[href="login.html"]');
        const registerMenuItem = menu.querySelector('li a[href="registro.html"]');

        if (loginMenuItem) {
            loginMenuItem.parentElement.remove(); // Eliminar el <li> padre
        }
        if (registerMenuItem) {
            registerMenuItem.parentElement.remove(); // Eliminar el <li> padre
        }

        // Si hay un usuario logueado, mostrar su nombre y un botón de "Cerrar Sesión"
        if (user) {
            // Crear elemento para mostrar el nombre del usuario
            const userLi = document.createElement('li');
            userLi.innerHTML = `<a href="#">Hola, ${user}</a>`; // Puedes hacer que no sea un enlace si quieres

            // Crear botón de Cerrar Sesión
            const logoutLi = document.createElement('li');
            const logoutButton = document.createElement('a');
            logoutButton.href = '#'; // Esto puede ser un enlace temporal o un #
            logoutButton.textContent = 'Cerrar Sesión';
            logoutButton.style.cursor = 'pointer'; // Para que parezca clickeable
            logoutButton.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem('loggedInUser'); // Eliminar el usuario de localStorage
                alert('Sesión cerrada.');
                window.location.href = '/index.html'; // Redirigir al inicio o a la página de login
            });
            logoutLi.appendChild(logoutButton);

            // Añadir los nuevos elementos al menú
            menu.appendChild(userLi);
            menu.appendChild(logoutLi);
        } else {
            // Si no hay usuario logueado, asegurarse de que los enlaces de Login/Registro están presentes
            // (Esto es redundante si ya están en el HTML, pero asegura si los remueves dinámicamente)
            const defaultLoginLi = document.createElement('li');
            defaultLoginLi.innerHTML = '<a href="login.html">Login</a>';
            const defaultRegisterLi = document.createElement('li');
            defaultRegisterLi.innerHTML = '<a href="registro.html">Registro</a>';

            // Solo añadir si no existen ya
            if (!menu.querySelector('li a[href="login.html"]')) {
                 menu.appendChild(defaultLoginLi);
            }
            if (!menu.querySelector('li a[href="registro.html"]')) {
                menu.appendChild(defaultRegisterLi);
            }
        }
    }
});