/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    cachedSelectableRoom = null;
    cachedSelectablePanelGroup = null;

    elementStore.rooms.forEach(r => r.cursorIsInsideCache = null);
    elementStore.panelGroups.forEach(pg => clearPanelGroupSelectionCache(pg));
}