/**
 * Felrajzolja a paraméterül kapott dobozt a képernyőre
 * 
 * @param {Box} box
 * @returns {undefined}
 */
function drawBox(box) {
    checkClass(box, CLASS_BOX);

    const center = box.centerPosition;
    const boxGroup = getBoxGroupById(box.groupId);
    const alignment = boxGroup.alignment;
    const width = BOX_WIDTH_IN_METERS * pixelsPerMetersRatio;
    const length = BOX_LENGTH_IN_METERS * pixelsPerMetersRatio;
    const mouseIsInside = mouseCursorIsInsideBoxGroupMember(boxGroup);

    if (!center) {
        return;
    }

    push();

    translate(center.x, center.y);
    rotate(alignment * 90);
    rectMode(CENTER);
    if (mouseIsInside || boxGroup.isSelected) {
        stroke(RED);
    } else {
        stroke(BLACK);
    }
    strokeWeight(BOX_LINE_WEIGHT_IN_METERS * pixelsPerMetersRatio);

    fill(WHITE);
    rect(0, 0, width, length);

    pop();
}