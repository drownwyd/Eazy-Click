// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    const header = document.querySelector(".header");
    const menuToggleButton = document.getElementById('menu-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const currentTheme = localStorage.getItem('theme');

    // ============================================= //
    //  LÓGICA PARA O SELETOR DE TEMA (CLARO/ESCURO) //
    // ============================================= //
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        let theme = 'dark-theme';
        if (document.body.classList.contains('light-theme')) {
            theme = 'light-theme';
        }
        localStorage.setItem('theme', theme);
    });

    // ============================================= //
    //  LÓGICA PARA O CABEÇALHO FIXO E EFEITO SCROLL //
    // ============================================= //
    const scrollThreshold = 10; // Quantidade de pixels para rolar antes de aplicar o estilo 'scrolled'

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Chama na carga inicial para verificar a posição do scroll

    // ============================================= //
    //  LÓGICA PARA O MENU MOBILE                    //
    // ============================================= //
    if (menuToggleButton && mobileNavMenu) {
        menuToggleButton.addEventListener('click', () => {
            const isOpen = mobileNavMenu.classList.toggle('open');
            menuToggleButton.classList.toggle('open'); // Adiciona classe para animação do ícone
            
            if (isOpen) {
                document.body.style.overflow = 'hidden'; // Desativa o scroll do corpo
            } else {
                document.body.style.overflow = ''; // Reativa o scroll
            }
        });

        // Fecha o menu mobile ao clicar em um link
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavMenu.classList.remove('open');
                menuToggleButton.classList.remove('open');
                document.body.style.overflow = ''; // Reativa o scroll
            });
        });
    }

    // ============================================= //
    //  ANIMAÇÃO DE CARDS NA LANDING PAGE            //
    // ============================================= //
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
});