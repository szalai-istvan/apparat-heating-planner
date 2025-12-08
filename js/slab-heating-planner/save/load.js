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
        loadBlueprints(projectState);
        loadScreenData(projectState);
        updateGridResolution();
        selectableObject = selectableObject | loadRooms(projectState);
        selectableObject = selectableObject | loadSlabHeaters(projectState);
        selectableObject = selectableObject | loadBoxes(projectState);
        selectableObject = selectableObject | loadPipeDrivers(projectState);

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
    for (let i = 0; i < topLeftCoordinates.length; i++) {
        elementStore.blueprints[i].topLeftPosition = topLeftCoordinates[i];
    }
}

function loadScreenData(projectState) {
    pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;

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
    SLAB_HEATER_COLORS_AVAILABLE = [...SLAB_HEATER_COLORS];
    rooms.forEach(room => SLAB_HEATER_COLORS_AVAILABLE = SLAB_HEATER_COLORS_AVAILABLE.filter(a => a !== room.slabHeaterColor));

    return rooms.filter(r => r.isSelected)[0];
}

function loadSlabHeaters(projectState) {
    const slabHeaters = projectState.slabHeaters.slabHeaters || [];
    for (let slabHeater of slabHeaters) {
        slabHeater.constructor = { name: CLASS_SLAB_HEATER };
        elementStore.register(slabHeater);
    }

    const slabHeaterGroups = projectState.slabHeaterGroups.slabHeaterGroups || [];
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.constructor = { name: CLASS_SLAB_HEATER_GROUP };
        elementStore.register(slabHeaterGroup);
    }

    return slabHeaterGroups.filter(shg => shg.isSelected)[0];
}

function loadBoxes(projectState) {
    const boxes = projectState.boxes.boxes || [];
    for (let box of boxes) {
        box.constructor = { name: CLASS_BOX };
        elementStore.register(box);
    }

    const boxGroups = projectState.boxGroups.boxGroups || [];
    for (let boxGroup of boxGroups) {
        boxGroup.constructor = { name: CLASS_BOX_GROUP };
        elementStore.register(boxGroup);
    }

    return boxGroups.filter(bg => bg.isSelected)[0];
}

function loadPipeDrivers(projectState) {
    const pipeDrivers = projectState.pipeDrivers.pipeDrivers || [];

    for (let pipeDriver of pipeDrivers) {
        pipeDriver.constructor = { name: CLASS_PIPE_DRIVER };
        elementStore.register(pipeDriver);
        recalculatePipeDriverConfiguration(pipeDriver);
    }

    return pipeDrivers.filter(pd => pd.isSelected)[0];
}

function recalculatePipeDriverConfiguration(pipeDriver) {
    const boxGroup = getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver);
    if (boxGroup) {
        boxGroup.pipeDriverId = pipeDriver.id;
        pipeDriver.isFullyConfigured = true;
    }
}