/**
 * Kiüríti a kiválasztásra cachelt doboz csoportot
 * 
 * @param {BoxGroup} boxGroup doboz csoport paraméter
 * @returns {undefined}
 */
function clearBoxGroupSelectionCache(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);
    boxGroup.cursorIsInsideCache = null;
    getBoxesByIdList(boxGroup.boxIds).forEach(b => b.cursorIsInsideCache = null);
}