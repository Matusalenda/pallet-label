import { view2, appState, labelElements } from "./state.js";
import { clear, customAlert, initFocus } from "./utils.js";

export function printData() {
  let AllFilled =
    appState.isAuto === true
      ? appState.lastPn !== "" && appState.qtyCount > 0
      : view2.inputPN.value.trim() !== "" &&
        view2.inputQTY.value.trim() !== "" &&
        view2.inputQTY.value !== "0";

  if (!AllFilled) {
    customAlert("Por favor, preencha todos os campos antes de imprimir.");
    initFocus();
    return;
  }

  // Verifica se QRCode está disponível
  if (typeof QRCode === "undefined") {
    customAlert("Erro: Biblioteca QR Code não carregada. Recarregue a página.");
    return;
  }

  setLabelData();

  window.focus();

  clear();

  setTimeout(() => {
    window.print();
  }, 500);

  window.onafterprint = () => window.stop();
}

function setLabelData() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  labelElements.date.textContent = `${formattedDate} ${formattedTime}`;

  labelElements.name.innerHTML = appState.operatorName;
  labelElements.sector.innerHTML = appState.operatorSector;

  const pn =
    appState.isAuto === true ? appState.lastPn : view2.inputPN.value.trim();
  const pnBottomStyle =
    pn.length > 10
      ? "transform: scaleX(0.8); font-size: 165px;"
      : "transform: scaleX(1); font-size: 200px;";

  if (appState.isAuto === true) {
    labelElements.labelPnTop.textContent = appState.lastPn.slice(0, 5);
    labelElements.labelPnBottom.textContent = appState.lastPn.slice(5);
    labelElements.labelPnBottom.style.cssText = pnBottomStyle;
    labelElements.labelQty.textContent = appState.qtyCount;
  } else {
    labelElements.labelPnTop.textContent = view2.inputPN.value
      .trim()
      .slice(0, 5)
      .toUpperCase();
    labelElements.labelPnBottom.textContent = view2.inputPN.value
      .trim()
      .slice(5)
      .toUpperCase();
    labelElements.labelPnBottom.style.cssText = pnBottomStyle;
    labelElements.labelQty.textContent = view2.inputQTY.value.trim();
  }
  generateQRCodes();
}

function generateQRCode(element, data) {
  if (!element) return;
  try {
    element.innerHTML = "";
    const size = Math.min(
      element.offsetWidth || 75,
      element.offsetHeight || 75,
    );
    new QRCode(element, {
      text: data,
      width: size,
      height: size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  } catch (error) {
    element.innerHTML = `<div class="qr-fallback">${data}</div>`;
  }
}

function generateQRCodes() {
  const qr1Text =
    appState.isAuto === true ? appState.lastPn : view2.inputPN.value.trim();
  const qr2Text =
    appState.isAuto === true
      ? `QTY: ${appState.qtyCount}`
      : `QTY: ${view2.inputQTY.value.trim()}`;

  generateQRCode(labelElements.qrCode1, qr1Text);
  generateQRCode(labelElements.qrCode2, qr2Text);
}
