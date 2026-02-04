import { CreateBlueprintAction } from "../actions/blueprint/CreateBlueprintAction.js";
import { DeleteBlueprintAction } from "../actions/blueprint/DeleteBlueprintAction.js";
import { UpdateBlueprintAction } from "../actions/blueprint/UpdateBlueprintAction.js";
import { ScalingActions } from "../actions/scaling/ScalingActions.js";
import { SelectionAction } from "../actions/selection/SelectionAction.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { GridActions } from "../geometry/Grid/GridActions.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { Draw } from "../p5/draw.js";
import { BlueprintService } from "../service/BlueprintService.js";
import { ElementStore } from "../store/ElementStore.js";

/** @type {Function[]} */
const projectSpecificLoadingSteps = [];

/**
 * Betölti a projektet
 * 
 * @param {string} text, projekt struktúra JSON string
 * @returns {undefined}
 */
function loadProject(text = undefined) {
    const loggingEnabled = Constants.debug.projectStateLoggingEnabled;
    try {
        Draw.disableRendering();
        const projectState = text ? JSON.parse(text) : loadProjectStateFromLocalStorage();
        loggingEnabled && console.log('>>> Loading project');
        loggingEnabled && console.log(projectState);
        
        if (!projectState) {
            return;
        }

        let selectableObject = null;

        prepareLoading();
        const selectableBlueprint = loadBlueprints(projectState)
        selectableObject = selectableObject || selectableBlueprint
        loadScreenData(projectState);
        const selectableRoom = loadRooms(projectState);
        selectableObject = selectableObject || selectableRoom;
        const selectableProjectSpecificObject = loadProjectSpecificObjects(projectState);
        selectableObject = selectableObject || selectableProjectSpecificObject;

        selectableObject && SelectionAction.selectObject(selectableObject);
    } finally {
        loggingEnabled && console.log('<<< Loading project');
        Draw.enableRendering();
    }
}

/**
 * Betölti a projekt specifikus objektumokat, és visszaadja a kiválasztható objektumot.
 * 
 * @param {object} projectState 
 * @returns {object} kiválasztható projektspecifikus objektum
 */
function loadProjectSpecificObjects(projectState) {
    let selectableObject = null;

    for (let i = 0; i < projectSpecificLoadingSteps.length; i++) {
        const func = projectSpecificLoadingSteps[i];
        const result = func(projectState);
        selectableObject = selectableObject || result;
    }

    return selectableObject;
}

/**
 * Projekt betöltése local storage-ból.
 * 
 * @returns {string}
 */
function loadProjectStateFromLocalStorage() {
    return JSON.parse(localStorage.getItem(Constants.debug.localStorageDataKey));
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

function prepareLoading() {
    DeleteBlueprintAction.clearBlueprints();
}

function loadBlueprints(projectState) {
    (projectState.blueprints.data || []).forEach((bp) => CreateBlueprintAction.createBlueprint(loadImage(bp)));

    const blueprints = BlueprintService.findAll();
    setTimeout(() => {
        let index = 0;
        while (index < blueprints.length) {
            UpdateBlueprintAction.incrementBlueprintAngle(blueprints[index], projectState.blueprints.angleRad[index]);
            index++;
        }
    }, 1_000); // todo erre szebb megoldás.

    return blueprints.filter(bp => bp.isSelected)[0];
}

function loadScreenData(projectState) {
    ApplicationState.pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;

    ApplicationState.screenSumDrag = projectState.screen.sumDrag;
    ApplicationState.screenZoom = projectState.screen.zoom;

    if (projectState.grid.seed) {
        GridActions.setGlobalGridSeed(CreatePoint.createPoint(projectState.grid.seed.x, projectState.grid.seed.y));
    }

    ScalingActions.scaleRenderSizeValues();
}

function loadRooms(projectState) {
    const rooms = projectState.rooms.rooms;
    rooms.forEach((room) => (room.constructor = { name: Constants.classNames.room }));
    rooms.forEach((room) => ElementStore.save(room));
    return rooms.filter(r => r.isSelected)[0];
}

/**
 * Projekt betöltéssel kapcsolatos műveletek.
 */
export const Load = {
    loadProject,
    registerProjectSpecificLoadingStep,
};