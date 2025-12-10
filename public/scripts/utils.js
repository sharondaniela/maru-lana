function isUserLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

function getLoggedInUser() {
    const userData = localStorage.getItem('loggedInUser');
    return userData ? JSON.parse(userData) : null;
}

function formatearMonedaColombia(valor) {
    return valor.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function parsearPrecio(precioTexto) {
    return parseFloat(precioTexto.replace('$', '').replaceAll('.', '').trim());
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarNoVacio(valor) {
    return valor && valor.trim().length > 0;
}

function mostrarError(mensaje, elemento) {
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        elemento.style.color = '#e74c3c';
        elemento.style.marginTop = '10px';
    }
}

function ocultarError(elemento) {
    if (elemento) {
        elemento.style.display = 'none';
    }
}
