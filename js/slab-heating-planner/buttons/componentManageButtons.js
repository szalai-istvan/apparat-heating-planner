var rotateLeftButton;
var rotateRightButton;
var deleteButton;
var addToGroupButton;
var removeFromGroupButton;

/**
 * Elforgatja a kiválasztott objektumot a megadott irányba
 * 
 * @param {Number} direction
 * @returns {undefined}
 */
function rotateSelectedObjectSlabHeatingPlanner(direction) {
    if (selectedSlabHeaterGroup) {
        rotateSelectedSlabHeaterGroup(direction);
    } else if (selectedBoxGroup) {
        rotateSelectedBoxGroup(-1 * direction);
    }
}

function addToSelectedGroup() {
    if (selectedSlabHeaterGroup) {
        addSlabHeaterToSelectedGroup();
    } else if (selectedBoxGroup) {
        addBoxToSelectedGroup();
    }
}

function removeLastFromSelectedGroup() {
    if (selectedSlabHeaterGroup) {
        removeLastSlabHeaterFromSelectedGroup();
    } else if (selectBoxGroup) {
        removeLastBoxFromSelectedGroup();
    }
}