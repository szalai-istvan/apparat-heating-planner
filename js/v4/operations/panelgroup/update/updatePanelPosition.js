/**
 * Újrakalkulálja a kiválasztott fűtőelem koordinátáit.
 * 
 * @param {PanelGroup} panelGroup 
 * @param {Panel} panel 
 * @param {Number} index 
 * @param {Number} clickedMemberIndex 
 * @param {Point} corrector
 */
function updatePanelPosition(panelGroup, panel, index, clickedMemberIndex, corrector) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);
    checkClass(panel, CLASS_PANEL);
    checkClass(index, CLASS_NUMBER);
    checkClass(clickedMemberIndex, CLASS_NUMBER, true);

    clickedMemberIndex = clickedMemberIndex || 0;
    const offset = index - (clickedMemberIndex);
    const referencePanel = getPanelById(panelGroup.panelIds[clickedMemberIndex]);
    const referenceCenter = panelGroup.isSelectedForDrag ? getMousePositionAbsolute() : referencePanel.centerPosition;

    const angleRad = toRadians(((panelGroup.alignment + 1) % 2) * 90 + panelGroup.angleDeg);
    const sumOffset = offset * panelGroup.widthInPixels;
    const sumOffsetVector = multiplyPoint(createUnitVector(angleRad), sumOffset);

    let centerPoint = createPoint(referenceCenter.x + sumOffsetVector.x, referenceCenter.y + sumOffsetVector.y);
    centerPoint = addPoints([centerPoint, corrector]);

    const room = getRoomById(panelGroup.roomId);
    panel.centerPosition = getClosestRoomGridPoint(centerPoint, room);
    panel.boundingBox = calculatePanelBoundingBox(panel);
    panel.textBox = calculatePanelTextBox(panel);
}