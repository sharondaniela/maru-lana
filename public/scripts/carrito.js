document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.querySelector('.carrito-container');
    const productosCarritoDiv = document.getElementById('productos-carrito');

    const resumenCarritoDiv = document.querySelector('.total-carrito'); 

    const btnProcederCompra = document.getElementById('btn-proceder-compra'); 

    const btnSeguirComprando = document.getElementById('btn-seguir-comprando'); 

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosCarritoDiv.innerHTML = '';

        if (carrito.length === 0) {
            productosCarritoDiv.innerHTML = '<p style="text-align: center; color: white;">Tu carrito está vacío.</p>';
            resumenCarritoDiv.innerHTML = '<h3>Total: $0</h3>'; 

            return;
        }

        let totalCarrito = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.dataset.nombre = producto.nombre;

 
            const precioNumerico = parseFloat(producto.precio);
            const cantidadNumerica = parseInt(producto.cantidad, 10); 

            const subtotalProducto = precioNumerico * cantidadNumerica;
            totalCarrito += subtotalProducto;

            productoDiv.innerHTML = `
                <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${precioNumerico.toLocaleString('es-CO', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</p>
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

       
        const totalCarritoPrecioSpan = document.getElementById('total-carrito-precio');
        if (totalCarritoPrecioSpan) {
            totalCarritoPrecioSpan.textContent = '$' + totalCarrito.toLocaleString('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        } else {

            resumenCarritoDiv.innerHTML = `<h3>Total: $${totalCarrito.toLocaleString('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })}</h3>`;
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
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoIndex = carrito.findIndex(item => item.nombre === nombre);

        if (productoIndex > -1) {
            carrito[productoIndex].cantidad += cambio;
            if (carrito[productoIndex].cantidad <= 0) {
                carrito.splice(productoIndex, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito(); 
            actualizarNumeroCarritoEnNavbar();
        }
    }

    function eliminarProductoDelCarrito(nombre) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.nombre !== nombre);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito(); 
        actualizarNumeroCarritoEnNavbar();
    }

    
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

   
    if (btnProcederCompra) {
        btnProcederCompra.addEventListener('click', () => {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            if (carrito.length > 0) {
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

   
    renderizarCarrito();
    
    actualizarNumeroCarritoEnNavbar(); 
});
