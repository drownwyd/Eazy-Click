const aliquotas = {
  AC: { nome: "Acre", interno: 19, regiao: "N" },
  AL: { nome: "Alagoas", interno: 20, regiao: "NE" },
  AP: { nome: "Amapá", interno: 20, regiao: "N" },
  AM: { nome: "Amazonas", interno: 18, regiao: "N" },
  BA: { nome: "Bahia", interno: 20.5, regiao: "NE" },
  CE: { nome: "Ceará", interno: 20, regiao: "NE" },
  DF: { nome: "Distrito Federal", interno: 20, regiao: "CO" },
  ES: { nome: "Espírito Santo", interno: 17, regiao: "SE" },
  GO: { nome: "Goiás", interno: 19, regiao: "CO" },
  MA: { nome: "Maranhão", interno: 22, regiao: "NE" },
  MT: { nome: "Mato Grosso", interno: 17, regiao: "CO" },
  MS: { nome: "Mato Grosso do Sul", interno: 17, regiao: "CO" },
  MG: { nome: "Minas Gerais", interno: 18, regiao: "SE" },
  PA: { nome: "Pará", interno: 19, regiao: "N" },
  PB: { nome: "Paraíba", interno: 20, regiao: "NE" },
  PR: { nome: "Paraná", interno: 19.5, regiao: "S" },
  PE: { nome: "Pernambuco", interno: 20.5, regiao: "NE" },
  PI: { nome: "Piauí", interno: 21, regiao: "NE" },
  RJ: { nome: "Rio de Janeiro", interno: 18, regiao: "SE" },
  RN: { nome: "Rio Grande do Norte", interno: 17, regiao: "NE" },
  RS: { nome: "Rio Grande do Sul", interno: 22, regiao: "S" },
  RO: { nome: "Rondônia", interno: 19.5, regiao: "N" },
  RR: { nome: "Roraima", interno: 20, regiao: "N" },
  SC: { nome: "Santa Catarina", interno: 17, regiao: "S" },
  SP: { nome: "São Paulo", interno: 18, regiao: "SE" },
  SE: { nome: "Sergipe", interno: 20, regiao: "NE" },
  TO: { nome: "Tocantins", interno: 20, regiao: "N" },
};

// Função para buscar alíquota
function getAliquota(origem, destino, importado = false) {
  if (!aliquotas[origem] || !aliquotas[destino]) {
    return "Origem ou destino inválido";
  }

  if (origem === destino) {
    return `De ${origem} para ${destino}, a Alíquota Interna é ${aliquotas[origem].interno}%`;
  } else {
    if (importado) {
      return `De ${origem} para ${destino}, a Alíquota Interestadual (Importados) é 4%`;
    }

    const regiaoOrigem = aliquotas[origem].regiao;
    const regiaoDestino = aliquotas[destino].regiao;

    const sulSudeste = ["S", "SE"];
    const norteNeCoMaisES = ["N", "NE", "CO", "SE"];

    // Regra: Sul (S) / Sudeste (SE) (exceto quando tratar ES especificamente) → N/NE/CO/ES => 7%
    if (
      sulSudeste.includes(regiaoOrigem) &&
      regiaoOrigem !== "SE" &&
      norteNeCoMaisES.includes(regiaoDestino)
    ) {
      return `De ${origem} para ${destino}, a Alíquota Interestadual é 7%`;
    }

    if (
      norteNeCoMaisES.includes(regiaoOrigem) &&
      sulSudeste.includes(regiaoDestino) &&
      regiaoDestino !== "SE"
    ) {
      return `De ${origem} para ${destino}, a Alíquota Interestadual é 7%`;
    }

    // Caso geral: 12%
    return `De ${origem} para ${destino}, a Alíquota Interestadual é 12%`;
  }
}

// Carrega estados nos selects
function carregarEstados() {
  const origemSelect = document.getElementById("origem");
  const destinoSelect = document.getElementById("destino");

  if (!origemSelect || !destinoSelect) return; // evita erro se ids diferentes na sua página

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
  consultarAliquota();
}

// Atualiza resultado automaticamente ao trocar seleção
function consultarAliquota() {
  const origem = document.getElementById("origem")?.value;
  const destino = document.getElementById("destino")?.value;
  const resultadoEl = document.getElementById("resultado-al"); // <--- USANDO resultado-al

  if (!origem || !destino || !resultadoEl) return;
  resultadoEl.innerText = getAliquota(origem, destino);
}

// Inicializa tudo quando a página carregar
window.onload = () => {
  carregarEstados();
  document.getElementById("origem")?.addEventListener("change", consultarAliquota);
  document.getElementById("destino")?.addEventListener("change", consultarAliquota);
};
