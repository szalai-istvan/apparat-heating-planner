/**
 * Megállapítja, hogy a kurzor a UI panelen belül van-e.
 * 
 * @returns {boolean} true, ha a kurzor a UI panelen belül van
 */
function mouseCursorIsInsideUi() {
    return mouseY < TOP_RIBBON_HEIGHT || mouseX < LEFT_RIBBON_WIDTH;
}