/**
 * Elforgatja a kiválasztott doboz csoportot a megadott irányba
 * 
 * @param {Number} direction 
 * @returns {undefined}
 */
function rotateSelectedBoxGroup(direction) {
    checkClass(direction, CLASS_NUMBER);

    const group = selectedBoxGroup;
    if (!group) {
        return;
    }

    group.alignment = (group.alignment + Math.sign(direction)) % 4;
    while (group.alignment < 0) {
        group.alignment += 4;
    }

    updateBoxGroupPipeDriverEndNodePosition(group);
    updateBoxGroupMemberPosition(group);
    resetPipeDriver(getPipeDriverById(group.pipeDriverId));
}