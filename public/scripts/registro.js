document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.registro-form');
    const errorMensaje = document.getElementById('error-mensaje');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            ocultarError(errorMensaje);

            const nombre = registrationForm.querySelector('input[name="nombre"]').value.trim();
            const email = registrationForm.querySelector('input[name="email"]').value.trim();
            const password = registrationForm.querySelector('input[name="password"]').value;
            const confirmPassword = registrationForm.querySelector('input[name="confirm_password"]').value;

            if (!validarNoVacio(nombre)) {
                mostrarError('El nombre es requerido', errorMensaje);
                return;
            }

            if (nombre.length < 3) {
                mostrarError('El nombre debe tener al menos 3 caracteres', errorMensaje);
                return;
            }

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

            if (password !== confirmPassword) {
                mostrarError('Las contraseñas no coinciden', errorMensaje);
                return;
            }

            try {
                const response = await fetch('/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registro exitoso. Serás redirigido para iniciar sesión.');
                    window.location.href = data.redirect;
                } else {
                    mostrarError(data.error || 'Error en el registro', errorMensaje);
                }
            } catch (error) {
                console.error('Error al enviar el formulario de registro:', error);
                mostrarError('Error al conectar con el servidor', errorMensaje);
            }
        });
    }
});
