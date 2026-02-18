import { view2 } from "./state.js";
import { switchView, toggleAutoButton, clear } from "./utils.js";
import { keyboardHandler } from "./keyboard.js";
import { printData } from "./printData.js";

export function view2Setup() {
  view2.backBtn.addEventListener("click", () => switchView("back"));

  view2.printBtn.addEventListener("click", () => printData());

  view2.clearBtn.addEventListener("click", () => clear());

  view2.modeBtn.addEventListener("click", () => toggleAutoButton());

  document.addEventListener("keydown", keyboardHandler);
}
