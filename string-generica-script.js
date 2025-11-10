document.addEventListener("DOMContentLoaded", function() {
    // ============================================= //
    // FUNÇÃO LOCAL PARA LIMPAR TEXTO                //
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

    // Função processText
    window.processText = function() {
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
    window.colarTexto = async function() {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById("inputText").value = text;
        } catch (err) {
            console.error("Erro ao colar texto: ", err);
            alert("Não foi possível colar automaticamente. Use CTRL+V.");
        }
    }

    // Copiar texto
    window.copiarTexto = async function() {
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
});