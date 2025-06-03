// public/scripts/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // <-- ¡Esta línea es clave! Previene el envío por defecto del formulario.

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            // ... el resto de tu código fetch y redirección ...
            try {
                const response = await fetch('/login', { // <-- Asegúrate que sea '/login' aquí
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Inicio de sesión exitoso. ¡Bienvenido!');
                    if (data.user && data.user.nombre) {
                        localStorage.setItem('loggedInUser', data.user.nombre);
                    }
                    window.location.href = data.redirect; // Redirige a /index.html
                } else {
                    alert('Error al iniciar sesión: ' + data.error);
                }
            } catch (error) {
                console.error('Error al enviar el formulario de login:', error);
                alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    }
});