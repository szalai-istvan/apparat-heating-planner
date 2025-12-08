/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    cachedSelectableRoom = null;
    cachedSelectableSlabHeaterGroup = null;
    cachedSelectableBoxGroup = null;
    cachedSelectablePipeDriver = null;

    elementStore.rooms.forEach(r => r.cursorIsInsideCache = null);
    elementStore.slabHeaterGroups.forEach(shg => clearSlabHeaterGroupSelectionCache(shg));
    elementStore.boxGroups.forEach(bg => clearBoxGroupSelectionCache(bg));
    elementStore.pipeDrivers.forEach(pd => clearPipeDriverSelectionCache(pd));
}