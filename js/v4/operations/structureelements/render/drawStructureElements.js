/**
 * Felrajzol a képernyőre egy szobányi tartószerkezetet.
 * 
 * @param {StructureElements} structureElements 
 * @returns {undefined}
 */
function drawStructureElements(structureElements) {
    checkClass(structureElements, CLASS_STRUCTURE_ELEMENTS);

    const room = getRoomById(structureElements.roomId);
    if (!room || !room.firstPoint) {
        return;
    }

    push();

    translate(room.firstPoint.x, room.firstPoint.y);
    rotate(toDegrees(room.angleRad));
    rectMode(CENTER);
    stroke(BLACK);
    strokeWeight(beamLineWidthPixel);
    textAlign(CENTER, CENTER);
    fill(BEAM_COLOR);

    let horizontalBeams;
    let verticalBeams;

    if (structureElements.alignment % 2 === 0) {
        horizontalBeams = structureElements.alignedBeams;
        verticalBeams = structureElements.crossBeams;
    } else {
        horizontalBeams = structureElements.crossBeams;
        verticalBeams = structureElements.alignedBeams;
    }

    for (let beam of horizontalBeams) {
        rect(beam.middlePoint.x, beam.middlePoint.y, beam.length, beamWidthPixel);
        drawBeamNames(beam);
    }

    for (let beam of verticalBeams) {
        rect(beam.middlePoint.x, beam.middlePoint.y, beamWidthPixel, beam.length);
        drawBeamNames(beam, HALF_PI);
    }

    pop();
}

/** @param {Line} beam */
function drawBeamNames(beam, rotateRad = 0) {
    const middlePoint = rotatePoint(beam.middlePoint, -rotateRad);
    const leftPoint = rotatePoint(beam.leftPoint, -rotateRad);
    const rightPoint = rotatePoint(beam.rightPoint, -rotateRad);

    push();

    textSize(beamTextSize);
    noStroke();
    fill(BLACK);
    rotate(toDegrees(rotateRad));
    text(CD_30_60_BEAM_TYPE, leftPoint.x, leftPoint.y);
    text(CD_30_60_BEAM_TYPE, middlePoint.x, middlePoint.y);
    text(CD_30_60_BEAM_TYPE, rightPoint.x, rightPoint.y);

    pop();
}