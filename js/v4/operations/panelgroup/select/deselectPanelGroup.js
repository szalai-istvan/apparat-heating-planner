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
    
    const room = getRoomById(selectedPanelGroup.roomId);
    if (!panelGroupAlignmentIsValid(room, panelGroup)) {
        displayMessage('Egymásra merőleges panelek nem lehetnek egy szobában!');
        return false;
    }

    updatePanelGroupBoundingBoxIncludingMembers(selectedPanelGroup);
    recalculateBeamDefinitions(room);
    
    selectedPanelGroup.isSelected = false;
    selectedPanelGroup.isSelectedForDrag = false;
    selectedPanelGroup = null;

    return true;
}