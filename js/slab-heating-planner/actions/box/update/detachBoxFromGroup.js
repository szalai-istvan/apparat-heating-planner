
/**
 * Leválasztja a paraméterül kapott dobozt a csoportról
 * 
 * @param {Box} box
 * @returns {undefined}
 */
function detachBoxFromGroup(box) {
    checkClass(box, CLASS_BOX);

    const boxGroup = selectedBoxGroup;
    if (!boxGroup) {
        return;
    }

    boxGroup.boxIds = boxGroup.boxIds.filter(b => b !== box.id);
    box.groupId = null;
}