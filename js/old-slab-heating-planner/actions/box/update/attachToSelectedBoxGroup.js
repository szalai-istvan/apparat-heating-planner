/**
 * Hozzácsatolja a paraméterül kapott dobozt a kiválasztott csoporthoz
 * 
 * @param {Box} box doboz
 * @returns {undefined}
 */
function attachToSelectedBoxGroup(box) {
    checkClass(box, CLASS_BOX);

    const selectedGroup = selectedBoxGroup;
    if (!selectedGroup) {
        return;
    }

    box.groupId = selectedGroup.id;
    selectedGroup.boxIds.push(box.id);
}