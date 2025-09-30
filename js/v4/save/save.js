/** @type {boolean}, folyamatban van-e mentés vagy betöltés */
let saveOrLoadInProgress = false;

function downloadProjectState() {
    try {
        saveOrLoadInProgress = true;
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
        saveOrLoadInProgress = false;
    }
}

function saveProjectToLocalStorage() {
    try {
        saveOrLoadInProgress = true;
        PROJECT_STATE_LOGGING_ENABLED && console.log('>>> Saving project to local storage');
        const stateStr = getProjectState();
        PROJECT_STATE_LOGGING_ENABLED && console.log('Project size: ' + getProjectStateSize(stateStr));
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
    } finally {
        PROJECT_STATE_LOGGING_ENABLED && console.log('<<< Saving project to local storage');
        saveOrLoadInProgress = false;
    }
}

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
            structureElements: {
                structureElements: elementStore.structureElements
            },
            screen: {
                sumDrag: screenSumDrag,
                zoom: screenZoom,
            },
            grid: {
                seed: gridSeed,
            },
            panelGroups: {
                panelGroups: elementStore.panelGroups
            },
            panels: {
                panels: elementStore.panels
            }
        };
    } finally {
        PROJECT_STATE_LOGGING_ENABLED && console.log(projectState);
        stateStr = JSON.stringify(projectState);
    }

    return stateStr;
}

function getProjectStateSize(stateStr) {
    return roundNumber((stateStr || getProjectState()).length / 1024 / 1024, 2) + " MB";
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProjectToLocalStorage, 10_000);
}