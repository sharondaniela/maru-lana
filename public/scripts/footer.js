document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("footer-container");

    if (!container) {
        console.error("No se encontró el contenedor #footer-container");
        return;
    }

    fetch("footer.html") // si footer.html está en el mismo nivel que index.html usa: "footer.html"
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => {
            console.error("Error al cargar el footer:", error);
        });
});
