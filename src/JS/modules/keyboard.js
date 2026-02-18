import { appState, view1, view2, alertElements } from "./state.js";
import { customAlert, scanPn } from "./utils.js";

function blockKeys(event) {
  if (appState.blockedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

export function keyboardHandler(event) {
  // Se o modal de alerta estiver aberto, apenas permite fechar com Enter/F4
  if (alertElements.modalAlert.style.display === "flex") {
    if (event.key === "Enter") {
      event.preventDefault();
      alertElements.alertBtn.click();
    }
    return;
  }

  if (appState.actualView === 0) {
    view1KeyboardHandler(event);
  } else if (appState.actualView === 1) {
    view2KeyboardHandler(event);
  }
}

function view1KeyboardHandler(event) {
  blockKeys(event);

  switch (event.key) {
    case "Enter":
    case "Tab":
    case "F4":
      event.preventDefault();
      if (appState.actualView === 0) {
        if (view1.inputName.value.trim() !== "") {
          view1.enterBtn.click();
        } else {
          customAlert("Insira o nome do operador!");
        }
      }
      break;
  }
}

function view2KeyboardHandler(event) {
  const inputElements = [view2.inputPN, view2.inputQTY];

  const currentIndex = inputElements.indexOf(document.activeElement);

  blockKeys(event);

  switch (event.key) {
    case "Enter":
    case "Tab":
      event.preventDefault();

      if (appState.isAuto === true) {
        // Modo AUTO
        if (view2.inputPN.value.trim() === "") {
          // inputPN vazio: imprime
          view2.printBtn.click();
        } else {
          // inputPN preenchido: escaneia
          scanPn();
        }
      } else {
        // Modo MANUAL: Enter passa para próximo input
        if (currentIndex === inputElements.length - 1) {
          // Está no último input (QTY): imprime
          view2.printBtn.click();
        } else if (
          currentIndex >= 0 &&
          currentIndex < inputElements.length - 1
        ) {
          // Avança para próximo input
          inputElements[currentIndex + 1].focus();
        } else {
          // Foco fora dos inputs: vai para o primeiro
          inputElements[0].focus();
        }
      }
      break;
    case "F1":
      event.preventDefault();
      view2.printBtn.click();
      break;
    case "F2":
      event.preventDefault();
      view2.clearBtn.click();
      break;
    case "F3":
      event.preventDefault();
      view2.modeBtn.click();
      break;
    case "F4":
      event.preventDefault();
      break;
    case "F9":
      event.preventDefault();
      view2.backBtn.click();
      break;
    case "ArrowUp":
      event.preventDefault();
      if (currentIndex > 0) {
        inputElements[currentIndex - 1].focus();
      }
      break;
    case "ArrowDown":
      event.preventDefault();
      if (currentIndex < inputElements.length - 1) {
        inputElements[currentIndex + 1].focus();
      }
      break;
  }
}
