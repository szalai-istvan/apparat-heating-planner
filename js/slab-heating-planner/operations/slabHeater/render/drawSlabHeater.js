/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtőt
 * 
 * @param {SlabHeater} slabHeater födémfűtő
 * @returns {undefined}
 */
function drawSlabHeater(slabHeater) {
    const group = getSlabHeaterGroupById(slabHeater.groupId);

    const ratio = pixelsPerMetersRatio;
    const color = group.color;
    const width = group.width * ratio;
    const length = group.length * ratio;
    const tubeDistance = roundNumber(TUBE_DISTANCE_IN_METER * ratio, 2);
    const alignment = group.alignment;
    const centerPosition = slabHeater.centerPosition;
    const diameter = tubeDistance;
    const lineWeight = slabHeater.lineWeight;
    const type = group.type;
    const textSizePixels = slabHeater.textSize;
    const rectWidth = slabHeater.rectWidth;
    const rectHeight = slabHeater.rectHeight;
    const isSelected = group.isSelected;
    const lengthFrom = - length / 2;
    const lengthTo = length / 2;
    const p = SLAB_HEATER_TEXT_POP_FACTOR;
    const pointIsInsideRect = mouseCursorIsInsideMembersTextbox(group);
    const notDragging = !group.isSelectedForDrag;
    const stopThreshold = SLAB_HEATER_STOP_DRAWING_THRESHOLD_IN_METERS * ratio;

    if (!centerPosition) {
        return;
    }

    push();

    translate(centerPosition.x, centerPosition.y);
    rotate(alignment * 90);

    strokeWeight(lineWeight);
    noFill();

    let tube = roundNumber(- width / 2 + tubeDistance / 2, 2);
    let angles = [270, 90];
    let arcX = lengthTo;
    stroke(color);
    const limit = roundNumber(-1 * tube, 2);

    let i = 0;
    while (Math.abs(tube - limit) > stopThreshold) {
        line(lengthFrom, tube, lengthTo, tube);
        arc(arcX, tube + tubeDistance / 2, diameter, diameter, angles[0], angles[1]);

        angles = [angles[1], angles[0]];
        arcX *= -1;
        tube = roundNumber(tube + tubeDistance, 2);
    }
    line(lengthFrom, tube, lengthTo, tube);

    textAlign(CENTER, CENTER);


    textSize(textSizePixels * (1 + p * isSelected + p * (pointIsInsideRect * notDragging)));
    stroke(BLACK);
    fill(WHITE);
    rectMode(CENTER);
    rect(0, 0, rectWidth, rectHeight);

    if (isSelected || (pointIsInsideRect && notDragging)) {
        fill(SELECTED_TEXT_COLOR);
    } else {
        fill(DEFAULT_TEXT_COLOR);
    }
    noStroke();

    if (alignment > 1) {
        rotate(180);
    }
    text(type, 0, 0);

    pop();
}