// public/scripts/carrito.js

document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.querySelector('.carrito-container');
    const productosCarritoDiv = document.getElementById('productos-carrito'); // Contenedor donde se listarán los productos
    const resumenCarritoDiv = document.querySelector('.resumen-carrito');
    const btnComprar = document.querySelector('.btn-comprar');

    // Función para renderizar el carrito
    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosCarritoDiv.innerHTML = ''; // Limpia el contenedor antes de renderizar

        if (carrito.length === 0) {
            productosCarritoDiv.innerHTML = '<p style="text-align: center; color: white;">Tu carrito está vacío.</p>';
            resumenCarritoDiv.innerHTML = '<h3>Total: $0.00</h3>';
            btnComprar.style.display = 'none'; // Ocultar botón de comprar si no hay productos
            return;
        }

        let totalCarrito = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.dataset.nombre = producto.nombre; // Para identificar el producto al actualizar/eliminar

            const subtotalProducto = producto.precio * producto.cantidad;
            totalCarrito += subtotalProducto;

            productoDiv.innerHTML = `
                <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <div class="cantidad">
                        <button class="btn-menos" data-nombre="${producto.nombre}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="btn-mas" data-nombre="${producto.nombre}">+</button>
                    </div>
                </div>
                <button class="btn-eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            `;
            productosCarritoDiv.appendChild(productoDiv);
        });

        resumenCarritoDiv.innerHTML = `<h3>Total: $${totalCarrito.toFixed(2)}</h3>`;
        btnComprar.style.display = 'block'; // Mostrar botón de comprar

        // Añadir event listeners para los botones de cantidad y eliminar
        document.querySelectorAll('.btn-menos').forEach(button => {
            button.addEventListener('click', (event) => {
                const nombreProducto = event.target.dataset.nombre;
                actualizarCantidadProducto(nombreProducto, -1);
            });
        });

        document.querySelectorAll('.btn-mas').forEach(button => {
            button.addEventListener('click', (event) => {
                const nombreProducto = event.target.dataset.nombre;
                actualizarCantidadProducto(nombreProducto, 1);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (event) => {
                const nombreProducto = event.target.dataset.nombre;
                eliminarProductoDelCarrito(nombreProducto);
            });
        });
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function actualizarCantidadProducto(nombre, cambio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoIndex = carrito.findIndex(item => item.nombre === nombre);

        if (productoIndex > -1) {
            carrito[productoIndex].cantidad += cambio;
            if (carrito[productoIndex].cantidad <= 0) {
                // Si la cantidad llega a 0 o menos, eliminar el producto
                carrito.splice(productoIndex, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito(); // Vuelve a renderizar el carrito
            actualizarNumeroCarritoEnNavbar(); // Actualiza el número en el navbar
        }
    }

    // Función para eliminar un producto del carrito
    function eliminarProductoDelCarrito(nombre) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.nombre !== nombre);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito(); // Vuelve a renderizar el carrito
        actualizarNumeroCarritoEnNavbar(); // Actualiza el número en el navbar
    }

    // Función para actualizar el número de elementos en el ícono del carrito (copia de productos.js, para asegurar que funciona aquí también)
    function actualizarNumeroCarritoEnNavbar() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        const carritoIcon = document.querySelector('.menu li a[href="carrito.html"]'); 
        if (carritoIcon) {
            let itemCountSpan = carritoIcon.querySelector('.item-count');
            if (!itemCountSpan) {
                itemCountSpan = document.createElement('span');
                itemCountSpan.classList.add('item-count');
                itemCountSpan.style.backgroundColor = 'red';
                itemCountSpan.style.color = 'white';
                itemCountSpan.style.borderRadius = '50%';
                itemCountSpan.style.padding = '2px 6px';
                itemCountSpan.style.marginLeft = '5px';
                carritoIcon.appendChild(itemCountSpan);
            }
            itemCountSpan.textContent = totalItems > 0 ? totalItems : '';
            itemCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    // Event listener para el botón de "Comprar" (lógica futura)
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            alert('Funcionalidad de compra aún no implementada. ¡Gracias por tu interés!');
            // Aquí iría la lógica para procesar la compra (ej. enviar a backend, limpiar carrito)
        });
    }

    // Renderiza el carrito cuando la página carga
    renderizarCarrito();
    actualizarNumeroCarritoEnNavbar(); // También al cargar el carrito.html
});