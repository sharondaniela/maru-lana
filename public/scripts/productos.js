document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.producto').forEach(producto => {
          const btnMenos = producto.querySelector('.btn-menos');
          const btnMas = producto.querySelector('.btn-mas');
          const contadorSpan = producto.querySelector('.contador');
          let cantidad = parseInt(contadorSpan.textContent);

          // 👉 LINEAS NUEVAS PARA MULTIPLICAR (HU de tu compañero)
          const unitPriceElement = producto.querySelector(".unit_price");
          const totalPriceElement = producto.querySelector(".total_price");
          let unitPrice = parseInt(unitPriceElement.dataset.price);

          function actualizarTotal() {
              const total = cantidad * unitPrice;
              totalPriceElement.textContent = "$" + total.toLocaleString("es-CO");
          }
          actualizarTotal();
          // 👈 HASTA AQUÍ

          btnMenos.addEventListener('click', () => {
              if (cantidad > 1) {
                  cantidad--;
                  contadorSpan.textContent = cantidad;
                  actualizarTotal(); // 👉 MULTIPLICA
              }
          });

          btnMas.addEventListener('click', () => {
              cantidad++;
              contadorSpan.textContent = cantidad;
              actualizarTotal(); // 👉 MULTIPLICA
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
              const precio = parseFloat(precioTexto.replace('$', '').replaceAll('.', '').trim());
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

      // ═══════════════════════════════════════════════════════════════
      // BÚSQUEDA DE PRODUCTOS (HU2)
      // ═══════════════════════════════════════════════════════════════

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

          // Mostrar u ocultar mensaje de "sin resultados"
          if (mensajeSinResultados) {
              if (productosEncontrados === 0 && termino !== '') {
                  mensajeSinResultados.style.display = 'block';
              } else {
                  mensajeSinResultados.style.display = 'none';
              }
          }
      }

      // Event listener para el campo de búsqueda
      const inputBusqueda = document.getElementById('busqueda-productos');
      if (inputBusqueda) {
          inputBusqueda.addEventListener('input', function(e) {
              filtrarProductos(e.target.value);
          });
      }
  });