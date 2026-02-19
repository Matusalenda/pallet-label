import { appState, view1 } from "./state.js";
import { switchView, customAlert } from "./utils.js";

export function view1Setup() {
  view1.enterBtn.addEventListener("click", () => {
    let operator = view1.inputName.value.trim();
    let name = operator.split(",")[0] || operator;
    let sector = operator.split(",")[1] || "";
    let shift = operator.split(",")[2] || ""; // Pega o primeiro nome ou o nome completo se for apenas um

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
