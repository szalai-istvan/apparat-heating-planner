import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Point } from "../../../common/geometry/point/Point.js";
import { PointCalculations } from "../../../common/geometry/Point/PointCalculations.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { PipeDriverService } from "../../service/PipeDriverService.js";

/** @type {PipeDriver} */
let cachedSelectablePipeDriver = null;

/**
 * Megkeresi, kiválasztja és visszaadja a kiválasztható csővezetőt
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {PipeDriver} a kiválasztott csővezető
 */
function selectPipeDriver(pipeDriver = undefined) {
    Validators.checkClass(pipeDriver, SlabHeatingPlannerConstants.classNames.pipeDriver, true);

    pipeDriver = pipeDriver || checkForSelectablePipeDriver();
    if (!pipeDriver) {
        return;
    }

    if (pipeDriver === SlabHeatingPlannerApplicationState.selectedPipeDriver) {
        pipeDriver.isSelected = true;
        pipeDriver.isSelectedForDrag = true;
        setSelectedPipeDriverPointIndex(pipeDriver);
        return pipeDriver;
    }

    if (SelectionAction.deselectObject()) {
        pipeDriver.isSelected = true;
        SlabHeatingPlannerApplicationState.selectedPipeDriver = pipeDriver;
        return pipeDriver;
    }

    return undefined;
}

/**
 * Megkeresi és visszaadja a kiválaszthatü csővezetőt
 * 
 * @returns {PipeDriver}
 */
function searchForSelectablePipeDriver() {
    const selectedPipeDriver = selectPipeDriver();
    if (selectedPipeDriver) {
        ApplicationState.selectedObject = selectedPipeDriver;
        return selectedPipeDriver;
    }
}

function checkForSelectablePipeDriver() {
    if (cachedSelectablePipeDriver) {
        return cachedSelectablePipeDriver;
    }

    const selection = PipeDriverService.findAll().filter(pd => mouseCursorIsInsidePipeDriversNode(pd));
    const pipeDriver = selection[0];
    if (pipeDriver) {
        cachedSelectablePipeDriver = pipeDriver;
        return pipeDriver;
    }
    return undefined;
}


/**
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function setSelectedPipeDriverPointIndex(pipeDriver) {
    let index = 0;
    while (index < pipeDriver.points.length) {
        const point = pipeDriver.points[index];
        if (mouseCursorIsInsideNode(point)) {
            pipeDriver.selectedPointIndex = index;
            return;
        }
        index++;
    }

    pipeDriver.selectedPointIndex = undefined;
}

/**
 * Megkíséreli megszüntetni a csővezető objektum kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectPipeDriver() {
    const pipeDriver = SlabHeatingPlannerApplicationState.selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    pipeDriver.selectedPointIndex = null;
    SlabHeatingPlannerApplicationState.selectedPipeDriver = null;

    return true;
}

/**
 * Kiüríti a kiválasztásra cachelt csővezetőt
 * 
 * @returns {undefined}
 */
function clearPipeDriverSelectionCache() {
    cachedSelectablePipeDriver = null;
}

/**
 * Megállapítja, hogy az egérkurzor a paraméterül kapott csővezető megadott pontjára mutat-e
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {boolean}
 */
function mouseCursorIsInsidePipeDriversNode(pipeDriver) {
    const selectablePoints = pipeDriver.points.filter(p => mouseCursorIsInsideNode(p));
    return selectablePoints.length > 0;
}

/**
 * Megállapítja, hogy az egérkurzor a node-on belül van-e.
 * 
 * @param {Point} point 
 * @returns {boolean}
 */
function mouseCursorIsInsideNode(point) {
    const mousePosition = MouseCursor.getMousePositionAbsolute();
    const maxDistance = SlabHeatingPlannerApplicationState.pipeDriverNodeDiameterInPixels / 2;

    return PointCalculations.calculateDistance(mousePosition, point) < maxDistance;
}

/**
 * Csőnyomvonalak kiválasztásának műveletei
 */
export const SelectPipeDriverAction = {
    selectPipeDriver,
    deselectPipeDriver,
    clearPipeDriverSelectionCache
};