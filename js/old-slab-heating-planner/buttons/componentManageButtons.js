var rotateLeftButton;
var rotateRightButton;
var deleteButton;
var addToGroupButton;
var removeFromGroupButton;

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