/**
 * Kiszámítja és visszaadja a panelcsoport csöveket is magába foglaló befoglaló téglalapját.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {Rectangle}
 */
function calculatePanelGroupBoundingBoxIncludingPipes(panelGroup) {
    if (!panelGroup) {
        return undefined;
    }

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
        panelGroup.lengthInPixels + PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * pixelsPerMetersRatio * 2,
        panelGroup.widthInPixels * panelGroup.panelIds.length,
        panelGroup.alignment * HALF_PI + toRadians(panelGroup.angleDeg)
    );
}