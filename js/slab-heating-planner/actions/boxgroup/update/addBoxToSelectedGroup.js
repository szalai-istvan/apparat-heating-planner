/**
 * Hozzáad egy dobozt a kiválasztott csoporthoz
 * 
 * @returns {undefined}
 */
function addBoxToSelectedGroup() {
    const selectedGroup = selectedBoxGroup;
    if (!selectedGroup) {
        return;
    }

    const nextPosition = nextBoxPosition(selectedGroup);
    const box = createBox(true);
    box.centerPosition = nextPosition;

    updateBoxGroupPipeDriverEndNodePosition(selectedGroup);
    resetPipeDriver(getPipeDriverById(selectedGroup.pipeDriverId));
}

function nextBoxPosition(group) {
    const boxes = getBoxesByIdList(group.boxIds);
    const lastBox = boxes[boxes.length - 1];
    const lastCenter = lastBox.centerPosition;
    const width = BOX_WIDTH_IN_METERS;
    const horizontal = boxGroupIsHorizontal(group);

    const x = lastCenter.x + (1 - horizontal) * width * pixelsPerMetersRatio;
    const y = lastCenter.y + horizontal * width * pixelsPerMetersRatio;
    return createPoint(x, y);
}