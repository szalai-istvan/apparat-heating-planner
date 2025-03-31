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

function getProjectStateSize() {
    return roundNumber(JSON.stringify(getProjectState()).length / 1024 / 1024, 2) + ' MB';
}

function downloadProjectState() {
    const text = JSON.stringify(getProjectState());
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `APPARAT_project_${Math.random().toString().substring(2)}.json`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function saveProject() {
    const state = getProjectState();
    const stateStr = JSON.stringify(state);
    roomContext.setupRoomsInPanels();
    localStorage.setItem('rajzolator-project-save', stateStr);
}

function withSaveablePanels(room) {
    room.structureElementsInRoom.panels.forEach(p => p.room = null);
    return room;
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProject, 10_000);
}