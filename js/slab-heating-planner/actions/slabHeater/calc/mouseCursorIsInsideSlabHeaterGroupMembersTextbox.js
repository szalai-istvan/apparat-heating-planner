/**
 * Megállapítja, hogy a kurzor a paraméterül kapott födémfűtő csoport valamely tagjának szövegdobozában található-e.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup, födémfűtő csoport 
 * @returns {boolean} true, ha valamely tag szövegdobozában található a kurzor
 */
function mouseCursorIsInsideSlabHeaterGroupMembersTextbox(slabHeaterGroup) {
    if (slabHeaterGroup.cursorIsInsideCache === null) {
        const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
        const selectable = slabHeaters.filter(p => mouseCursorIsInsideSlabHeatersTextbox(p));
        slabHeaterGroup.cursorIsInsideCache = selectable.length > 0;
    }

    return slabHeaterGroup.cursorIsInsideCache;
}