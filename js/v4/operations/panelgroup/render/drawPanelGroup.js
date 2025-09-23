/**
 * Felrajzolja a képernyőre a megadott panelcsoportot.
 * 
 * @param {PanelGroup} panelGroup, panelcsoport
 * @returns {undefined}
 */
function drawPanelGroup(panelGroup) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);

    panelGroup.boundingBox = calculatePanelGroupBoundingBox(panelGroup);
    const panels = getPanelsByIdList(panelGroup.panelIds);
    if (panelGroup.isSelectedForDrag) {
        const containingRoom = getContainingRoom(panelGroup);
        panelGroup.roomId = containingRoom ? containingRoom.id : undefined;
        panelGroup.angleDeg = containingRoom ? toDegrees(containingRoom.angleRad) : 0.00;

        let index = 0;
        while (index < panels.length) {
            const panel = panels[index];
            updatePanelPosition(panelGroup, panel, index, panelGroup.clickedMemberIndex || 0);
            index++;
        }
    }

    panels.forEach(p => drawPanel(p));
}