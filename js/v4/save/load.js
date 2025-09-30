var jsonInput = document.getElementById("jsonInput");

function uploadProject() {
    jsonInput.click();
}

function loadProject(text = undefined) {
    try {
        saveOrLoadInProgress = true;
        const projectState = text ? JSON.parse(text) : loadProjectStateFromLocalStorage();
        if (!projectState) {
            return;
        }

        let selectableObject = null;

        prepareLoading();
        selectableObject = selectableObject ?? loadBlueprints(projectState);
        loadScreenData(projectState);
        updateGridResolution();
        selectableObject = selectableObject ?? loadRooms(projectState);
        selectableObject = selectableObject ?? loadPanels(projectState);

        selectableObject && selectObject(selectableObject);
    } finally {
        saveOrLoadInProgress = false;
    }
}

function loadProjectStateFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
}

function handleJsonSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const result = event.target.result;
        if (result) {
            loadProject(result);
        }
        imageInput.value = "";
    };
    reader.readAsText(file);
}
jsonInput.addEventListener("change", handleJsonSelect);

function prepareLoading() {
    clearBlueprints();
}

function loadBlueprints(projectState) {
    (projectState.blueprints.data || []).forEach((bp) => createBlueprint(loadImage(bp)));

    const topLeftCoordinates = projectState.blueprints.topLeft;
    const centerCoordinates = projectState.blueprints.center;
    const angeleDeg = projectState.blueprints.angleDeg;
    for (let i = 0; i < topLeftCoordinates.length; i++) {
        elementStore.blueprints[i].topLeftPosition = topLeftCoordinates[i];
        elementStore.blueprints[i].centerPosition = centerCoordinates[i];
        elementStore.blueprints[i].angleDeg = angeleDeg[i];
    }

    return elementStore.blueprints.filter(bp => bp.isSelected)[0];
}

function loadScreenData(projectState) {
    pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;
    updateRenderSizeValues();

    screenSumDrag = projectState.screen.sumDrag;
    screenZoom = projectState.screen.zoom;

    if (projectState.grid.seed) {
        setGridSeed(createPoint(projectState.grid.seed.x, projectState.grid.seed.y));
    }
}

function loadRooms(projectState) {
    const rooms = projectState.rooms.rooms;
    rooms.forEach((room) => (room.constructor = { name: CLASS_ROOM }));
    rooms.forEach((room) => elementStore.register(room));

    const structureElements = projectState.structureElements.structureElements;
    structureElements.forEach((se) => (se.constructor = {name: CLASS_STRUCTURE_ELEMENTS}));
    structureElements.forEach((se) => elementStore.register(se));

    return rooms.filter(r => r.isSelected)[0];
}

function loadPanels(projectState) {
    const panels = projectState.panels.panels || [];
    for (let panel of panels) {
        panel.constructor = { name: CLASS_PANEL };
        elementStore.register(panel);
    }

    const panelGroups = projectState.panelGroups.panelGroups || [];
    for (let panelGroup of panelGroups) {
        panelGroup.constructor = { name: CLASS_PANEL_GROUP };
        elementStore.register(panelGroup);
    }

    return panelGroups.filter(pg => pg.isSelected)[0];
}