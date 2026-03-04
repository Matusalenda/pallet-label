import { appState, view1 } from "./state.js";
import { switchView, customAlert } from "./utils.js";

export function view1Setup() {
  view1.enterBtn.addEventListener("click", () => {
    const operator = view1.inputName.value.trim();
    const name = operator.split(",")[0] || operator;
    const sector = operator.split(",")[1] || "";
    const shift = operator.split(",")[2] || ""; // Pega o primeiro nome ou o nome completo se for apenas um

    if (operator !== "") {
      appState.operatorName = name.toUpperCase();
      appState.operatorSector =
        sector && shift
          ? `${sector.toUpperCase()}<br>${shift}º TURNO`
          : '<span style="font-size: 3em;">N/D</span>';
      switchView("next");
    } else {
      customAlert("Insira o nome do operador!");
    }
  });
}
