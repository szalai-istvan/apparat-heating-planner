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
    const referenceCenter = panelGroup.isSelectedForDrag ? getClosestGridPointToCursor() : referencePanel.centerPosition;

    const verticalAlignment = panelGroup.alignment % 2 === 1;
    const sumOffset = offset * panelGroup.widthInPixels;
    
    let centerPoint = createPoint(referenceCenter.x + verticalAlignment * sumOffset, referenceCenter.y + !verticalAlignment * sumOffset);
    centerPoint = getClosestGridPoint(addPoints([centerPoint, corrector]));
    
    panel.centerPosition = centerPoint;
    panel.boundingBox = calculatePanelBoundingBox(panel);
    panel.textBox = calculatePanelTextBox(panel);
}