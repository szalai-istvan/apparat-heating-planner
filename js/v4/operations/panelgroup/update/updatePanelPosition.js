/**
 * Újrakalkulálja a kiválasztott fűtőelem koordinátáit.
 * 
 * @param {PanelGroup} panelGroup 
 * @param {Panel} panel 
 * @param {Number} index 
 * @param {Number} clickedMemberIndex 
 */
function updatePanelPosition(panelGroup, panel, index, clickedMemberIndex) {
    checkClass(panelGroup, CLASS_PANEL_GROUP);
    checkClass(panel, CLASS_PANEL);
    checkClass(index, CLASS_NUMBER);
    checkClass(clickedMemberIndex, CLASS_NUMBER);

    const offset = index - clickedMemberIndex;
    const referencePanel = getPanelById(panelGroup.panelIds[clickedMemberIndex]);
    const referenceCenter = panelGroup.isSelectedForDrag ? getClosestGridPointToCursorsCorrectedPosition() : referencePanel.centerPosition;
    panel.centerPosition = createPoint(referenceCenter.x, referenceCenter.y + offset * panelGroup.widthInPixels);
    panel.boundingBox = calculatePanelBoundingBox(panel);
    panel.textBox = calculatePanelTextBox(panel);
}