

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
        
            if (!isUserLoggedIn()) {
                alert('Debes iniciar sesión para agregar productos al carrito.');
               
                window.location.href = 'login.html';
                return; 
            }
       

            const nombre = producto.querySelector('h3').textContent;
            const precioTexto = producto.querySelector('p').textContent;
            const precio = parseFloat(precioTexto.replace('$', '').trim());
            const imagenSrc = producto.querySelector('img').src;
            const cantidadProducto = parseInt(producto.querySelector('.contador').textContent);

            agregarProductoAlCarrito({ nombre, precio, imagenSrc, cantidad: cantidadProducto });
        });
    });


 
    function isUserLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }


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
 
        actualizarNumeroCarritoEnNavbar();
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
});