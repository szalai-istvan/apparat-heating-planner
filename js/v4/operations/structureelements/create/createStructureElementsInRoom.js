/**
 * Létrehoz egy szerkezeti elem definíciót a szobához és visszaadja.
 * 
 * @param {Room} room 
 * @returns {StructureElements} a létrehozott szerkezeti elemek
 */
function createStructureElements(room) {
    checkClass(room, CLASS_ROOM);

    const structureElements = new StructureElements(room);
    elementStore.register(structureElements);
    return structureElements;
}