/**
 * Törli a projektben található összes födémfűtő panel csoportot
 * 
 * @returns {undefined}
 */
function clearSlabHeaterGroups() {
    elementStore.slabHeaterGroups = [];
    elementStore.slabHeaterGroupsById = {};
    elementStore.slabHeaters = [];
    elementStore.slabHeatersById = {};

    selectedSlabHeaterGroup = null;
}