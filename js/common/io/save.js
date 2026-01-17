/** @type {Function[]} */
const projectSpecificSavingSteps = [];

/**
 * Letölti a projekt adatait.
 * 
 * @returns {undefined}
 */
function downloadProjectState() {
    try {
        disableRendering();
        const projectState = getProjectState();
        var aElement = document.createElement('a');

        aElement.setAttribute(
            'href',
            "data:text/plain;charset=utf-8," + encodeURIComponent(projectState)
        );
        aElement.setAttribute(
            "download",
            `APPARAT_project_${Math.random().toString().substring(2)}.json`
        );

        aElement.style.display = "none";
        document.body.appendChild(aElement);

        aElement.click();

        document.body.removeChild(aElement);

    } finally {
        enableRendering();
    }
}

/**
 * Elmenti a projektet a böngésző local storage tárhelyére.
 * 
 * @returns {undefined}
 */
function saveProjectToLocalStorage() {
    try {
        disableRendering();
        PROJECT_STATE_LOGGING_ENABLED && console.log('>>> Saving project to local storage');
        const stateStr = getProjectState();
        PROJECT_STATE_LOGGING_ENABLED && console.log('Project size: ' + getProjectStateSize(stateStr));
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
    } finally {
        PROJECT_STATE_LOGGING_ENABLED && console.log('<<< Saving project to local storage');
        enableRendering();
    }
}

/**
 * Összeállítja a projektadatokat, és visszaadja string-ként.
 * 
 * @returns {string} Projekt állapota JSON string-ben
 */
function getProjectState() {
    const rooms = elementStore.rooms.filter(room => roomIsConfigured(room));
    let stateStr;
    let projectState = {};

    try {
        projectState = {
            blueprints: {
                data: elementStore.blueprints.map((bp) => bp.data.canvas.toDataURL("image/png")),
                topLeft: elementStore.blueprints.map((bp) => bp.topLeftPosition),
                center: elementStore.blueprints.map((bp) => bp.centerPosition),
                angleDeg: elementStore.blueprints.map((bp) => bp.angleDeg)
            },
            scale: {
                pixelsPerMeterRatio: pixelsPerMetersRatio,
            },
            rooms: {
                rooms: rooms,
            },
            screen: {
                sumDrag: screenSumDrag,
                zoom: screenZoom,
            },
            grid: {
                seed: gridSeed,
            }
        };

        addProjectSpecificObjectsToProjectState(projectState);
    } finally {
        PROJECT_STATE_LOGGING_ENABLED && console.log(projectState);
        stateStr = JSON.stringify(projectState);
    }

    return stateStr;
}

/**
 * Kiszámolja, hogy mekkora mennyiségű adatot tartalmaz a projekt. (MB)
 * 
 * @param {string} stateStr Projekt struktúra JSON string-ként
 * @returns {string} Projekt állapota
 */
function getProjectStateSize(stateStr) {
    return roundNumber((stateStr || getProjectState()).length / 1024 / 1024, 2) + " MB";
}

/**
 * Hozzáadja az elmentenivaló projekt struktúra objektumhoz a projekt specifikus objektumokat.
 * 
 * @param {object} projectState, projekt struktúra
 * @returns {undefined}
 */
function addProjectSpecificObjectsToProjectState(projectState) {
    projectSpecificSavingSteps.forEach(psss => psss(projectState));
}

/**
 * Rögzít egy projekt specifikus mentési lépést.
 * 
 * @param {Function} savingStep mentési lépés függvény
 * @returns {undefined}
 */
function registerProjectSpecificSavingStep(savingStep) {
    projectSpecificSavingSteps.push(savingStep);
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProjectToLocalStorage, 10_000);
}