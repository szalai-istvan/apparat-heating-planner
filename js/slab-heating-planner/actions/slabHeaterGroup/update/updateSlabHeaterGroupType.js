/**
 * Újrakalkulálja a paraméterül kapott födémfűtő csoport típusát
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup paraméter
 * @returns {undefined}
 */
function updateSlabHeaterGroupType(slabHeaterGroup) {
    const width = slabHeaterGroup.width;
    const length = slabHeaterGroup.length;

    slabHeaterGroup.type = width.toString().replace('.', ',') + ' m x ' + length.toString().replace('.', ',') + ' m';
}