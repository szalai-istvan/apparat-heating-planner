/**
 * Megállapítja, hogy vízszintes-e a paraméterül kapott dobozcsoport irányultsága
 * 
 * @param {BoxGroup} boxGroup dobozcsoport paraméter
 * @returns {boolean} true, ha vízszintes
 */
function boxGroupIsHorizontal(boxGroup) {
    return boxGroup.alignment % 2 === 1;
}