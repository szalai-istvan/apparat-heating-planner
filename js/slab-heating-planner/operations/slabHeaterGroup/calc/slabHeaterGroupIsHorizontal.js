/**
 * Megállapítja, hogy egy paraméterül kapott födémfűtő csoport vízszintes irányú-e
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup a csoport paraméter
 * @returns {boolean}
 */
function slabHeaterGroupIsHorizontal(slabHeaterGroup) {
    return slabHeaterGroup.alignment % 2 === 1;
}