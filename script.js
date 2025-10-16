// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeSwitcher = document.querySelector(".theme-switcher"); // Seleciona o contêiner do tema
    
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
    
    // Navegação suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector(".header").offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth"
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = this.getAttribute("href");
            smoothScroll(target);
        });
    });
    
    // Destaque no scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll(".section");
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", updateActiveLink);
    
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
    
    // Animação de cards
    function animateOnScroll() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    }
    document.querySelectorAll(".card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
});

// ============================================= //
// FUNÇÃO LOCAL PARA LIMPAR TEXTO (FINAL)        //
// ============================================= //
function limparTexto(texto) {
    if (!texto) return "";
    const genericas = ["exemplo", "teste", "remover"]; // edite como quiser
    genericas.forEach(str => {
        const regex = new RegExp(str, "gi");
        texto = texto.replace(regex, "");
    });
    texto = texto.replace(/[\r\n]+/g, " ");                 // quebras de linha
    texto = texto.replace(/["']/g, "");                     // aspas
    texto = texto.replace(/[\u200B-\u200D\uFEFF]/g, "");    // invisíveis
    texto = texto.replace(/\s{2,}/g, " ").trim();           // espaços duplicados
    return texto;
}

// Função processText (agora 100% local)
function processText() {
    const input = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");

    const cleanedText = limparTexto(input);
    outputText.value = cleanedText;

    // Animação de feedback
    outputText.style.borderColor = "#00d4ff";
    outputText.style.boxShadow = "0 0 0 2px rgba(0, 212, 255, 0.2)";
    setTimeout(() => {
        outputText.style.borderColor = "";
        outputText.style.boxShadow = "";
    }, 1000);
}

// Colar texto
async function colarTexto() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById("inputText").value = text;
    } catch (err) {
        console.error("Erro ao colar texto: ", err);
        alert("Não foi possível colar automaticamente. Use CTRL+V.");
    }
}

// Copiar texto
async function copiarTexto() {
    const outputText = document.getElementById("outputText");
    const output = outputText.value;
    if (output.trim() === "") {
        alert("Não há texto para copiar!");
        return;
    }
    try {
        await navigator.clipboard.writeText(output);
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = "✅ Copiado!";
        btn.style.background = "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)";
        btn.style.boxShadow = "0 0 15px rgba(76, 175, 80, 0.5)";
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = "";
            btn.style.boxShadow = "";
        }, 2000);
    } catch (err) {
        console.error("Erro ao copiar texto: ", err);
        alert("Erro ao copiar. Copie manualmente.");
    }
}

// Funções de Consulta de Alíquotas (do script do usuário, com pequenas adaptações)
// O objeto 'aliquotas' deve ser definido em dados.js
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se os elementos existem antes de tentar acessá-los
    const origemSelect = document.getElementById("origem");
    const destinoSelect = document.getElementById("destino");
    const resultadoDiv = document.getElementById("resultado-al");
    // const listaHistorico = document.getElementById("listaHistorico"); // Removido, pois não há elemento com este ID no HTML

    if (origemSelect && destinoSelect && resultadoDiv) {
        // A lista de estados é populada em dados.js, então não precisamos fazer isso aqui novamente
        // Apenas adicionamos os event listeners
        origemSelect.addEventListener("change", atualizarResultadoAliquota);
        destinoSelect.addEventListener("change", atualizarResultadoAliquota);

        // Chama a função uma vez para definir o estado inicial
        atualizarResultadoAliquota();
    }
});

// Função calcular (do script do usuário, com pequenas adaptações)
function calcular() {
    const principal = parseFloat(document.getElementById("principal").value) || 0;
    const secundaria = parseFloat(document.getElementById("secundaria").value) || 0;
    const tipo = document.getElementById("tipo").value;
    const resultado = document.getElementById("resultado");

    if (!isNaN(principal) && !isNaN(secundaria) && principal > 0 && secundaria > 0 && tipo) {
        let fator = 0;

        if (tipo === "principalMaior") {
            fator = principal / secundaria;
        } else if (tipo === "secundariaMaior") {
            fator = secundaria / principal;
        }

        resultado.textContent = `Fator: ${fator.toFixed(4)}`;
        resultado.style.color = "#00d4ff"; // Adicionado estilo neon
        resultado.style.textShadow = "0 0 10px rgba(0, 212, 255, 0.5)"; // Adicionado estilo neon
    } else {
        resultado.textContent = "Fator: --";
        resultado.style.color = ""; // Reset estilo
        resultado.style.textShadow = ""; // Reset estilo
    }
}

// ============================================= //
//  LÓGICA PARA O SELETOR DE TEMA (CLARO/ESCURO) //
// ============================================= //
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeSwitcher = document.querySelector('.theme-switcher'); // Seleciona o contêiner
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

    // A lógica de esconder/mostrar o themeSwitcher já está no listener do hamburger
    // e no listener de clique fora/link de navegação.
});