/**
 * Szoba létrehozása utáni művelet.
 * 
 * @param {Room} room szoba
 * @returns {undefined}
 */
function onRoomIsCreatedHeatingPlanner(room) {
    const structureElements = new StructureElements(room);
    room.structureElementsId = structureElements.id;
    elementStore.register(room);
    elementStore.register(structureElements);
}

onRoomIsCreated(onRoomIsCreatedHeatingPlanner);