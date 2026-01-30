/**
 * Újraszámolja a paraméterül kapott dobozcsoport csővezető végződés koordinátáit
 * 
 * @param {BoxGroup} boxGroup 
 */
function updateBoxGroupPipeDriverEndNodePosition(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);

    const boxes = getBoxesByIdList(boxGroup.boxIds);
    const firstBox = boxes[0];
    const firstCenterPoint = firstBox.centerPosition;

    if (!firstBox || !firstCenterPoint) {
        return undefined;
    }

    const width = boxWidthInPixels;
    const length = boxLengthInPixels;
    const additionalOffset = pipeDriverAdditionalOffsetBGInPixels;
    const widthOffset = (boxes.length - 1) * width / 2;
    const lengthOffset = length / 2 + additionalOffset;

    if (boxGroup.alignment % 2 === 1) {
        const factor = Math.sign(boxGroup.alignment - 2);
        boxGroup.pipeDriverEndNodeCoordinates = createPoint(firstCenterPoint.x + factor * lengthOffset, firstCenterPoint.y + widthOffset);
    } else {
        const factor = Math.sign(boxGroup.alignment - 1);
        boxGroup.pipeDriverEndNodeCoordinates = createPoint(firstCenterPoint.x + widthOffset, firstCenterPoint.y + factor * lengthOffset);
    }
}