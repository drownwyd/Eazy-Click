document.addEventListener("DOMContentLoaded", () => {
    // Funções de Consulta de Alíquotas (do script do usuário, com pequenas adaptações)
    // O objeto 'aliquotas' deve ser definido em dados.js

    // Atualiza resultado automaticamente ao trocar seleção
    window.atualizarResultadoAliquota = function() {
        const origem = document.getElementById("origem")?.value;
        const destino = document.getElementById("destino")?.value;
        const resultadoEl = document.getElementById("resultado-al");

        if (!origem || !destino || !resultadoEl) return;
        resultadoEl.innerText = getAliquota(origem, destino);
    }

    // Carrega estados nos selects
    window.carregarEstados = function() {
        const origemSelect = document.getElementById("origem");
        const destinoSelect = document.getElementById("destino");

        if (!origemSelect || !destinoSelect) return;

        origemSelect.innerHTML = "";
        destinoSelect.innerHTML = "";

        for (const uf in aliquotas) {
            const optionO = document.createElement("option");
            optionO.value = uf;
            optionO.text = `${uf} - ${aliquotas[uf].nome}`;
            origemSelect.appendChild(optionO);

            const optionD = document.createElement("option");
            optionD.value = uf;
            optionD.text = `${uf} - ${aliquotas[uf].nome}`;
            destinoSelect.appendChild(optionD);
        }

        // Seleciona por padrão o mesmo estado (para já mostrar alíquota interna)
        origemSelect.selectedIndex = 0;
        destinoSelect.selectedIndex = 0;

        // Exibe resultado inicial
        atualizarResultadoAliquota();
    }

    // Inicializa tudo quando a página carregar
    carregarEstados();
    document.getElementById("origem")?.addEventListener("change", atualizarResultadoAliquota);
    document.getElementById("destino")?.addEventListener("change", atualizarResultadoAliquota);
});