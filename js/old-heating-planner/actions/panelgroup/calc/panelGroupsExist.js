/**
 * Megállapítja, hogy léteznek-e panel csoportok a projektben.
 * 
 * @returns {boolean} true, ha van felvéve legalább egy panelcsoport.
 */
function panelGroupsExist() {
    return elementStore.panelGroups.length > 0;
}