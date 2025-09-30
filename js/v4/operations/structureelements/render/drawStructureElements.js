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

    for (let beam of structureElements.alignedBeams) {
        line(beam.p0.x, beam.p0.y, beam.p1.x, beam.p1.y);
    }

    for (let beam of structureElements.crossBeams) {
        line(beam.p0.x, beam.p0.y, beam.p1.x, beam.p1.y);
    }

    pop();
}