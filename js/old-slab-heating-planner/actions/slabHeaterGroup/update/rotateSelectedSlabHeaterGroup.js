/**
 * Elforgatja a kiválasztott födémfűtő csoportot a megadott irányba
 * 
 * @param {Number} direction a forgatás iránya (>0 jobbra, <0 balra)
 * @param {boolean} pipeDriverReset kell-e reset-elni a csővezetőt (opcionális)
* @returns {undefined}
 */
function rotateSelectedSlabHeaterGroup(direction, pipeDriverReset = true) {
    checkClass(direction, CLASS_NUMBER);

    const group = selectedSlabHeaterGroup;
    if (!group) {
        return;
    }

    group.alignment = (group.alignment + Math.sign(direction)) % 4;
    while (group.alignment < 0) {
        group.alignment += 4;
    }
    cachedSlabHeaterGroupAlignment = selectedSlabHeaterGroup.alignment;

    const pipeDriver = getPipeDriverById(group.pipeDriverId);
    const firstPoint = calculatePipeDriverFirstPoint(group);
    updateSlabHeaterGroupMemberPosition(group);
    updatePipeDriverFirstPoint(pipeDriver, firstPoint);
    const newPositionIsValid = group.isSelectedForDrag || validateSlabHeaterGroupPositionAndGetContainingRoom(group);
    if (!newPositionIsValid) {
        displayMessage('A forgatás hatására a csoport egy része szobán kívülre kerülne! Helyezze át mielőtt elforgatja!');
        rotateSelectedSlabHeaterGroup(-1 * direction, false);
    } else if (pipeDriverReset) {
        resetPipeDriver(group.pipeDriver);
        group.boundingBox = calculateSlabHeaterGroupBoundingBox(group);
    }
}
