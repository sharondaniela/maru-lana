// public/scripts/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Inicio de sesión exitoso. ¡Bienvenido!');
                    // *** MODIFICACIÓN AQUÍ: Establecer loggedInUser en localStorage ***
                    if (data.user && data.user.nombre) {
                        localStorage.setItem('loggedInUser', data.user.nombre); // Guarda el nombre del usuario
                    } else {
                        // Si por alguna razón no viene el nombre, guarda un booleano
                        localStorage.setItem('loggedInUser', 'true');
                    }
                    // *** Fin de modificación ***

                    window.location.href = data.redirect; // Redirige a /index.html (o la ruta que venga del servidor)
                } else {
                    // Si el servidor envía un error específico, úsalo; de lo contrario, un mensaje genérico.
                    alert('Error al iniciar sesión: ' + (data.error || 'Credenciales incorrectas.'));
                }
            } catch (error) {
                console.error('Error al enviar el formulario de login:', error);
                alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    }
});