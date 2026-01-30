/**
 * Felrajzolja a képernyőre a paraméterül kapott doboz csoportot
 * 
 * @param {BoxGroup} boxGroup
 * @returns {undefined} 
 */
function drawBoxGroup(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);

    if (boxGroup.isSelectedForDrag) {
        updateBoxGroupMemberPosition(boxGroup);
        updateBoxGroupPipeDriverEndNodePosition(boxGroup);
        if (boxGroup.pipeDriverId) {
            const pipeDriver = getPipeDriverById(boxGroup.pipeDriverId);
            adjustLastPointOfPipeDriver(pipeDriver, boxGroup);
            calculatePipes(pipeDriver);
        }
    }

    getBoxesByIdList(boxGroup.boxIds).forEach(b => drawBox(b));

    const pipeDriverEndNode = boxGroup.pipeDriverEndNodeCoordinates;
    if (!pipeDriverEndNode) {
        return;
    }
    const diameter = pipeDriverDiameterInPixels;

    push();
    ellipseMode(CENTER);
    stroke(BLACK);
    fill(WHITE);
    strokeWeight(pipeDriverThicknessInPixels);
    ellipse(pipeDriverEndNode.x, pipeDriverEndNode.y, diameter, diameter);
    pop();
}