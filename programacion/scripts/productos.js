document.querySelectorAll('.producto').forEach(producto => {
  const btnMas = producto.querySelector('.btn-mas');
  const btnMenos = producto.querySelector('.btn-menos');
  const contador = producto.querySelector('.contador');

  btnMas.addEventListener('click', () => {
    let valor = parseInt(contador.textContent);
    contador.textContent = valor + 1;
  });

  btnMenos.addEventListener('click', () => {
    let valor = parseInt(contador.textContent);
    if (valor > 1) {
      contador.textContent = valor - 1;
    }
  });
});
let indice = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function mostrarSlide() {
  slides.style.transform = `translateX(-${indice * 100}%)`;
}

// Muestra el primer slide desde el inicio
mostrarSlide();

// Inicia el carrusel luego de 5 segundos
setInterval(() => {
  indice = (indice + 1) % totalSlides;
  mostrarSlide();
}, 5000);