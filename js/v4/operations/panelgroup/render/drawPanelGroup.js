/**
 * Felrajzolja a képernyőre a megadott panelcsoportot.
 * 
 * @param {PanelGroup} panelGroup, panelcsoport
 * @returns {undefined}
 */
function drawPanelGroup(panelGroup) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);

    panelGroup.boundingBox = calculatePanelGroupBoundingBox(panelGroup);
    panelGroup.boundingBoxIncludingPipes = calculatePanelGroupBoundingBoxIncludingPipes(panelGroup);
    if (panelGroup.isSelectedForDrag) {
        const containingRoom = getContainingRoom(panelGroup);
        panelGroup.roomId = containingRoom ? containingRoom.id : undefined;
        panelGroup.angleDeg = containingRoom ? toDegrees(containingRoom.angleRad) : 0.00;
        
        updatePositionsOfAllMembers(panelGroup);
    }

    const panels = getPanelsByIdList(panelGroup.panelIds);
    panels.forEach(p => drawPanel(p));
}