// public/scripts/confirmacion.js

document.addEventListener('DOMContentLoaded', () => {
    const resumenProductosConfirmacion = document.getElementById('resumen-productos-confirmacion');
    const totalPedidoSpan = document.getElementById('total-pedido');
    const btnVolverCarrito = document.getElementById('btn-volver-carrito');
    const btnConfirmarCompra = document.getElementById('btn-confirmar-compra');

    function cargarResumenPedido() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        resumenProductosConfirmacion.innerHTML = ''; // Limpia el contenedor

        if (carrito.length === 0) {
            resumenProductosConfirmacion.innerHTML = '<p>No hay productos en tu pedido. Por favor, regresa al carrito.</p>';
            totalPedidoSpan.textContent = '$0.00';
            btnConfirmarCompra.style.display = 'none'; // Ocultar botón si no hay productos
            return;
        }

        let totalGeneral = 0;

        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            totalGeneral += subtotal;

            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-confirmacion');
            productoDiv.innerHTML = `
                <div class="producto-info">
                    <img src="${producto.imagenSrc}" alt="${producto.nombre}">
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-cantidad">x${producto.cantidad}</span>
                </div>
                <span class="producto-precio-subtotal">$${subtotal.toFixed(2)}</span>
            `;
            resumenProductosConfirmacion.appendChild(productoDiv);
        });

        totalPedidoSpan.textContent = `$${totalGeneral.toFixed(2)}`;
        btnConfirmarCompra.style.display = 'block'; // Asegurarse de que el botón se muestre
    }

    // Event listener para el botón "Volver al Carrito"
    if (btnVolverCarrito) {
        btnVolverCarrito.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    // Event listener para el botón "Confirmar Compra"
    if (btnConfirmarCompra) {
        btnConfirmarCompra.addEventListener('click', () => {
            // Aquí iría la lógica para procesar la compra final (ej. enviar a un backend, procesar pago)
            // Por ahora, solo mostraremos un mensaje y limpiaremos el carrito.
            alert('¡Tu compra ha sido confirmada! Gracias por tu pedido.');
            localStorage.removeItem('carrito'); // Limpiar el carrito después de la compra
            window.location.href = 'index.html'; // Redirigir a la página de inicio o a una página de agradecimiento
        });
    }

    // Cargar el resumen del pedido cuando la página se carga
    cargarResumenPedido();
});