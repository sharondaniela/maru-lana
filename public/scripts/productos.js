// public/scripts/productos.js

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.producto').forEach(producto => {
        const btnMenos = producto.querySelector('.btn-menos');
        const btnMas = producto.querySelector('.btn-mas');
        const contadorSpan = producto.querySelector('.contador');
        let cantidad = parseInt(contadorSpan.textContent);

        btnMenos.addEventListener('click', () => {
            if (cantidad > 1) {
                cantidad--;
                contadorSpan.textContent = cantidad;
            }
        });

        btnMas.addEventListener('click', () => {
            cantidad++;
            contadorSpan.textContent = cantidad;
        });

        const btnAgregar = producto.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', () => {
            // *** NUEVA LÓGICA: Verificar si el usuario está logueado ***
            if (!isUserLoggedIn()) {
                alert('Debes iniciar sesión para agregar productos al carrito.');
                // Opcional: Redirigir a la página de login
                window.location.href = 'login.html';
                return; // Detener la ejecución si el usuario no está logueado
            }
            // *** Fin de la nueva lógica ***

            const nombre = producto.querySelector('h3').textContent;
            const precioTexto = producto.querySelector('p').textContent;
            const precio = parseFloat(precioTexto.replace('$', '').trim());
            const imagenSrc = producto.querySelector('img').src;
            const cantidadProducto = parseInt(producto.querySelector('.contador').textContent);

            agregarProductoAlCarrito({ nombre, precio, imagenSrc, cantidad: cantidadProducto });
        });
    });

    // *** NUEVA FUNCIÓN: Para verificar el estado de login ***
    // Esta función verifica si 'loggedInUser' existe en localStorage
    function isUserLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }
    // *** Fin de la nueva función ***

    function agregarProductoAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const productoExistenteIndex = carrito.findIndex(item => item.nombre === producto.nombre);

        if (productoExistenteIndex > -1) {
            carrito[productoExistenteIndex].cantidad += producto.cantidad;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.nombre} (x${producto.cantidad}) agregado al carrito.`);
        // Nota: actualizarNumeroCarritoEnNavbar() debe estar definida globalmente (ej. en navbar-ui.js)
        // ya que la movimos allí para que funcione en todas las páginas.
        // Si no la moviste, déjala aquí, pero lo ideal es que esté centralizada.
        // Si aún la tienes aquí y en navbar-ui.js, asegúrate de que no haya duplicidad.
        actualizarNumeroCarritoEnNavbar();
    }

    // Nota: La función actualizarNumeroCarritoEnNavbar() y su llamada inicial
    // deberían haber sido movidas a navbar-ui.js para que funcione en todas las páginas.
    // Si la mantienes aquí, solo funcionará en productos.html.
    // Eliminar la definición aquí si ya la tienes en navbar-ui.js:
    /*
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
    actualizarNumeroCarritoEnNavbar();
    */

    // Lógica del carrusel (sin cambios)
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (!sliderWrapper) return;
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;

        if (dots) {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        if (!slides || slides.length === 0) return;
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 3000);
    }

    showSlide(currentSlide);
    startSlider();

    if (dotsContainer) {
        dotsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('dot')) {
                const slideIndex = parseInt(event.target.dataset.slideIndex);
                currentSlide = slideIndex;
                showSlide(currentSlide);
                startSlider();
            }
        });
    }

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        sliderContainer.addEventListener('mouseleave', () => {
            startSlider();
        });
    }
});