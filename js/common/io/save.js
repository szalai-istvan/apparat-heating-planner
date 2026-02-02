import { BlueprintCalculations } from "../actions/blueprint/BlueprintCalculations.js";
import { RoomCalculations } from "../actions/room/RoomCalculations.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { Blueprint } from "../entities/Blueprint.js";
import { MathTools } from "../math/MathTools.js";
import { Draw } from "../p5/draw.js";
import { BlueprintService } from "../service/BlueprintService.js";
import { RoomService } from "../service/RoomService.js";

/** @type {Function[]} */
const projectSpecificSavingSteps = [];

/**
 * Letölti a projekt adatait.
 * 
 * @returns {undefined}
 */
function downloadProjectState() {
    try {
        Draw.disableRendering();
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
        Draw.enableRendering();
    }
}

/**
 * Elmenti a projektet a böngésző local storage tárhelyére.
 * 
 * @returns {undefined}
 */
function saveProjectToLocalStorage() {
    const loggingEnabled = Constants.debug.projectStateLoggingEnabled;
    try {
        Draw.disableRendering();
        // loggingEnabled && console.clear();
        loggingEnabled && console.log('>>> Saving project to local storage');
        const stateStr = getProjectState();
        loggingEnabled && console.log('Project size: ' + getProjectStateSize(stateStr));
        localStorage.setItem(Constants.debug.localStorageDataKey, stateStr);
    } finally {
        loggingEnabled && console.log('<<< Saving project to local storage');
        Draw.enableRendering();
    }
}

/**
 * Összeállítja a projektadatokat, és visszaadja string-ként.
 * 
 * @returns {string} Projekt állapota JSON string-ben
 */
function getProjectState() {
    const rooms = RoomService.findAll().filter(room => RoomCalculations.roomIsConfigured(room));
    /** @type {Blueprint[]} */
    const blueprints = BlueprintService.findAll();
    let stateStr;
    let projectState = {};

    try {
        projectState = {
            blueprints: {
                data: blueprints.map((bp) => bp.data.canvas.toDataURL("image/png")),
                angleRad: blueprints.map(bp => BlueprintCalculations.getAngleRad(bp))
            },
            scale: {
                pixelsPerMeterRatio: ApplicationState.pixelsPerMetersRatio,
            },
            rooms: {
                rooms: rooms,
            },
            screen: {
                sumDrag: ApplicationState.screenSumDrag,
                zoom: ApplicationState.screenZoom,
            },
            grid: {
                seed: ApplicationState.gridSeed,
            }
        };

        addProjectSpecificObjectsToProjectState(projectState);
    } finally {
        Constants.debug.projectStateLoggingEnabled && console.log(projectState);
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
    return MathTools.roundNumber((stateStr || getProjectState()).length / 1024 / 1024, 2) + " MB";
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

if (Constants.debug.saveToLocalStorageEnabled) {
    setInterval(saveProjectToLocalStorage, 10_000);
}

/**
 * Projekt fájlba való letöltésével kapcsolatos függvények.
 */
export const Save = {
    downloadProjectState,
    registerProjectSpecificSavingStep
};