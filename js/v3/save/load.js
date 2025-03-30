function loadProjectState() {
    return JSON.parse(localStorage.getItem('rajzolator-project-save'));
}

function loadProject() {
    const projectState = loadProjectState();
    if (!projectState) {
        return;
    }

    blueprintContext.clearBlueprints();
    projectState.blueprints.forEach(bp => blueprintContext.createBlueprint(loadImage(bp)));

    const topLeftCoordinates = projectState.topLeft;
    for (let i = 0; i < topLeftCoordinates.length; i++) {
        blueprintContext.blueprints[i].topLeftPosition = topLeftCoordinates[i];
    }

    scaleContext.pixelsPerMetersRatio = projectState.pixelsPerMeterRatio;
    if (scaleContext.pixelsPerMetersRatio) {
        setTimeout(() => tooltip.scalingFinished(), 3_000);
    }

    roomContext.rooms = projectState.rooms;
    projectState.rooms.forEach(room => room.constructor = {name: 'Room'});
    projectState.rooms.forEach(room => renderer.register(room));
    if (roomContext.rooms.length) {
        setTimeout(() => tooltip.roomAddingFinished(), 3_000);
    }

    const seir = projectState.rooms.map(r => r.structureElementsInRoom);
    seir.forEach(s => s.constructor = {name: 'StructureElementsInRoom'});
    seir.forEach(s => renderer.register(s));
    
    let panels = setupAndGetPanels(projectState);
    
    panelContext.panels = panels;
    panels.forEach(panel => panel.constructor = {name: 'Panel'});
    panels.forEach(panel => renderer.register(panel));
    if (panelContext.panels.length) {
        setTimeout(() => tooltip.panelAdded(), 3_000);
    }
    
    seir.forEach(s => StructureElementManager.recalculateBeams(s));
    seir.forEach(s => StructureElementManager.setAlignment(s, s.alignment));
    selectionContext.lastSelectingContext = panelContext;

    screenContext.sumDrag = projectState.sumDrag;
    screenContext.zoom = projectState.zoom;
}

function setupAndGetPanels(projectState) {
    const panels = [];
    const rooms = projectState.rooms;
    for (let room of rooms) {
        const seir = room.structureElementsInRoom;
        for (let panel of seir.panels) {
            panel.room = room;
            panels.push(panel);
        }
    }
    return panels;
}