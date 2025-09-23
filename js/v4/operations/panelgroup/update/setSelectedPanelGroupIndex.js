/**
 * Beállítja a kattintott index értékét a panelcsoporton.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {undefined}
 */
function setSelectedPanelGroupIndex(panelGroup) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);

    let index = 0;
    while (index < panelGroup.panelIds.length) {
        const panel = getPanelById(panelGroup.panelIds[index]);
        if (mouseCursorIsInsidePanelsTextbox(panel)) {
            panelGroup.clickedMemberIndex = index;
            return;
        }
        index++;
    }

    panelGroup.clickedMemberIndex = undefined;
}