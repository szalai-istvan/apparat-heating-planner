import { BlueprintCalculations } from "../actions/blueprint/BlueprintCalculations.js";
import { DeleteBlueprintAction } from "../actions/blueprint/DeleteBlueprintAction.js";
import { BlueprintAPI } from "../api/BlueprintAPI.js";
import { RoomAPI } from "../api/RoomAPI.js";
import { ScalingAPI } from "../api/ScalingAPI.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { Point } from "../geometry/Point/Point.js";
import { Load } from "../io/load.js";
import { Save } from "../io/save.js";
import { ReducerFunctions } from "../math/ReducerFunctions.js";
import { ButtonWrapper } from "./buttons/ButtonWrapper.js";
import { LoadProjectButton } from "./buttons/LoadProjectButton.js";
import { MenuLine } from "./menuLine/MenuLine.js";

/**
 * Létrehozza a minden projekthez szükséges gombot.
 * 
 * @param {Point[]} topRibbonButtonSizes 
 * @param {Point[]} leftRibbonButtonSizes 
 */
function createCommonButtons(topRibbonButtonSizes, leftRibbonButtonSizes) {
    const fileUploadButton = new ButtonWrapper({
        text: 'Alaprajz feltöltése',
        size: Constants.ui.regularButtonSize,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: BlueprintAPI.uploadNewBlueprint,
        shouldBeActive: () => true
    });
    topRibbonButtonSizes.push(Constants.ui.regularButtonSize);
    
    const scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: Constants.ui.regularButtonSize,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: ScalingAPI.startScaling,
        shouldBeActive: BlueprintCalculations.blueprintDataIsPresent
    });
    topRibbonButtonSizes.push(Constants.ui.regularButtonSize);

    const addRoomsButton = new ButtonWrapper({
        text: 'Helyiség felvétele',
        size: Constants.ui.regularButtonSize,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: RoomAPI.showAddRoomDialog,
        shouldBeActive: () => ApplicationState.pixelsPerMetersRatio
    });
    topRibbonButtonSizes.push(Constants.ui.regularButtonSize);

    addTopRibbonDelimeter(topRibbonButtonPosition(topRibbonButtonSizes).x);
    topRibbonButtonSizes.push(Constants.ui.regularButtonSize);

    const saveLoadMenu = new MenuLine({
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        size: Constants.ui.tallSmallButtonSize,
        optionSize: Constants.ui.tallSmallButtonSize,
        text: 'Projekt',
        buttons: ['Új projekt', 'Projekt mentése', 'Projekt betöltése'],
        buttonsClickFunctions: [() => DeleteBlueprintAction.clearBlueprints(), () => Save.downloadProjectState(), () => LoadProjectButton.uploadProject()],
        selectionMenuMode: false,
        shouldBeActive: () => true
    });
    leftRibbonButtonSizes.push(Constants.ui.tallSmallButtonSize);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);
}

/**
 * Visszaadja a következő felső gomb pozíciót.
 * 
 * @param {Point[]} topRibbonButtonSizes 
 * @returns {Point}
 */
function topRibbonButtonPosition(topRibbonButtonSizes) {
    const sumButtonWidth = topRibbonButtonSizes
        .map((trbs) => trbs.x)
        .reduce(ReducerFunctions.sumFunction, 0);
    const sumGap = (topRibbonButtonSizes.length + 1) * Constants.ui.buttonGapX;
    return CreatePoint.createPoint(Constants.ui.leftRibbonWidth + sumButtonWidth + sumGap, Constants.ui.buttonGapX);
}

/**
 * Visszaadja a következő oldalsó gomb pozíciót.
 * 
 * @param {Point[]} sideRibbonButtonSizes 
 * @returns {Point}
 */
function sidePanelButtonPosition(sideRibbonButtonSizes) {
    const sumButtonHeight = sideRibbonButtonSizes
        .map((trbs) => trbs.y)
        .reduce(ReducerFunctions.sumFunction, 0);
    const sumGap = (sideRibbonButtonSizes.length + 1) * Constants.ui.buttonGapY;
    return CreatePoint.createPoint(Constants.ui.buttonGapX, 55 + sumButtonHeight + sumGap);
}

/**
 * Létrehoz egy elválasztó vonalat a felső menüszalagon.
 * 
 * @param {number} x
 * @returns {undefined}
 */
function addTopRibbonDelimeter(x) {
    ApplicationState.delimiterPositions.push({
        p1: CreatePoint.createPoint(x, 0),
        p2: CreatePoint.createPoint(x, Constants.ui.topRibbonHeight)
    });
}

/**
 * Létrehoz egy elválasztó vonalat a baloldali menüszalagon.
 * 
 * @param {number} y
 * @returns {undefined}
 */
function addLeftRibbonDelimeter(y) {
    y -= Constants.ui.buttonGapY / 2;
    ApplicationState.delimiterPositions.push({
        p1: CreatePoint.createPoint(0, y),
        p2: CreatePoint.createPoint(Constants.ui.leftRibbonWidth, y)
    });
}

/**
 * Hozzáad a baloldali menüszalaghoz egy feliratot.
 * 
 * @param {string} text 
 * @param {number} y 
 * @returns {undefined}
 */
function addSidePanelText(text, y) {
    ApplicationState.uiTexts.push({ text: text, position: { x: Constants.ui.leftRibbonWidth / 2, y: y } });
}

/**
 * UI elemek létrehozásával kapcsolatos műveletek gyűjteménye.
 */
export const UiLayoutDefinition = {
    createCommonButtons,
    addTopRibbonDelimeter,
    addLeftRibbonDelimeter,
    topRibbonButtonPosition,
    sidePanelButtonPosition,
    addSidePanelText
};