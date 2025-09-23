/**
 * Kiszámítja a panel befoglaló téglalpját.
 * 
 * @param {Panel} panel 
 * @returns {Rectangle}
 */
function calculatePanelBoundingBox(panel) {
    const group = getPanelGroupById(panel.groupId);
    return createRectangleByMiddlePoint(
        panel.centerPosition, 
        group.lengthInPixels, 
        group.widthInPixels, 
        group.alignment * HALF_PI + toRadians(group.angleDeg)
    );
}

/**
 * Kiszámítja a panel szövegdobozát.
 * 
 * @param {Panel} panel 
 * @returns {Rectangle}
 */

function calculatePanelTextBox(panel) {
    const group = getPanelGroupById(panel.groupId);
    return createRectangleByMiddlePoint(
        panel.centerPosition, 
        panelTextBoxWidth, 
        panelTextBoxHeight, 
        group.alignment * HALF_PI + toRadians(group.angleDeg)
    );
}