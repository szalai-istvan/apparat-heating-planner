/**
 * Elforgatja a kiválasztott panelcsoportot.
 * 
 * @returns {boolean} true, ha a művelet sikeres.
 */
function rotateSelectedPanelGroup() {
    const panelGroup = selectedPanelGroup;
    if (!panelGroup) {
        return false;
    }

    panelGroup.alignment = (selectedPanelGroup.alignment + 1) % 4;
    updatePositionsOfAllMembers(panelGroup);
    updatePanelGroupBoundingBoxIncludingMembers(panelGroup);

    if (!panelGroup.isSelectedForDrag && !getContainingRoom(panelGroup)) {
        displayMessage('A forgatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
        panelGroup.alignment = (selectedPanelGroup.alignment + 3) % 4;
        updatePositionsOfAllMembers(panelGroup);
        updatePanelGroupBoundingBoxIncludingMembers(panelGroup);
    }
}