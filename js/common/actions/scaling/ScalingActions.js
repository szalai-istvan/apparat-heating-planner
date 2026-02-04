import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { ErrorCodes } from "../../errors/ErrorCodes.js";
import { Errors } from "../../errors/Errors.js";
import { CustomEventTypes } from "../../event/CustomEventTypes.js";
import { Events } from "../../event/Events.js";
import { Point } from "../../geometry/Point/Point.js";
import { PointCalculations } from "../../geometry/Point/PointCalculations.js";
import { MathTools } from "../../math/MathTools.js";
import { Dialogs } from "../../ui/dialog/Dialogs.js";
import { ScalingDialog } from "../../ui/dialog/ScalingDialog.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
import { UiCalculations } from "../../ui/UICalculations.js";
import { Validators } from "../../validators/Validators.js";
import { DeleteRoomAction } from "../room/DeleteRoomAction.js";
import { RoomCalculations } from "../room/RoomCalculations.js";

/** @type {Point} */
let scalingFirstPoint = null;
/** @type {Point} */
let scalingSecondPoint = null;

/**
 * Elindítja a méretarányoztást.
 * 
 * @returns {undefined}
 */
function startScaling() {
    if (UiCalculations.operationInProgress()) {
        return;
    }

    if (!RoomCalculations.configuredRoomsExist()) {
        ApplicationState.scalingInProgress = true;
        clearScaling();
    } else {
        ScalingDialog.showScalingConfirmDialog();
    }
}

/**
 * Felvesz egy referenciapontot a méretarányozáshoz.
 */
function proceedWithScaling() {
    if (!ApplicationState.scalingInProgress) {
        return;
    }

    if (scalingFirstPoint === null) {
        scalingFirstPoint = MouseCursor.getMousePositionAbsolute();
    } else if (scalingSecondPoint === null) {
        scalingSecondPoint = MouseCursor.getMousePositionAbsolute();
        ScalingDialog.showScalingDialog();
    }
}

/**
 * Resetteli a scaler adatokat
 * 
 * @returns {undefined}
 */
function clearScaling() {
    scalingFirstPoint = null;
    scalingSecondPoint = null;
    ApplicationState.pixelsPerMetersRatio = null;
    scaleRenderSizeValues();
    DeleteRoomAction.clearRooms();
}

/**
 * Kiszámolja és beállítja a scaling értékeket
 * 
 * @param {string} scalingValue a felhasználó által megadott hosszúság érték
 */
function processScalingValue(scalingValue) {
    Validators.checkClass(scalingValue, Constants.classNames.string);

    const firstPoint = scalingFirstPoint;
    const secondPoint = scalingSecondPoint;

    const scalingValueNumber = Number(scalingValue);
    if (scalingValueNumber > 0) {
        const referenceLength = scalingValueNumber;
        ApplicationState.scalingInProgress = false;
        const referencePointDistance = PointCalculations.calculateDistance(firstPoint, secondPoint);
        ApplicationState.pixelsPerMetersRatio = MathTools.roundNumber(referencePointDistance / referenceLength, 2);
        scaleRenderSizeValues();
        Dialogs.toggleScreenControls();
    } else {
        Errors.throwError(ErrorCodes.INVALID_SCALE);
    }
}

/**
 * Felrajzolja a képernyőre a méretarány beállító eszközt
 * 
 * @returns {undefined}
 */
function renderScaler() {
    if (!ApplicationState.scalingInProgress) {
        return;
    }

    const firstPoint = scalingFirstPoint;
    if (!firstPoint) {
        return;
    }

    const secondPoint = scalingSecondPoint || MouseCursor.getCorrectedMousePositionAbsolute();

    push();
    line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
    pop();
}

/**
 * Újraszámolja a renderelési méret értékeket.
 * 
 * @returns {undefined}
 */
function scaleRenderSizeValues() {
    const ratio = ApplicationState.pixelsPerMetersRatio;

    ApplicationState.roomTextSize = ratio ? Constants.room.roomTextSizeInMeters * ratio : undefined;
    ApplicationState.roomLineWeight = ratio ? Constants.room.roomLineWeightInMeters * ratio : undefined;
    ApplicationState.roomNameOutlineWidth = ratio ? Constants.room.roomNameOutlineWidthInMeters * ratio : undefined;
    ApplicationState.gridResolutionInPixels = ratio ? Constants.grid.gridResolutionInMeters * ratio : undefined;
    
    Events.dispatchCustomEvent(CustomEventTypes.updateRenderSizeValues, {});
}

/**
 * Méretarányozással kapcsolatos műveletek.
 */
export const ScalingActions = {
    startScaling,
    proceedWithScaling,
    clearScaling,
    renderScaler,
    processScalingValue,
    scaleRenderSizeValues
};