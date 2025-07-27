/* Seleciona o #canvas e seus elementos filhos */
const canvas = document.getElementById("canvas"); //é uma div :)
const element1 = document.getElementById("element1");
const borderRadiusInput = document.getElementById("border-radius-value");

/* Seleciona os botões de propriedade */
document.querySelectorAll("[data-control]").forEach((btn) => {
  btn.addEventListener("click", function () {
    mostrarControle(this.getAttribute("data-control"));
  });
});

/* Seleciona os controles de propriedades - permite que sejam exibidos e removidos dinâmicamente */
const controlsList = [
  "border-radius-controls",
  "size-controls",
  "position-controls",
  "color-controls",
];

function mostrarControle(controleId) {
  // Função para mostrar o controle selecionado
  controlsList.forEach((id) => {
    // Para cada elemento da lista de controles
    // Se o id do elemento for igual ao controleId, exibe o elemento, caso contrário, oculta
    const el = document.getElementById(id);
    if (el) el.style.display = id === controleId ? "flex" : "none";
  });
}

// Define o maximo do range de border-radius como metade da largura do elemento
borderRadiusInput.max = element1.offsetWidth / 2;

// Border Radius Controls
document.getElementById("border-radius-value").addEventListener("input", () => {
  const value = document.getElementById("border-radius-value").value;
  const unit =
    document.querySelector('input[name="unit"]:checked').id === "unit-px"
      ? "px"
      : "%";
  document.getElementById("value").textContent = value;
  document.getElementById("unit").textContent = unit;
  element1.style.borderRadius = `${value}${unit}`;
});

// Size controls
document.getElementById("width-value").addEventListener("input", () => {
  const width = document.getElementById("width-value").value;
  element1.style.width = `${width}px`;
});

document.getElementById("height-value").addEventListener("input", () => {
  const height = document.getElementById("height-value").value;
  element1.style.height = `${height}px`;
});

// Color controls
document.getElementById("color-picker").addEventListener("input", () => {
  const color = document.getElementById("color-picker").value;
  element1.style.backgroundColor = color;
});

// #region [MANIPULAÇÃO DE POSIÇÃO] --------------------------------------------------

/**
 * Sincroniza o valor do slider X com o input numérico X e vice-versa
 */
function syncPosXInputs(value) {
  document.getElementById("pos-x").value = value;
  document.getElementById("pos-x-num").value = value;
}

/**
 * Sincroniza o valor do slider Y com o input numérico Y e vice-versa
 */
function syncPosYInputs(value) {
  document.getElementById("pos-y").value = value;
  document.getElementById("pos-y-num").value = value;
}

/**
 * Retorna o ponto de ancoragem selecionado (ex: 'top-left', 'middle-center', etc.)
 */
function getSelectedAnchor() {
  const anchors = [
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];
  for (const anchor of anchors) {
    if (
      document.getElementById(`anchor-${anchor}`) &&
      document.getElementById(`anchor-${anchor}`).checked
    ) {
      return anchor;
    }
  }
  return "middle-center"; // padrão
}

/**
 * Atualiza a posição do elemento conforme X, Y e âncora selecionada
 */
function updateElementPosition() {
  const x = parseInt(document.getElementById("pos-x").value, 10);
  const y = parseInt(document.getElementById("pos-y").value, 10);
  const anchor = getSelectedAnchor();

  // Calcula o offset de acordo com a âncora
  let offsetX = 0,
    offsetY = 0;
  const el = element1;
  const canvasRect = canvas.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  switch (anchor) {
    case "top-left":
      offsetX = 0;
      offsetY = 0;
      break;
    case "top-center":
      offsetX = (canvas.offsetWidth - el.offsetWidth) / 2;
      offsetY = 0;
      break;
    case "top-right":
      offsetX = canvas.offsetWidth - el.offsetWidth;
      offsetY = 0;
      break;
    case "middle-left":
      offsetX = 0;
      offsetY = (canvas.offsetHeight - el.offsetHeight) / 2;
      break;
    case "middle-center":
      offsetX = (canvas.offsetWidth - el.offsetWidth) / 2;
      offsetY = (canvas.offsetHeight - el.offsetHeight) / 2;
      break;
    case "middle-right":
      offsetX = canvas.offsetWidth - el.offsetWidth;
      offsetY = (canvas.offsetHeight - el.offsetHeight) / 2;
      break;
    case "bottom-left":
      offsetX = 0;
      offsetY = canvas.offsetHeight - el.offsetHeight;
      break;
    case "bottom-center":
      offsetX = (canvas.offsetWidth - el.offsetWidth) / 2;
      offsetY = canvas.offsetHeight - el.offsetHeight;
      break;
    case "bottom-right":
      offsetX = canvas.offsetWidth - el.offsetWidth;
      offsetY = canvas.offsetHeight - el.offsetHeight;
      break;
  }

  // Aplica a transformação
  el.style.position = "absolute";
  el.style.left = `${offsetX + x}px`;
  el.style.top = `${offsetY + y}px`;
}

// Listeners para sincronizar sliders e inputs numéricos
["pos-x", "pos-x-num"].forEach((id) => {
  document.getElementById(id).addEventListener("input", (e) => {
    syncPosXInputs(e.target.value);
    updateElementPosition();
  });
});
["pos-y", "pos-y-num"].forEach((id) => {
  document.getElementById(id).addEventListener("input", (e) => {
    syncPosYInputs(e.target.value);
    updateElementPosition();
  });
});

// Listeners para mudança de âncora
document.querySelectorAll('input[name="anchor"]').forEach((radio) => {
  radio.addEventListener("change", updateElementPosition);
});

// Inicializa posição ao carregar
updateElementPosition();

// #endregion -------------------------------------------------------------------
