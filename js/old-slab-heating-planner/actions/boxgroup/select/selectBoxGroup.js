/** @type {BoxGroup} */
let selectedBoxGroup = null;
/** @type {BoxGroup} */
let cachedSelectableBoxGroup = null;

/**
 * Megkeresi és visszaadja a kiválasztható dobozcsoportot.
 * 
 * @returns {BoxGroup}
 */
function searchForSelectableBoxGroup() {
    const selectedBoxGroup = selectBoxGroup();
    if (selectedBoxGroup) {
        selectedObject = selectedBoxGroup;
        return selectedBoxGroup;
    }
}

/**
 * Megkeresi és kiválasztja a doboz csoportot és visszaadja
 * 
 * @param {BoxGroup} boxGroup Opcionális paraméter, specifikálható a kiválasztandó csoport.
 * @returns {BoxGroup} a kiválasztott csoport.
 */
function selectBoxGroup(boxGroup = undefined) {
    checkClass(boxGroup, CLASS_BOX_GROUP, true);

    boxGroup = boxGroup || checkForSelectableBoxGroup();
    if (!boxGroup) {
        return;
    }

    if (boxGroup === selectedBoxGroup) {
        boxGroup.isSelected = true;
        boxGroup.isSelectedForDrag = true;
        setSelectedBoxGroupIndex(boxGroup);
        resetPipeDriverIfOnlyHas2Points(getPipeDriverById(boxGroup.pipeDriverId));
        return boxGroup;
    }

    if (deselectObject()) {
        boxGroup.isSelected = true;
        selectedBoxGroup = boxGroup;
        return boxGroup;
    }
    return undefined;
}

/**
 * Megkeresi a kiválasztható elosztódoboz csoportot és visszaadja
 * 
 * @returns {BoxGroup} a kiválasztható elosztódoboz csoport.
 */
function checkForSelectableBoxGroup() {
    if (cachedSelectableBoxGroup) {
        return cachedSelectableBoxGroup;
    }

    const selection = elementStore.boxGroups.filter(bg => mouseCursorIsInsideBoxGroupMember(bg));
    const boxGroup = selection[0];
    if (boxGroup) {
        cachedSelectableBoxGroup = boxGroup;
        return boxGroup;
    }
    return undefined;
}

function setSelectedBoxGroupIndex(boxGroup) {
    const boxes = getBoxesByIdList(boxGroup.boxIds);
    const clickedBox = boxes.filter(b => mouseCursorIsInsideBox(b))[0];
    const index = boxes.indexOf(clickedBox);
    boxGroup.clickedMemberIndex = index;
}