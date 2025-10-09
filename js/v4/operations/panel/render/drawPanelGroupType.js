/** 
 * Felrajzolja a képernyőre a panelcsoport típusát
 * 
 * @param {PanelGroup} group 
 * 
 */
function drawPanelGroupType(group) {
    const panels = getPanelsByIdList(group.panelIds);
    panels.forEach(p => drawPanelType(p, group));
}

function drawPanelType(panel, group) {
    const ratio = pixelsPerMetersRatio;
    const length = group.lengthInPixels;
    const width = group.widthInPixels;
    const centerCoordinates = panel.centerPosition;
    const alignment = group.alignment;
    const type = group.type;

    push();

    rectMode(CENTER);
    translate(centerCoordinates.x, centerCoordinates.y);
    rotate((alignment % 2) * 90 + group.angleDeg);
    strokeWeight(panelLineWeight);
    stroke(BLACK);
    fill(PANEL_FILL_COLOR);
    const sizeMultiplier = group.type === F100 ? 0.7 : 1;
    rect(0, 0, sizeMultiplier * panelTextBoxWidth, sizeMultiplier * panelTextBoxHeight);

    const pointIsInsideTextBox = mouseCursorIsInsidePanelsTextbox(panel);
    if (pointIsInsideTextBox) {
        fill(SELECTED_TEXT_COLOR);
    } else {
        fill(DEFAULT_TEXT_COLOR);
    }

    const p = PANEL_TEXT_POP_FACTOR;
    textSize(sizeMultiplier * panelTextSize * (1 + p * group.isSelected + p * pointIsInsideTextBox));
    textAlign(CENTER, CENTER);
    noStroke();
    text(group.type, 0, 0);

    pop();
}