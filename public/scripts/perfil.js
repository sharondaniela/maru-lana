document.addEventListener('DOMContentLoaded', () => {
    const perfilNavLinks = document.querySelectorAll('.perfil-nav ul li a');
    const tabContents = document.querySelectorAll('.tab-content');
    const perfilNombreSpan = document.getElementById('perfil-nombre');
    const perfilEmailSpan = document.getElementById('perfil-email');

    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        perfilNavLinks.forEach(link => {
            link.classList.remove('active');
        });

        document.getElementById(tabId).classList.add('active');
        const activeLink = document.querySelector(`.perfil-nav ul li a[href="#${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    perfilNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const tabId = event.target.getAttribute('href').substring(1);
            showTab(tabId);
            window.location.hash = tabId;
        });
    });

    const loggedInUser = localStorage.getItem('loggedInUser');
    const userEmail = localStorage.getItem('userEmail') || 'N/A'; // Asegúrate que login.js guarde 'userEmail'

    if (perfilNombreSpan) {
        perfilNombreSpan.textContent = loggedInUser || 'Invitado';
    }
    if (perfilEmailSpan) {
        perfilEmailSpan.textContent = userEmail; 
    }

    if (window.location.hash) {
        const initialTab = window.location.hash.substring(1);
        if (document.getElementById(initialTab)) {
            showTab(initialTab);
        } else {
            showTab('datos-personales');
        }
    } else {
        showTab('datos-personales');
    }
});