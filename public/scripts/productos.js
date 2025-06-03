// public/scripts/productos.js

document.addEventListener('DOMContentLoaded', () => {
    // Lógica existente para los contadores de cantidad
    document.querySelectorAll('.producto').forEach(producto => {
        const btnMenos = producto.querySelector('.btn-menos');
        const btnMas = producto.querySelector('.btn-mas');
        const contadorSpan = producto.querySelector('.contador');
        let cantidad = parseInt(contadorSpan.textContent);

        btnMenos.addEventListener('click', () => {
            if (cantidad > 1) { // Asegura que la cantidad mínima sea 1
                cantidad--;
                contadorSpan.textContent = cantidad;
            }
        });

        btnMas.addEventListener('click', () => {
            cantidad++;
            contadorSpan.textContent = cantidad;
        });

        // *** Nueva lógica para el botón "Agregar al Carrito" ***
        const btnAgregar = producto.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', () => {
            const nombre = producto.querySelector('h3').textContent;
            const precioTexto = producto.querySelector('p').textContent; // Asume que el precio está en un <p>
            const precio = parseFloat(precioTexto.replace('$', '').trim()); // Quita el '$' y convierte a número
            const imagenSrc = producto.querySelector('img').src;
            const cantidadProducto = parseInt(producto.querySelector('.contador').textContent);

            agregarProductoAlCarrito({ nombre, precio, imagenSrc, cantidad: cantidadProducto });
        });
    });

    // Lógica existente para el carrusel (si la tienes activa)
    // ...

    // *** Función para agregar productos al carrito (en localStorage) ***
    function agregarProductoAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Buscar si el producto ya existe en el carrito
        const productoExistenteIndex = carrito.findIndex(item => item.nombre === producto.nombre);

        if (productoExistenteIndex > -1) {
            // Si existe, actualiza la cantidad
            carrito[productoExistenteIndex].cantidad += producto.cantidad;
        } else {
            // Si no existe, añade el producto nuevo
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.nombre} (x${producto.cantidad}) agregado al carrito.`);
        actualizarNumeroCarritoEnNavbar(); // Llama a la función para actualizar el ícono del carrito
    }

    // *** Función para actualizar el número de elementos en el ícono del carrito (opcional) ***
    function actualizarNumeroCarritoEnNavbar() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        const carritoIcon = document.querySelector('.menu li a[href="carrito.html"]'); // Asumiendo que tu enlace al carrito es así
        if (carritoIcon) {
            // Puedes crear un span para mostrar el número, por ejemplo:
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
            itemCountSpan.textContent = totalItems > 0 ? totalItems : ''; // Muestra el número si es > 0
            itemCountSpan.style.display = totalItems > 0 ? 'inline-block' : 'none'; // Oculta si es 0
        }
    }

    // Llamar al cargar la página para mostrar el número inicial (si hay productos en carrito)
    actualizarNumeroCarritoEnNavbar();
});

   const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Ajusta el wrapper para mostrar el slide correcto
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;

        // Actualiza los puntos (dots)
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        // Limpia cualquier intervalo anterior para evitar múltiples ejecuciones
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // Inicia el intervalo para cambiar de slide cada 3 segundos (3000ms)
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Inicializar el carrusel al cargar la página
    showSlide(currentSlide); // Muestra el primer slide al inicio
    startSlider(); // Comienza la reproducción automática

    // Opcional: Permitir navegación manual con los puntos
    dotsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            const slideIndex = parseInt(event.target.dataset.slideIndex);
            currentSlide = slideIndex;
            showSlide(currentSlide);
            startSlider(); // Reiniciar el temporizador al navegar manualmente
        }
    });

    // Opcional: Detener slider en hover y reanudar al quitar el hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval); // Detener al pasar el ratón
        });
        sliderContainer.addEventListener('mouseleave', () => {
            startSlider(); // Reanudar al quitar el ratón
        });
    }
