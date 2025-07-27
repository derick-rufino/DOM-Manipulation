/* Seleciona o #canvas e seus elementos filhos */
const canvas = document.getElementById("canvas"); //é uma div :)
const element1 = document.getElementById("element1");
const borderRadiusInput = document.getElementById("border-radius-value");

/* Seleciona os botões de propriedade */
document.querySelectorAll("[data-control]").forEach(btn => {
    btn.addEventListener("click", function () {
        mostrarControle(this.getAttribute("data-control"));
    });
});

/* Seleciona os controles de propriedades - permite que sejam exibidos e removidos dinâmicamente */
const controlsList = [
    "border-radius-controls",
    "size-controls",
    "position-controls",
    "color-controls"
];

function mostrarControle(controleId){ // Função para mostrar o controle selecionado
    controlsList.forEach(id => { // Para cada elemento da lista de controles
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
