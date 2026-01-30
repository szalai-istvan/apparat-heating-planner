/**
 * Újraszámolja és beállítja a paraméterül kapott panelcsoport és a tagjainak a befoglaló téglalapjait.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {undefined}
 */
function updatePanelGroupBoundingBoxIncludingMembers(panelGroup) {
    if (!panelGroup) {
        return;
    }

    panelGroup.boundingBox = calculatePanelGroupBoundingBox(panelGroup);
    panelGroup.boundingBoxIncludingPipes = calculatePanelGroupBoundingBoxIncludingPipes(panelGroup);
    const panelList = getPanelsByIdList(selectedPanelGroup.panelIds);
    panelList.forEach(p => p.boundingBox = calculatePanelBoundingBox(p));
    panelList.forEach(p => p.textBox = calculatePanelTextBox(p));
}