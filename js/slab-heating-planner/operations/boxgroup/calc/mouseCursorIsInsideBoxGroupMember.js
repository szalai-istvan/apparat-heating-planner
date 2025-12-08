/**
 * Megállapítja, hogy a kurzor a paraméterül kapott doboz csoport valamely tagjában található-e
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {boolean}
 */
function mouseCursorIsInsideBoxGroupMember(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);

    if (boxGroup.cursorIsInsideCache === null) {
        const boxes = getBoxesByIdList(boxGroup.boxIds);
        const selectable = boxes.filter(b => mouseCursorIsInsideBox(b));
        boxGroup.cursorIsInsideCache = selectable.length > 0;
    }

    return boxGroup.cursorIsInsideCache;
}
