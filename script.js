// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeSwitcher = document.querySelector(".theme-switcher");
    
    // Toggle do menu hamburger
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        nav.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
        
        // Esconde o seletor de tema quando o menu hambúrguer está ativo
        if (nav.classList.contains("active")) {
            themeSwitcher.classList.add("hidden");
        } else {
            themeSwitcher.classList.remove("hidden");
        }
    });
    
    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
            themeSwitcher.classList.remove("hidden"); // Mostra o seletor de tema novamente
        });
    });
    
    // Fecha ao clicar fora
    document.addEventListener("click", function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove("active");
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
            themeSwitcher.classList.remove("hidden"); // Mostra o seletor de tema novamente
        }
    });
    
    // Parallax header
    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector(".header");
        if (scrolled > 50) {
            header.style.background = "rgba(10, 10, 10, 0.98)";
            header.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.1)";
        } else {
            header.style.background = "rgba(10, 10, 10, 0.95)";
            header.style.boxShadow = "none";
        }
    });
    
    // Animação de cards na landing page
    function animateFunctionCards() {
        const cards = document.querySelectorAll(".function-card");
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    }
    document.querySelectorAll(".function-card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    window.addEventListener("scroll", animateFunctionCards);
    animateFunctionCards(); // Trigger on load

    // ============================================= //
    //  LÓGICA PARA O SELETOR DE TEMA (CLARO/ESCURO) //
    // ============================================= //
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Verifica se já existe um tema salvo no localStorage
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        // Alterna a classe 'light-theme' no body
        document.body.classList.toggle('light-theme');

        // Salva a preferência do usuário no localStorage
        let theme = 'dark-theme'; // Padrão
        if (document.body.classList.contains('light-theme')) {
            theme = 'light-theme';
        }
        localStorage.setItem('theme', theme);
    });
});