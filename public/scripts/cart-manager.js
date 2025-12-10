/**
 * ========================================================================
 * CART-MANAGER.JS - Gestor centralizado del carrito de compras
 * ========================================================================
 * Reingeniería: Separar toda la lógica del carrito en un módulo reutilizable
 */

const CartManager = {
    /**
     * Obtiene el carrito desde localStorage
     * @returns {Array} Array de productos en el carrito
     */
    obtenerCarrito() {
        const carrito = localStorage.getItem('carrito');
        return carrito ? JSON.parse(carrito) : [];
    },

    /**
     * Guarda el carrito en localStorage
     * @param {Array} carrito - Array de productos
     */
    guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    },

    /**
     * Agrega un producto al carrito
     * @param {Object} producto - Producto a agregar {nombre, precio, imagenSrc, cantidad}
     * @returns {boolean} true si se agregó exitosamente
     */
    agregarProducto(producto) {
        let carrito = this.obtenerCarrito();

        // Buscar si el producto ya existe
        const productoExistenteIndex = carrito.findIndex(
            item => item.nombre === producto.nombre
        );

        if (productoExistenteIndex > -1) {
            // Si existe, aumentar cantidad
            carrito[productoExistenteIndex].cantidad += producto.cantidad;
        } else {
            // Si no existe, agregarlo
            carrito.push(producto);
        }

        this.guardarCarrito(carrito);
        return true;
    },

    /**
     * Elimina un producto del carrito
     * @param {string} nombreProducto - Nombre del producto a eliminar
     * @returns {boolean} true si se eliminó exitosamente
     */
    eliminarProducto(nombreProducto) {
        let carrito = this.obtenerCarrito();
        carrito = carrito.filter(item => item.nombre !== nombreProducto);
        this.guardarCarrito(carrito);
        return true;
    },

    /**
     * Vacía completamente el carrito
     * @returns {boolean} true si se vació exitosamente
     */
    vaciarCarrito() {
        this.guardarCarrito([]);
        return true;
    },

    /**
     * Obtiene la cantidad total de productos en el carrito
     * @returns {number} Cantidad total de productos
     */
    obtenerCantidadTotal() {
        const carrito = this.obtenerCarrito();
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    },

    /**
     * Calcula el precio total del carrito
     * @returns {number} Precio total
     */
    calcularTotal() {
        const carrito = this.obtenerCarrito();
        return carrito.reduce((total, producto) => {
            return total + (producto.precio * producto.cantidad);
        }, 0);
    },

    /**
     * Verifica si el carrito está vacío
     * @returns {boolean} true si está vacío
     */
    estaVacio() {
        return this.obtenerCarrito().length === 0;
    },

    /**
     * Obtiene un producto específico del carrito
     * @param {string} nombreProducto - Nombre del producto
     * @returns {Object|null} Producto encontrado o null
     */
    obtenerProducto(nombreProducto) {
        const carrito = this.obtenerCarrito();
        return carrito.find(item => item.nombre === nombreProducto) || null;
    },

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} nombreProducto - Nombre del producto
     * @param {number} nuevaCantidad - Nueva cantidad
     * @returns {boolean} true si se actualizó exitosamente
     */
    actualizarCantidad(nombreProducto, nuevaCantidad) {
        let carrito = this.obtenerCarrito();
        const productoIndex = carrito.findIndex(item => item.nombre === nombreProducto);

        if (productoIndex > -1) {
            if (nuevaCantidad > 0) {
                carrito[productoIndex].cantidad = nuevaCantidad;
            } else {
                // Si la cantidad es 0, eliminar el producto
                carrito.splice(productoIndex, 1);
            }
            this.guardarCarrito(carrito);
            return true;
        }

        return false;
    }
};
