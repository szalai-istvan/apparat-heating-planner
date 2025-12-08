/**
 * Eltávolítja a paraméterül kapott panelcsoportot.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {undefined}
 */
function removePanelGroup(panelGroup) {
    if (!panelGroup) {
        return;
    }

    /** @type {Panel[]} */
    const panelsToDelete = getPanelsByIdList(panelGroup.panelIds);
    panelsToDelete.forEach(p => elementStore.remove(p));
    elementStore.remove(panelGroup);
    selectedPanelGroup = null;
    selectedObject = null;
    recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}

function removeSelectedPanelGroup() {
    removePanelGroup(selectedPanelGroup);
}