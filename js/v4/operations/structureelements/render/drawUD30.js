/**
 * Felrajzolja a képernyőre az UD30 gerendákat
 * 
 * @param {StructureElements} structureElements 
 * @returns {undefined}
 */
function drawUd30(structureElements) {
    checkClass(structureElements, CLASS_STRUCTURE_ELEMENTS);

    const room = getRoomById(structureElements.roomId);
    if (!room || !room.firstPoint) {
        return;
    }
    const ud30Beams = structureElements.ud30Beams;
    if (ud30Beams.length === 0) {
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

    rect(ud30Beams[0].middlePoint.x, ud30Beams[0].middlePoint.y, beamWidthPixel, ud30Beams[0].length);
    drawUD30BeamNames(ud30Beams[0], HALF_PI);
    rect(ud30Beams[1].middlePoint.x, ud30Beams[1].middlePoint.y, ud30Beams[1].length, beamWidthPixel);
    drawUD30BeamNames(ud30Beams[1]);
    rect(ud30Beams[2].middlePoint.x, ud30Beams[2].middlePoint.y, beamWidthPixel, ud30Beams[2].length);
    drawUD30BeamNames(ud30Beams[2], HALF_PI);
    rect(ud30Beams[3].middlePoint.x, ud30Beams[3].middlePoint.y, ud30Beams[3].length, beamWidthPixel);
    drawUD30BeamNames(ud30Beams[3]);

    pop();
}


/** @param {Line} beam */
function drawUD30BeamNames(beam, rotateRad = 0) {
    const middlePoint = rotatePoint(beam.middlePoint, -rotateRad);
    const leftPoint = rotatePoint(beam.leftPoint, -rotateRad);
    const rightPoint = rotatePoint(beam.rightPoint, -rotateRad);

    push();

    textSize(beamTextSize);
    noStroke();
    fill(BLACK);
    rotate(toDegrees(rotateRad));
    text(UD_30_BEAM_TYPE, leftPoint.x, leftPoint.y);
    text(UD_30_BEAM_TYPE, rightPoint.x, rightPoint.y);
    if (calculateLengthOfLineInMeters(beam) > 1) {
        text(UD_30_BEAM_TYPE, middlePoint.x, middlePoint.y);
    }

    pop();
}