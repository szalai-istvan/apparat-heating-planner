/**
 * Újrakalkulálja egy paraméterül kapott dobozcsoport tagjainak pozícióját.
 * 
 * @param {BoxGroup} boxGroup
 * @returns {undefined}
 */
function updateBoxGroupMemberPosition(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);

    const boxes = getBoxesByIdList(boxGroup.boxIds);
    const first = boxes[0];
    const width = BOX_WIDTH_IN_METERS;
    const length = BOX_LENGTH_IN_METERS * pixelsPerMetersRatio;
    const firstCenterPosition = boxGroup.isSelectedForDrag ? calculateBoxCenterPositionWithCorrection(first) : first.centerPosition;

    for (let index = 0; index < boxes.length; index++) {
        boxes[index].centerPosition = offsetBoxCenterPosition({
            originalCenter: firstCenterPosition,
            width: width,
            alignment: boxGroup.alignment,
            index: index - (boxGroup.clickedMemberIndex || 0)
        });
    }
}