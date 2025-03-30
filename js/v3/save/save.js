function getProjectState() {
    return {
        blueprints: blueprintContext.blueprints.map(bp => bp.data.canvas.toDataURL("image/png")),
        topLeft: blueprintContext.blueprints.map(bp => bp.topLeftPosition),
        pixelsPerMeterRatio: scaleContext.pixelsPerMetersRatio,
        rooms: roomContext.rooms.filter(room => RoomManager.roomIsConfigured(room)).map(withSaveablePanels),
        sumDrag: screenContext.sumDrag,
        zoom: screenContext.zoom
    };
}

function saveProject() {
    const state = getProjectState();
    const stateStr = JSON.stringify(state);
    roomContext.setupRoomsInPanels();
    localStorage.setItem('rajzolator-project-save', stateStr);
    console.log('Project state saved to local storage');
}

function withSaveablePanels(room) {
    room.structureElementsInRoom.panels.forEach(p => p.room = null);
    return room;
}

setInterval(saveProject, 10_000);