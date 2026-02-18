export { views, view1, view2, appState, alertElements, labelElements };

const views = document.querySelectorAll(".view-container");

// First screen elements
const view1 = {
  inputName: document.getElementById("NAME"),
  enterBtn: document.getElementById("enterBtn"),
};

// Second screen elements
const view2 = {
  displayName: document.getElementById("nameOperator"),
  lastPnReaded: document.getElementById("pnReaded"),

  inputPN: document.getElementById("PN"),
  inputQTY: document.getElementById("QTY"),

  backBtn: document.getElementById("backBtn"),

  clearBtn: document.getElementById("clearBtn"),
  modeBtn: document.getElementById("modeBtn"),
  printBtn: document.getElementById("printBtn"),
};

const labelElements = {
  date: document.querySelector(".label-date"),
  name: document.querySelector(".label-operator-name"),
  sector: document.querySelector(".label-sector-name"),
  qrCode1: document.getElementById("qrCode1"),
  labelPnTop: document.querySelector(".label-pn-top"),
  labelPnBottom: document.querySelector(".label-pn-bottom"),
  labelQty: document.querySelector(".label-qty"),
  qrCode2: document.getElementById("qrCode2"),
};

const alertElements = {
  alertMessage: document.querySelector(".alertMessage"),
  alertBtn: document.querySelector(".alertConfirm"),
  modalAlert: document.querySelector(".alertModal"),
};

// State variables
const appState = {
  actualView: 0,
  isAuto: true,
  lastPn: "",
  qtyCount: 0,
  operatorName: "",
  operatorSector: "",
  way: "",

  blockedKeys: [
    "F5",
    "F6",
    "F7",
    "F8",
    "F10",
    "F11",
    "F12",
    "Alt",
    "Control",
    "Shift",
  ],
};
