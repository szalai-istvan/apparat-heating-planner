/**
 * Kiüríti a kiválasztásra cachelt födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport paraméter
 * @returns {undefined}
 */
function clearSlabHeaterGroupSelectionCache(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);
    slabHeaterGroup.cursorIsInsideCache = null;
    getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds).forEach(sh => sh.cursorIsInsideCache = null);
}