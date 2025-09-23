/**
 * Kiszámítja a panelcsoport befoglaló téglalapját és visszaadja
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {Rectangle}
 */
function calculatePanelGroupBoundingBox(panelGroup) {
    const middlePoint = createPoint(0, 0);

    const firstPanel = getPanelById(panelGroup.panelIds[0]);
    const lastPanel = getPanelById(panelGroup.panelIds[panelGroup.panelIds.length - 1]);
    
    if (!firstPanel || !lastPanel) {
        return undefined;
    }
    
    middlePoint.x = (firstPanel.centerPosition.x + lastPanel.centerPosition.x) / 2;
    middlePoint.y = (firstPanel.centerPosition.y + lastPanel.centerPosition.y) / 2;

    return createRectangleByMiddlePoint(
        middlePoint, 
        panelGroup.lengthInPixels, 
        panelGroup.widthInPixels, 
        panelGroup.alignment * HALF_PI + toRadians(panelGroup.angleDeg)
    );
}