/**
 * Eltávolítja a legutolsó panelt a kiválasztott csoportból.
 * 
 * @returns {undefined}
 */
function removePanelFromSelectedGroup() {
    const panelGroup = selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    if (panelGroup.panelIds.length < 2) {
        removeSelectedPanelGroup();
        return;
    }

    const lastId = panelGroup.panelIds[panelGroup.panelIds.length - 1];
    const lastPanel = getPanelById(lastId);
    panelGroup.panelIds = panelGroup.panelIds.filter(x => x !== lastId);
    lastPanel.panelGroup = undefined;
    elementStore.remove(lastPanel);
    updatePositionsOfAllMembers(panelGroup);
    updatePanelGroupBoundingBoxIncludingMembers(panelGroup);
    recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}