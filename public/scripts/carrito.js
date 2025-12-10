document.addEventListener('DOMContentLoaded', () => {
    const productosCarritoDiv = document.getElementById('productos-carrito');
    const resumenCarritoDiv = document.querySelector('.total-carrito');
    const btnProcederCompra = document.getElementById('btn-proceder-compra');
    const btnSeguirComprando = document.getElementById('btn-seguir-comprando');

    function renderizarCarrito() {
        const carrito = CartManager.obtenerCarrito();
        productosCarritoDiv.innerHTML = '';

        if (CartManager.estaVacio()) {
            productosCarritoDiv.innerHTML = '<p style="text-align: center; color: white;">Tu carrito está vacío.</p>';
            resumenCarritoDiv.innerHTML = '<h3>Total: $0</h3>';
            return;
        }

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.dataset.nombre = producto.nombre;

            const precioNumerico = parseFloat(producto.precio);
            const cantidadNumerica = parseInt(producto.cantidad, 10);

            productoDiv.innerHTML = `
                <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${formatearMonedaColombia(precioNumerico)}</p>
                    <div class="cantidad">
                        <button class="btn-menos" data-nombre="${producto.nombre}">-</button>
                        <span>${cantidadNumerica}</span>
                        <button class="btn-mas" data-nombre="${producto.nombre}">+</button>
                    </div>
                </div>
                <button class="btn-eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            `;
            productosCarritoDiv.appendChild(productoDiv);
        });

        const totalCarrito = CartManager.calcularTotal();
        const totalCarritoPrecioSpan = document.getElementById('total-carrito-precio');
        if (totalCarritoPrecioSpan) {
            totalCarritoPrecioSpan.textContent = '$' + formatearMonedaColombia(totalCarrito);
        } else {
            resumenCarritoDiv.innerHTML = `<h3>Total: $${formatearMonedaColombia(totalCarrito)}</h3>`;
        }

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

    function actualizarCantidadProducto(nombre, cambio) {
        const producto = CartManager.obtenerProducto(nombre);
        if (producto) {
            const nuevaCantidad = producto.cantidad + cambio;
            CartManager.actualizarCantidad(nombre, nuevaCantidad);
            renderizarCarrito();
            actualizarNumeroCarritoEnNavbar();
        }
    }

    function eliminarProductoDelCarrito(nombre) {
        CartManager.eliminarProducto(nombre);
        renderizarCarrito();
        actualizarNumeroCarritoEnNavbar();
    }

    function actualizarNumeroCarritoEnNavbar() {
        const totalItems = CartManager.obtenerCantidadTotal();
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
                itemCountSpan.style.verticalAlign = 'super';
                carritoIcon.appendChild(itemCountSpan);
            }
            itemCountSpan.textContent = totalItems > 0 ? totalItems : '';
            itemCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    if (btnProcederCompra) {
        btnProcederCompra.addEventListener('click', () => {
            if (!CartManager.estaVacio()) {
                window.location.href = 'confirmacion.html';
            } else {
                alert('Tu carrito está vacío. Agrega productos antes de proceder a la compra.');
            }
        });
    }

    if (btnSeguirComprando) {
        btnSeguirComprando.addEventListener('click', () => {
            window.location.href = 'productos.html';
        });
    }

    const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener('click', () => {
            if (CartManager.estaVacio()) {
                alert('Tu carrito ya está vacío.');
                return;
            }

            const confirmacion = confirm('¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.');

            if (confirmacion) {
                CartManager.vaciarCarrito();
                renderizarCarrito();
                actualizarNumeroCarritoEnNavbar();
                alert('El carrito ha sido vaciado exitosamente.');
            }
        });
    }

    renderizarCarrito();
    actualizarNumeroCarritoEnNavbar();
});
