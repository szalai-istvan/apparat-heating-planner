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
    if (!panelGroupAlignmentIsValid(room, selectedPanelGroup)) {
        displayMessage('Egymásra merőleges panelek nem lehetnek egy szobában!');
        return false;
    }

    updatePanelGroupBoundingBoxIncludingMembers(selectedPanelGroup);
    
    selectedPanelGroup.isSelected = false;
    selectedPanelGroup.isSelectedForDrag = false;
    recalculateBeamDefinitions(room);
    selectedPanelGroup = null;


    return true;
}