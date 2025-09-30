/**
 * Megállapítja, hogy a kurzor benne van-e a paraméterül kapott fűtőelem szövegdobozában
 * 
 * @param {Panel} panel födémfűtő elem
 * @returns {boolean} true, ha a kurzor a fűtőelem szövegdobozában található
 */
function mouseCursorIsInsidePanelsTextbox(panel) {
    if (!panel.centerPosition) {
        return false;
    }

    const group = getPanelGroupById(panel.groupId);
    if (!group) {
        return false;
    }

    if (!panel.textBox) {
        return false;
    }

    if (panel.cursorIsInsideCache === null) {
        panel.cursorIsInsideCache = pointIsInsideRectangle(getClosestGlobalGridPointToCursorsCorrectedPosition(), panel.textBox);
    }

    return panel.cursorIsInsideCache;
}