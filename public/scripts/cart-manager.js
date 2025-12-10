const CartManager = {
    obtenerCarrito() {
        const carrito = localStorage.getItem('carrito');
        return carrito ? JSON.parse(carrito) : [];
    },

    guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    },

    agregarProducto(producto) {
        let carrito = this.obtenerCarrito();
        const productoExistenteIndex = carrito.findIndex(
            item => item.nombre === producto.nombre
        );

        if (productoExistenteIndex > -1) {
            carrito[productoExistenteIndex].cantidad += producto.cantidad;
        } else {
            carrito.push(producto);
        }

        this.guardarCarrito(carrito);
        return true;
    },

    eliminarProducto(nombreProducto) {
        let carrito = this.obtenerCarrito();
        carrito = carrito.filter(item => item.nombre !== nombreProducto);
        this.guardarCarrito(carrito);
        return true;
    },

    vaciarCarrito() {
        this.guardarCarrito([]);
        return true;
    },

    obtenerCantidadTotal() {
        const carrito = this.obtenerCarrito();
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    },

    calcularTotal() {
        const carrito = this.obtenerCarrito();
        return carrito.reduce((total, producto) => {
            return total + (producto.precio * producto.cantidad);
        }, 0);
    },

    estaVacio() {
        return this.obtenerCarrito().length === 0;
    },

    obtenerProducto(nombreProducto) {
        const carrito = this.obtenerCarrito();
        return carrito.find(item => item.nombre === nombreProducto) || null;
    },

    actualizarCantidad(nombreProducto, nuevaCantidad) {
        let carrito = this.obtenerCarrito();
        const productoIndex = carrito.findIndex(item => item.nombre === nombreProducto);

        if (productoIndex > -1) {
            if (nuevaCantidad > 0) {
                carrito[productoIndex].cantidad = nuevaCantidad;
            } else {
                carrito.splice(productoIndex, 1);
            }
            this.guardarCarrito(carrito);
            return true;
        }

        return false;
    }
};
