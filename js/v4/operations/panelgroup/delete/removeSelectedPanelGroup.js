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
    deselectObject();
}

function removeSelectedPanelGroup() {
    removePanelGroup(selectedPanelGroup);
}