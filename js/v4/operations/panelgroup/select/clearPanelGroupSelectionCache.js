/**
 * Kiüríti a kiválasztásra cachelt fűtő csoportot
 * 
 * @param {PanelGroup} panelGroup fűtőelem csoport paraméter
 * @returns {undefined}
 */
function clearPanelGroupSelectionCache(panelGroup) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);
    panelGroup.cursorIsInsideCache = null;
    getPanelsByIdList(panelGroup.panelIds).forEach(p => p.cursorIsInsideCache = null);
}