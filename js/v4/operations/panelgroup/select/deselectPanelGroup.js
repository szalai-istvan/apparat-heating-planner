/**
 * Megszűnteti a panelcsoport kijelölését
 * 
 * @returns {undefined}
 */
function deselectPanelGroup() {
    if (!selectPanelGroup) {
        return true;
    }

    // todo validáció

    
    selectedPanelGroup.boundingBox = calculatePanelGroupBoundingBox(selectedPanelGroup);
    const panelList = getPanelsByIdList(selectedPanelGroup.panelIds);
    panelList.forEach(p => p.boundingBox = calculatePanelBoundingBox(p));
    panelList.forEach(p => p.textBox = calculatePanelTextBox(p));
    
    selectedPanelGroup.isSelected = false;
    selectedPanelGroup.isSelectedForDrag = false;
    selectedPanelGroup = null;

    return true;
}