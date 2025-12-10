/**
 * ========================================================================
 * UTILS.JS - Funciones utilitarias reutilizables
 * ========================================================================
 * Reingeniería: Extraer funciones comunes para evitar duplicación
 */

/**
 * Verifica si hay un usuario logueado
 * @returns {boolean} true si hay usuario logueado
 */
function isUserLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

/**
 * Obtiene los datos del usuario logueado
 * @returns {Object|null} Datos del usuario o null si no está logueado
 */
function getLoggedInUser() {
    const userData = localStorage.getItem('loggedInUser');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Formatea un número a moneda colombiana
 * @param {number} valor - El valor numérico a formatear
 * @returns {string} Valor formateado como $120.000
 */
function formatearMonedaColombia(valor) {
    return valor.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Parsea un texto de precio a número
 * @param {string} precioTexto - Texto como "$120.000" o "120.000"
 * @returns {number} Valor numérico
 */
function parsearPrecio(precioTexto) {
    return parseFloat(precioTexto.replace('$', '').replaceAll('.', '').trim());
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si el email es válido
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida que un campo no esté vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean} true si no está vacío
 */
function validarNoVacio(valor) {
    return valor && valor.trim().length > 0;
}

/**
 * Muestra un mensaje de error en el DOM
 * @param {string} mensaje - Mensaje a mostrar
 * @param {HTMLElement} elemento - Elemento donde mostrar el error
 */
function mostrarError(mensaje, elemento) {
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        elemento.style.color = '#e74c3c';
        elemento.style.marginTop = '10px';
    }
}

/**
 * Oculta un mensaje de error
 * @param {HTMLElement} elemento - Elemento a ocultar
 */
function ocultarError(elemento) {
    if (elemento) {
        elemento.style.display = 'none';
    }
}
