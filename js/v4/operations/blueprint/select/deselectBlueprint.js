/**
 * Megszűnteti a kiválasztott tervrajz kijelöltségét.
 * 
 * @returns {boolean} true, ha a megszűntetés sikeres
 */
function deselectBlueprint() {
    selectedBlueprint.isSelected = false;
    selectedBlueprint = null;
    return true;
}