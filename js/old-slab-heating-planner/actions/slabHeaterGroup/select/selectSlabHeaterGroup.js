/** @type {SlabHeaterGroup} */
let selectedSlabHeaterGroup = null;
/** @type {SlabHeaterGroup} */
let cachedSelectableSlabHeaterGroup = null;

/**
 * Megkeresi és visszaadja a kiválasztható födémfűtő csoportot.
 * 
 * @returns {SlabHeaterGroup}
 */
function searchForSelectableSlabHeaterGroup() {
    const selectedSlabHeaterGroup = selectSlabHeaterGroup();
    if (selectedSlabHeaterGroup) {
        selectedObject = selectedSlabHeaterGroup;
        return selectedSlabHeaterGroup;
    }
}

/**
 * Megkeresi és kiválasztja a födémfűtő csoportot és visszaadja
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup Opcionális paraméter, specifikálható a kiválasztandó födémfűtő csoport.
 * @returns {SlabHeaterGroup} a kiválasztott födémfűtő csoport.
 */
function selectSlabHeaterGroup(slabHeaterGroup = undefined) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP, true);

    slabHeaterGroup = slabHeaterGroup || checkForSelectableSlabHeaterGroup();
    if (!slabHeaterGroup) {
        return;
    }

    if (slabHeaterGroup === selectedSlabHeaterGroup) {
        slabHeaterGroup.isSelected = true;
        slabHeaterGroup.isSelectedForDrag = true;
        setSelectedSlabHeaterGroupIndex(slabHeaterGroup);
        resetPipeDriverIfOnlyHas2Points(getPipeDriverById(slabHeaterGroup.pipeDriverId));
        return slabHeaterGroup;
    }

    if (deselectObject()) {
        slabHeaterGroup.isSelected = true;
        selectedSlabHeaterGroup = slabHeaterGroup;
        setOptionBarValues(slabHeaterGroup);
        return slabHeaterGroup;
    }
    return undefined;
}

/**
 * Megkeresi a kiválasztható födémfűtő csoportot és visszaadja
 * 
 * @returns {SlabHeaterGroup} a kiválasztható födémfűtő csoport.
 */
function checkForSelectableSlabHeaterGroup() {
    if (cachedSelectableSlabHeaterGroup) {
        return cachedSelectableSlabHeaterGroup;
    }

    const selection = elementStore.slabHeaterGroups.filter(shg => mouseCursorIsInsideMembersTextbox(shg));
    const slabHeaterGroup = selection[0];
    if (slabHeaterGroup) {
        cachedSelectableSlabHeaterGroup = slabHeaterGroup;
        return slabHeaterGroup;
    }
    return undefined;
}

function setOptionBarValues(slabHeaterGroup) {
    const optionBarW = slabHeaterWidthOptionsBar;
    const optionBarL = slabHeaterLengthOptionsBar;

    optionBarW.setValue(0, slabHeaterGroup.width.toString(), false);
    const meter = Math.floor(slabHeaterGroup.length).toString();
    const cm = (Math.floor(roundNumber(slabHeaterGroup.length - Math.floor(slabHeaterGroup.length), 2) * 100)).toString();
    optionBarL.setValue(0, meter, false);
    optionBarL.setValue(1, cm, false);
}

function setSelectedSlabHeaterGroupIndex(slabHeaterGroup) {
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    const clickedSlabHeater = slabHeaters.filter(sh => mouseCursorIsInsideSlabHeatersTextbox(sh))[0];
    const index = slabHeaters.indexOf(clickedSlabHeater);
    slabHeaterGroup.clickedMemberIndex = index;
}