import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { CustomEventTypes } from "../event/customEventTypes.js";
import { Events } from "../event/Events.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { Point } from "../geometry/Point/Point.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { UiLayoutDefinition } from "../ui/UiLayoutDefinition.js";
import { DocumentData } from "../ui/DocumentData.js";
import { ImageAssets } from "../ui/ImageAssets.js";
import { Draw } from "./draw.js";
import { SetupSteps } from "./setup/setupSteps.js";

/** @type {Point} */
let docSize;
let canvas;

/**
 * Inicializálja a p5.js rajzfelületet és egyéb komponenseket.
 * 
 * @returns {undefined}
 */
window.setup = function() {
    runSetupSteps();

    ApplicationState.screenSumDrag = CreatePoint.createPoint(0, 0);
    ApplicationState.testPoint = CreatePoint.createPoint(Constants.geometry.testPointCoordinate, Constants.geometry.testPointCoordinate);
    ApplicationState.originPoint = CreatePoint.createPoint(0, 0);

    ImageAssets.loadImageAssets();
    docSize = DocumentData.getDocumentSize();
    canvas = createCanvas(docSize.x, window.innerHeight);
    canvas.parent(Constants.strings.body);
    ApplicationState.canvas = canvas;
    
    angleMode(RADIANS);

    UiLayoutDefinition.createCommonButtons([], []); // todo ez ide nem fog kelleni

    Events.dispatchCustomEvent(CustomEventTypes.setup, {});
    Draw.enableRendering();
}

/**
 * Beállítja az ablak eseményeit és komponenseit.
 * 
 * @returns {undefined}
 */
function runSetupSteps() {
    SetupSteps.disableContextMenu();
    SetupSteps.disableEscapeButton();
    SetupSteps.handleWindowResize();
    SetupSteps.enableEnterForConfirm();
    SetupSteps.handleDeleteButton();
    SetupSteps.createRoomPrefillRadioButtons();
    SetupSteps.initModalsAndEnterableButtons();
}