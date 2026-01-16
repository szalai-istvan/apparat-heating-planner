/** @type {Function[]} */
const projectSpecificLoadingSteps = [];

/**
 * Betölti a projektet
 * 
 * @param {string} text, projekt struktúra JSON string
 * @returns {undefined}
 */
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
        selectableObject = selectableObject ?? loadProjectSpecificObjects(projectState);

        selectableObject && selectObject(selectableObject);
    } finally {
        saveOrLoadInProgress = false;
    }
}

/**
 * Betölti a projekt specifikus objektumokat, és visszaadja a kiválasztható objektumot.
 * 
 * @param {object} projectState 
 * @returns {object} kiválasztható projektspecifikus objektum
 */
function loadProjectSpecificObjects(projectState) { // todo ez a heating-plannerbe való
    let selectableObject = null;

    for (let i = 0; i < projectSpecificLoadingSteps.length; i++) {
        selectableObject = selectableObject ?? projectSpecificLoadingSteps[i](projectState);
    }

    return selectableObject;
}

/**
 * Rögzít egy projekt specifikus betöltési lépést.
 * 
 * @param {Function} loadingStep betöltési lépés függvény
 * @returns {undefined}
 */
function registerProjectSpecificLoadingStep(loadingStep) {
    projectSpecificLoadingSteps.push(loadingStep);
}

function loadProjectStateFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
}

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