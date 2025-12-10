document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.producto').forEach(producto => {
        const btnMenos = producto.querySelector('.btn-menos');
        const btnMas = producto.querySelector('.btn-mas');
        const contadorSpan = producto.querySelector('.contador');
        let cantidad = parseInt(contadorSpan.textContent);

        const unitPriceElement = producto.querySelector(".unit_price");
        const totalPriceElement = producto.querySelector(".total_price");
        let unitPrice = null;

        if (unitPriceElement && totalPriceElement && unitPriceElement.dataset.price) {
            unitPrice = parseInt(unitPriceElement.dataset.price);
        }

        function actualizarTotal() {
            if (unitPrice && totalPriceElement) {
                const total = cantidad * unitPrice;
                totalPriceElement.textContent = "$" + formatearMonedaColombia(total);
            }
        }

        actualizarTotal();

        btnMenos.addEventListener('click', () => {
            if (cantidad > 1) {
                cantidad--;
                contadorSpan.textContent = cantidad;
                actualizarTotal();
            }
        });

        btnMas.addEventListener('click', () => {
            cantidad++;
            contadorSpan.textContent = cantidad;
            actualizarTotal();
        });

        const btnAgregar = producto.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', () => {
            if (!isUserLoggedIn()) {
                alert('Debes iniciar sesión para agregar productos al carrito.');
                window.location.href = 'login.html';
                return;
            }

            const nombre = producto.querySelector('h3').textContent;
            const precioTexto = producto.querySelector('p').textContent;
            const precio = parsearPrecio(precioTexto);
            const imagenSrc = producto.querySelector('img').src;
            const cantidadProducto = parseInt(producto.querySelector('.contador').textContent);

            const productoData = {
                nombre,
                precio,
                imagenSrc,
                cantidad: cantidadProducto
            };

            CartManager.agregarProducto(productoData);
            alert(`${nombre} (x${cantidadProducto}) agregado al carrito.`);
            actualizarNumeroCarritoEnNavbar();
        });
    });

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

    function filtrarProductos(terminoBusqueda) {
        const productos = document.querySelectorAll('.producto');
        const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
        const termino = terminoBusqueda.toLowerCase().trim();
        let productosEncontrados = 0;

        productos.forEach(producto => {
            const nombreProducto = producto.querySelector('h3').textContent;
            const nombreMinusculas = nombreProducto.toLowerCase();

            if (nombreMinusculas.includes(termino)) {
                producto.style.display = 'block';
                productosEncontrados++;
            } else {
                producto.style.display = 'none';
            }
        });

        if (mensajeSinResultados) {
            if (productosEncontrados === 0 && termino !== '') {
                mensajeSinResultados.style.display = 'block';
            } else {
                mensajeSinResultados.style.display = 'none';
            }
        }
    }

    const inputBusqueda = document.getElementById('busqueda-productos');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', function(e) {
            filtrarProductos(e.target.value);
        });
    }
});
