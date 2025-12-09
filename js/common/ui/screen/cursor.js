/**
 * Megállapítja, hogy a kurzor a UI paneleken belül található-e.
 * 
 * @returns {boolean}
 */
function mouseCursorIsInsideUi() {
    return mouseY < TOP_RIBBON_HEIGHT || mouseX < LEFT_RIBBON_WIDTH;
}

/**
 * Beállítja a kurzor típusát.
 * 
 * @returns {undefined}
 */
function setCursorType() {
    if (mouseCursorIsInsideUi()) {
        cursor(ARROW);
    } else {
        cursor(CROSS);
    }
}