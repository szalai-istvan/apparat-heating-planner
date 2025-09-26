/**
 * Megszűnteti a panelcsoport kijelölését
 * 
 * @returns {undefined}
 */
function deselectPanelGroup() {
    if (!selectedPanelGroup) {
        return true;
    }

    if (!selectedPanelGroup.roomId) {
        displayMessage('A panelcsoport része vagy egésze szobán kívülre esik!');
        return false;
    }

    updatePanelGroupBoundingBoxIncludingMembers(selectedPanelGroup);
    
    selectedPanelGroup.isSelected = false;
    selectedPanelGroup.isSelectedForDrag = false;
    selectedPanelGroup = null;

    return true;
}