/**
 * Beállítja a paraméterül kapott panelcsoport típusához tartozó tulajdonságokat
 * 
 * @param {PanelGroup} panelGroup panelcsoport
 * @param {string} type típus
 * @returns {undefined}
 */
function setupPanelGroupType(panelGroup, type) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);
    checkClass(type, CLASS_STRING);

    const ratio = pixelsPerMetersRatio;

    panelGroup.details = panelTypes[type];
    if (!panelGroup.details) {
        throw new Error(`Unknown panel type: ${type}`);
    }

    panelGroup.type = type;
    panelGroup.lengthInPixels = panelGroup.details.length * ratio;
    panelGroup.widthInPixels = panelGroup.details.width * ratio;
}