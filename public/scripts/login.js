document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const errorMensaje = document.getElementById('error-mensaje');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            ocultarError(errorMensaje);

            const email = loginForm.querySelector('input[name="email"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value;

            if (!validarEmail(email)) {
                mostrarError('El email no es válido', errorMensaje);
                return;
            }

            if (!validarNoVacio(password)) {
                mostrarError('La contraseña es requerida', errorMensaje);
                return;
            }

            if (password.length < 6) {
                mostrarError('La contraseña debe tener al menos 6 caracteres', errorMensaje);
                return;
            }

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

                    if (data.user && data.user.nombre) {
                        localStorage.setItem('loggedInUser', data.user.nombre);
                    } else {
                        localStorage.setItem('loggedInUser', 'true');
                    }

                    window.location.href = data.redirect;
                } else {
                    mostrarError(data.error || 'Credenciales incorrectas', errorMensaje);
                }
            } catch (error) {
                console.error('Error al enviar el formulario de login:', error);
                mostrarError('Error al conectar con el servidor', errorMensaje);
            }
        });
    }
});
