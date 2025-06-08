document.addEventListener('DOMContentLoaded', () => {
    const resumenProductosConfirmacionDiv = document.getElementById('resumen-productos-confirmacion');
    const totalPedidoSpan = document.getElementById('total-pedido');
    const btnVolverCarrito = document.getElementById('btn-volver-carrito');
    const btnConfirmarCompra = document.getElementById('btn-confirmar-compra');

    function renderizarResumenConfirmacion() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        resumenProductosConfirmacionDiv.innerHTML = ''; // Limpia el contenido

        if (carrito.length === 0) {
            resumenProductosConfirmacionDiv.innerHTML = '<p>No hay productos en el pedido.</p>';
            totalPedidoSpan.textContent = '$0.00';
            // Puedes ocultar los botones o deshabilitarlos si el carrito está vacío en confirmación
            if (btnConfirmarCompra) btnConfirmarCompra.style.display = 'none';
            return;
        }

        let totalGeneral = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-confirmacion');

            const precioNumerico = parseFloat(producto.precio);
            const cantidadNumerica = parseInt(producto.cantidad, 10);
            const subtotal = precioNumerico * cantidadNumerica;
            totalGeneral += subtotal;

            productoDiv.innerHTML = `
                <div class="producto-info">
                    <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-cantidad">x${cantidadNumerica}</span>
                </div>
                <span class="producto-precio-subtotal">$${subtotal.toFixed(2)}</span>
            `;
            resumenProductosConfirmacionDiv.appendChild(productoDiv);
        });

        // Asegura que el total se muestre correctamente
        totalPedidoSpan.textContent = `$${totalGeneral.toFixed(2)}`;

        // Asegura que los botones estén visibles
        if (btnConfirmarCompra) btnConfirmarCompra.style.display = 'block'; // O 'inline-block' según tu CSS
    }

    // Event listener para el botón "Volver al Carrito"
    if (btnVolverCarrito) {
        btnVolverCarrito.addEventListener('click', () => {
            window.location.href = 'carrito.html'; // Redirige a la página del carrito
        });
    }

    // Event listener para el botón "Confirmar Compra"
    if (btnConfirmarCompra) {
        btnConfirmarCompra.addEventListener('click', () => {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            if (carrito.length > 0) {
                // Lógica para finalizar la compra (ej. enviar a un API de pedidos)
                alert('¡Compra confirmada! Gracias por tu pedido.');
                localStorage.removeItem('carrito'); // Vaciar el carrito después de la compra
                // Opcional: Redirigir a una página de agradecimiento o a la página de inicio
                window.location.href = 'index.html'; 
            } else {
                alert('Tu carrito está vacío. No hay nada que confirmar.');
            }
        });
    }

    // Llama a la función al cargar la página para mostrar el resumen
    renderizarResumenConfirmacion();
});
