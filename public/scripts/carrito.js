document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.querySelector('.carrito-container');
    const productosCarritoDiv = document.getElementById('productos-carrito');
    // CORRECCIÓN 1: Selector para el div del resumen del carrito
    const resumenCarritoDiv = document.querySelector('.total-carrito'); 
    // CORRECCIÓN 2: Selector para el botón "Proceder a la Compra" usando su ID
    const btnProcederCompra = document.getElementById('btn-proceder-compra'); 
    // CORRECCIÓN 3: Selector para el botón "Seguir Comprando" usando su ID
    const btnSeguirComprando = document.getElementById('btn-seguir-comprando'); 

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosCarritoDiv.innerHTML = ''; // Limpia el contenido actual

        if (carrito.length === 0) {
            productosCarritoDiv.innerHTML = '<p style="text-align: center; color: white;">Tu carrito está vacío.</p>';
            resumenCarritoDiv.innerHTML = '<h3>Total: $0.00</h3>'; // Asegúrate de que el total se muestre como $0.00
            // btnProcederCompra.style.display = 'none'; // Puedes ocultar o deshabilitar
            // btnSeguirComprando.style.display = 'none'; // Puedes ocultar o deshabilitar
            return;
        }

        let totalCarrito = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.dataset.nombre = producto.nombre;

            // CORRECCIÓN 4: Asegurarse de que precio y cantidad sean números
            const precioNumerico = parseFloat(producto.precio);
            const cantidadNumerica = parseInt(producto.cantidad, 10); // Base 10 para parseInt

            const subtotalProducto = precioNumerico * cantidadNumerica;
            totalCarrito += subtotalProducto;

            productoDiv.innerHTML = `
                <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${precioNumerico.toFixed(2)}</p>
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

        // Asegurarse de que el elemento para el total existe en el HTML
        const totalCarritoPrecioSpan = document.getElementById('total-carrito-precio');
        if (totalCarritoPrecioSpan) {
            totalCarritoPrecioSpan.textContent = totalCarrito.toFixed(2);
        } else {
             // Fallback si el span no tiene el ID, aunque tu HTML sí lo tiene
            resumenCarritoDiv.innerHTML = `<h3>Total: $${totalCarrito.toFixed(2)}</h3>`;
        }
       
        // Asegúrate de que los botones estén visibles si hay productos
        // if (btnProcederCompra) btnProcederCompra.style.display = 'block';
        // if (btnSeguirComprando) btnSeguirComprando.style.display = 'block';


        // Vuelve a adjuntar los event listeners cada vez que el carrito se renderiza
        // Esto es necesario porque los elementos se recrean
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
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoIndex = carrito.findIndex(item => item.nombre === nombre);

        if (productoIndex > -1) {
            carrito[productoIndex].cantidad += cambio;
            if (carrito[productoIndex].cantidad <= 0) {
                carrito.splice(productoIndex, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito(); // Vuelve a renderizar para actualizar la UI
            actualizarNumeroCarritoEnNavbar();
        }
    }

    function eliminarProductoDelCarrito(nombre) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.nombre !== nombre);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito(); // Vuelve a renderizar para actualizar la UI
        actualizarNumeroCarritoEnNavbar();
    }

    // Esta función ya estaba aquí, solo se asegura de que se use
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
                itemCountSpan.style.verticalAlign = 'super';
                carritoIcon.appendChild(itemCountSpan);
            }
            itemCountSpan.textContent = totalItems > 0 ? totalItems : '';
            itemCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    // Event listener para "Proceder a la Compra"
    if (btnProcederCompra) {
        btnProcederCompra.addEventListener('click', () => {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            if (carrito.length > 0) {
                window.location.href = 'confirmacion.html'; // Redirige a la página de confirmación
            } else {
                alert('Tu carrito está vacío. Agrega productos antes de proceder a la compra.');
            }
        });
    }

    // Event listener para "Seguir Comprando"
    if (btnSeguirComprando) {
        btnSeguirComprando.addEventListener('click', () => {
            window.location.href = 'productos.html'; // Redirige a la página de productos
        });
    }

    // Renderiza el carrito al cargar la página
    renderizarCarrito();
    // Actualiza el número del carrito en el navbar (aunque esta función también está en navbar-ui.js, no hace daño llamarla aquí también)
    actualizarNumeroCarritoEnNavbar(); 
});
