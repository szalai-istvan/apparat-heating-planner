/**
 * Megkíséreli megszüntetni a födémfűtő csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectSlabHeaterGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;

    if (!slabHeaterGroup) {
        return true;
    }

    const destinationRoom = validateSlabHeaterGroupPositionAndGetContainingRoom(slabHeaterGroup);
    if (!destinationRoom) {
        return false;
    }

    const pipeDriver = getPipeDriverById(slabHeaterGroup.pipeDriverId);
    if (pipeDriver) {
        removeUnnecessaryPointsOfPipeDriver(pipeDriver);
    }

    slabHeaterGroup.roomId = destinationRoom.id;
    
    slabHeaterGroup.isSelected = false;
    slabHeaterGroup.isSelectedForDrag = false;
    slabHeaterGroup.clickedMemberIndex = null;
    
    selectedSlabHeaterGroup = null;
    cachedSelectableSlabHeaterGroup = null;
    
    return true;
}