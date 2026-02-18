import { initFocus } from "./modules/utils.js";
import { view1Setup } from "./modules/view1.js";
import { view2Setup } from "./modules/view2.js";

// Script está no final do body, DOM já está pronto
initFocus();
view1Setup();
view2Setup();

// Restaura foco quando volta após minimizar
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    initFocus();
    // Pequeno delay para garantir que o DOM está pronto
  }
});
