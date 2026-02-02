import { MenuLine } from "./MenuLine.js";

/**
 * Felrajzolja a kijelzőre a paraméterül kapott MenuLine objektumot
 * 
 * @param {MenuLine} menuLine paraméter
 * @returns {undefined}
 */
function renderMenuLine(menuLine) {
    if (menuLine.shouldBeActive()) {
        menuLine.baseButton.show();
    } else {
        menuLine.baseButton.hide();
        menuLine.menuItems.forEach(b => b.hide());
    }
}

/**
 * Menüsor renderelésével kapcsolatos műveletek.
 */
export const RenderMenuLine = {
    renderMenuLine
};