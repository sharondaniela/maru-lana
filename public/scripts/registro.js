document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.registro-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío tradicional del formulario

            const nombre = registrationForm.querySelector('input[name="nombre"]').value;
            const email = registrationForm.querySelector('input[name="email"]').value;
            const password = registrationForm.querySelector('input[name="password"]').value;
            const confirmPassword = registrationForm.querySelector('input[name="confirm_password"]').value; // Asumiendo que tienes este campo en el HTML

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
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
                    // Registro exitoso
                    alert('Registro exitoso. Serás redirigido para iniciar sesión.');
                    window.location.href = data.redirect; // Redirige a /login.html
                } else {
                    // Error en el registro (ej. usuario ya existe)
                    alert('Error en el registro: ' + data.error);
                }
            } catch (error) {
                console.error('Error al enviar el formulario de registro:', error);
                alert('Ocurrió un error al intentar registrarte. Por favor, inténtalo de nuevo más tarde.');
            }
        });
    }
});