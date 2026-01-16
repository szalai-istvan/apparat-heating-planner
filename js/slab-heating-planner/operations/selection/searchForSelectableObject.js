//Project-specific
/**
 * Megkeresi az első objektumot, amelyet ki lehet választani és visszaadja.
 * 
 * @returns {*} Kiválasztható objektum
 */
function searchSelectableObject() { //Project-specific
    const selectedRoom = selectRoom();
    if (selectedRoom) {
        selectedObject = selectedRoom;
        return selectedRoom;
    }

    const selectedSlabHeaterGroup = selectSlabHeaterGroup();
    if (selectedSlabHeaterGroup) {
        selectedObject = selectedSlabHeaterGroup;
        return selectedSlabHeaterGroup;
    }

    const selectedBoxGroup = selectBoxGroup();
    if (selectedBoxGroup) {
        selectedObject = selectedBoxGroup;
        return selectedBoxGroup;
    }

    const selectedPipeDriver = selectPipeDriver();
    if (selectedPipeDriver) {
        selectedObject = selectedPipeDriver;
        return selectedPipeDriver;
    }
}