let saveOrLoadInProgress = false;

function downloadProjectState() {
    try {
        saveOrLoadInProgress = true;
        const text = getProjectState();
        var element = document.createElement('a');

        element.setAttribute(
            'href',
            "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute(
            "download",
            `APPARAT_project_${Math.random().toString().substring(2)}.json`
        );

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    } finally {
        saveOrLoadInProgress = false;
    }
}

function saveProjectToLocalStorage() {
    try {
        saveOrLoadInProgress = true;
        console.log('>>> Saving project to local storage');
        const stateStr = getProjectState();
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
    } finally {
        console.log('<<< Saving project to local storage');
        saveOrLoadInProgress = false;
    }
}

function getProjectState() {
    const rooms = elementStore.rooms.filter(room => roomIsConfigured(room));
    const slabHeaterGroups = elementStore.slabHeaterGroups;

    let stateStr;
    let projectState = {};
    try {
        projectState = {
            blueprints: {
                data: elementStore.blueprints.map((bp) => bp.data.canvas.toDataURL("image/png")),
                topLeft: elementStore.blueprints.map((bp) => bp.topLeftPosition),
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
            },
            slabHeaterGroups: {
                slabHeaterGroups: elementStore.slabHeaterGroups
            },
            slabHeaters: {
                slabHeaters: elementStore.slabHeaters
            },
            boxGroups: {
                boxGroups: elementStore.boxGroups
            },
            boxes: {
                boxes: elementStore.boxes
            },
            pipeDrivers: {
                pipeDrivers: elementStore.pipeDrivers
            }

        };
    } finally {
        console.log(projectState);
        stateStr = JSON.stringify(projectState);
    }

    return stateStr;
}

function getProjectStateSize() {
    return roundNumber(getProjectState().length / 1024 / 1024, 2) + " MB";
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
    setInterval(saveProjectToLocalStorage, 10_000);
}