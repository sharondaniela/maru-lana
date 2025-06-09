document.addEventListener('DOMContentLoaded', () => {
    const resumenProductosConfirmacionDiv = document.getElementById('resumen-productos-confirmacion');
    const totalPedidoSpan = document.getElementById('total-pedido');
    const btnVolverCarrito = document.getElementById('btn-volver-carrito');
    const btnConfirmarCompra = document.getElementById('btn-confirmar-compra');

    function renderizarResumenConfirmacion() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        resumenProductosConfirmacionDiv.innerHTML = ''; 
        if (carrito.length === 0) {
            resumenProductosConfirmacionDiv.innerHTML = '<p>No hay productos en el pedido.</p>';
            totalPedidoSpan.textContent = '$0.00';

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

    
        totalPedidoSpan.textContent = `$${totalGeneral.toFixed(2)}`;

   
        if (btnConfirmarCompra) btnConfirmarCompra.style.display = 'block';
    }

    
    if (btnVolverCarrito) {
        btnVolverCarrito.addEventListener('click', () => {
            window.location.href = 'carrito.html'; 
        });
    }

    if (btnConfirmarCompra) {
        btnConfirmarCompra.addEventListener('click', () => {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            if (carrito.length > 0) {
           
                alert('¡Compra confirmada! Gracias por tu pedido.');
                localStorage.removeItem('carrito'); 
                
                window.location.href = 'index.html'; 
            } else {
                alert('Tu carrito está vacío. No hay nada que confirmar.');
            }
        });
    }

    renderizarResumenConfirmacion();
});
