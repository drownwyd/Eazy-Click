document.addEventListener("DOMContentLoaded", function() {
    // Função calcular
    window.calcular = function() {
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
});