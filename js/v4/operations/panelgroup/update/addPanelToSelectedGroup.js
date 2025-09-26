/**
 * Hozzáad egy új panelt a kiválasztott csoporthoz
 * 
 * @returns {undefined}
 */
function addPanelToSelectedGroup() {
    const panelGroup = selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    const panel = new Panel();
    panelGroup.panelIds.push(panel.id);
    panel.groupId = panelGroup.id;

    updatePositionsOfAllMembers(panelGroup);
    updatePanelGroupBoundingBoxIncludingMembers(panelGroup);

    if (!panelGroup.isSelectedForDrag && !getContainingRoom(panelGroup)) {
        displayMessage('Újabb panel hozzáadásának hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt hozzáad a csoporthoz!');
        removePanelFromSelectedGroup();
    }
}