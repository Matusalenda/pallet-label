import { appState, view1, view2, views, labelElements } from "./state.js";
import { alertElements } from "./state.js";

// INITIAL FOCUS
export function initFocus() {
  if (appState.actualView === 0) {
    view1.inputName.focus();
  } else {
    const inputs = [view2.inputPN, view2.inputQTY].filter(
      (input) => !input.disabled,
    );
    const emptyInput = inputs.find((input) => input.value.trim() === "");

    if (emptyInput) {
      emptyInput.focus();
    } else {
      view2.inputPN.focus();
    }
  }
}

// SWITCH VIEWS BACK AND NEXT
export function switchView(direction) {
  appState.way = direction;
  if (appState.way == "next") {
    view1.inputName.value = "";
    views[0].classList.add("INACTIVE");
    views[1].classList.remove("INACTIVE");
    appState.actualView++;
    view2.displayName.innerText = `OPERADOR: ${appState.operatorName}`;

    initFocus();
  } else {
    clear();

    if (appState.isAuto === false) {
      toggleAutoButton();
    }

    views[1].classList.add("INACTIVE");
    views[0].classList.remove("INACTIVE");

    appState.actualView--;
    initFocus();
  }
}

// GET PART-NUMBER AND QUANTITY TO ZERO
export function clear() {
  view2.inputPN.value = "";
  appState.lastPn = "";
  appState.qtyCount = 0;
  view2.lastPnReaded.innerHTML = "";

  view2.inputQTY.value = appState.isAuto === true ? "0" : "";

  initFocus();
}

// TOGGLE AUTO MODE BUTTON
export function toggleAutoButton() {
  appState.isAuto = !appState.isAuto;
  if (appState.isAuto === false) {
    view2.inputQTY.disabled = false;
    view2.inputQTY.value = "";

    if (appState.lastPn !== "") {
      view2.inputPN.value = appState.lastPn;
      view2.inputQTY.focus();
      view2.lastPnReaded.innerHTML = "";
    } else {
      initFocus();
    }
  } else {
    view2.inputQTY.disabled = true;
    appState.qtyCount = 0;
    view2.inputQTY.value = appState.qtyCount;
    appState.lastPn = "";
    view2.lastPnReaded.innerHTML = "";
    view2.inputPN.value = "";

    initFocus();
  }
}

// CUSTOMIZED ALERT FUNCTION
export function customAlert(msg) {
  // Usa readonly para impedir digitação sem mudar aparência

  view1.inputName.readOnly = true;
  view2.inputPN.readOnly = true;
  view2.inputQTY.readOnly = true;

  alertElements.alertMessage.innerText = msg;
  alertElements.modalAlert.style.display = "flex";

  alertElements.alertBtn.focus();

  alertElements.alertBtn.onclick = () => {
    alertElements.modalAlert.style.display = "none";

    view1.inputName.readOnly = false;
    view2.inputPN.readOnly = false;
    view2.inputQTY.readOnly = false;

    initFocus();
  };
}

// READ PART-NUMBER AND COUNT QUANTITY
export function scanPn() {
  const currentPn = view2.inputPN.value.trim().toUpperCase();

  if (appState.isAuto === true && appState.actualView === 1) {
    if (currentPn === "" && appState.lastPn === "") {
      customAlert("Insira um part-number!");
      return;
    }

    if (appState.lastPn === "" || appState.lastPn === currentPn) {
      appState.lastPn = appState.lastPn || currentPn;
      appState.qtyCount++;
      view2.inputQTY.value = appState.qtyCount;
      view2.lastPnReaded.innerHTML = pnFormat(appState.lastPn);

      view2.inputPN.value = "";
      view2.inputPN.focus();
    } else {
      customAlert("PN incorreto!");
      view2.inputPN.value = "";
      view2.inputPN.focus();
    }
  }
}

export function pnFormat(pn) {
  const leftPn = pn.slice(0, 5);
  const midPn = pn.slice(5, 10);
  const rightPn = pn.slice(10, 12);

  if (pn.length === 12) {
    return `${leftPn}-${midPn}-${rightPn}`;
  } else if (pn.length === 10) {
    return `${leftPn}-${midPn}`;
  } else if (pn.length <= 5) {
    return leftPn;
  } else {
    return `${leftPn}-${midPn}`;
  }
}

export function printService() {}
