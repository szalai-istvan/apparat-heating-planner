/**
 * Létrehoz és visszaad egy födémfűtő panel objektumot
 * 
 * @param {boolean} addToGroup flag, hogy meglévő csoporthoz adjuk-e hozzá
 * @returns {SlabHeater} a létrehozott födémfűtő
 */
function createSlabHeater(addToGroup) {
    const slabHeater = new SlabHeater();    
    if (addToGroup) {
        attachToSelectedSlabHeaterGroup(slabHeater);
        selectedSlabHeaterGroup.boundingBox = calculateSlabHeaterGroupBoundingBox(selectedSlabHeaterGroup);
    }

    return slabHeater;
}