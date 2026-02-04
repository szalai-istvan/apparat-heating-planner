import { RoomCalculations } from "../../common/actions/room/RoomCalculations.js";
import { SelectionAPI } from "../../common/api/SelectionAPI.js";
import { ApplicationState } from "../../common/appdata/ApplicationState.js";
import { Constants } from "../../common/appdata/Constants.js";
import { ButtonWrapper } from "../../common/ui/buttons/ButtonWrapper.js";
import { OptionsBar } from "../../common/ui/OptionsBar/OptionsBar.js";
import { UiLayoutDefinition } from "../../common/ui/UiLayoutDefinition.js";
import { SlabHeaterGroupAPI } from "../api/SlabHeaterGroupAPI.js";
import { SlabHeatingPlannerApplicationState } from "../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeaterGroupService } from "../service/SlabHeaterGroupService.js";
import { SlabHeaterMenuValueResolver } from "./SlabHeaterMenuValueResolver.js";

/**
 * Létrehozza és regisztrálja a projekt specifikus UI vezérlőket.
 * 
 * @returns {undefined}
 */
function createButtonsSlabHeatingPlanner() {
    const topRibbonButtonSizes = [];
    const leftRibbonButtonSizes = [];
    UiLayoutDefinition.createCommonButtons(topRibbonButtonSizes, leftRibbonButtonSizes);

    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.uiTextSize / 2 });
    UiLayoutDefinition.addSidePanelText('Födémfűtés elemek', UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.uiTextSize / 2 });

    const slabHeaterWidthOptionsBar = new OptionsBar({
        topLeftPosition: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        buttonSize: Constants.ui.halfWidthButtonSize,
        gap: { x: 0, y: Constants.ui.buttonGapY / 2 },
        columns: [{ buttons: [SlabHeatingPlannerConstants.slabHeater.slabHeaterTypes.width[0]] }, { buttons: [SlabHeatingPlannerConstants.slabHeater.slabHeaterTypes.width[1]] }],
        valueResolver: optionsBar => optionsBar.selected[0] ? Number(optionsBar.selected[0]) : undefined,
        onchange: () => SlabHeaterGroupAPI.updateSelectedSlabHeaterGroupDimensions(), 
        title: 'Szélesség (m)',
        perColumnSelection: false,
        shouldBeActive: () => RoomCalculations.configuredRoomsExist(),
    });
    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.halfWidthButtonSize.y / 3 });
    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.halfWidthButtonSize.y / 2 });
    SlabHeatingPlannerApplicationState.widthMenu = slabHeaterWidthOptionsBar;

    const slabHeaterLengthOptionsBar = new OptionsBar({
        topLeftPosition: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        buttonSize: Constants.ui.halfWidthButtonSize,
        gap: { x: 0, y: Constants.ui.buttonGapY / 2 },
        columns: [{ header: 'm', buttons: SlabHeatingPlannerConstants.slabHeater.slabHeaterTypes.length.m }, { header: 'cm', buttons: SlabHeatingPlannerConstants.slabHeater.slabHeaterTypes.length.cm }],
        valueResolver: optionsBar => SlabHeaterMenuValueResolver.resolveSlabHeaterLengthOptionBarValue(optionsBar),
        onchange: () => SlabHeaterGroupAPI.updateSelectedSlabHeaterGroupDimensions(), 
        shouldBeActive: () => RoomCalculations.configuredRoomsExist(),
        title: 'Hosszúság',
        perColumnSelection: true
    });
    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.halfWidthButtonSize.y / 3 });
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);
    SlabHeatingPlannerApplicationState.lengthMenu = slabHeaterLengthOptionsBar;

    const addSlabHeaterButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => SlabHeaterGroupAPI.createSlabHeaterGroup(),
        shouldBeActive: () => slabHeaterLengthOptionsBar.allValuesAreSet() && slabHeaterWidthOptionsBar.allValuesAreSet() && RoomCalculations.configuredRoomsExist()
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);
    UiLayoutDefinition.addLeftRibbonDelimeter(UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);

    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.uiTextSize / 2 });
    UiLayoutDefinition.addSidePanelText('Födémáttörések', UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({ x: 0, y: Constants.ui.uiTextSize / 2 });

    const addBoxGroupButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => {},//createBoxGroup(),
        shouldBeActive: () => {},//configuredRoomsExist()
    });

    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);
    UiLayoutDefinition.addLeftRibbonDelimeter(UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);

    const deleteButton = new ButtonWrapper({
        text: 'Törlés',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => SelectionAPI.removeSelectedObject(),
        shouldBeActive: () => ApplicationState.selectedObject
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);

    const rotatePosition = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    const rotateLeftButton = new ButtonWrapper({
        text: '↶',
        size: Constants.ui.halfWidthButtonSize,
        position: rotatePosition,
        onClick: () => SelectionAPI.rotateSelectedObject(-1),
        shouldBeActive: () => SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup || SlabHeatingPlannerApplicationState.selectedBoxGroup || ApplicationState.selectedBlueprint
    });

    rotatePosition.x += Constants.ui.halfWidthButtonSize.x;
    const rotateRightButton = new ButtonWrapper({
        text: '↷',
        size: Constants.ui.halfWidthButtonSize,
        position: rotatePosition,
        onClick: () => SelectionAPI.rotateSelectedObject(1),
        shouldBeActive: () => SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup || SlabHeatingPlannerApplicationState.selectedBoxGroup || ApplicationState.selectedBlueprint
    });
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);

    const groupManagerPosition = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    const removeFromGroupButton = new ButtonWrapper({
        text: '-',
        size: Constants.ui.halfWidthButtonSize,
        position: groupManagerPosition,
        onClick: () => {},//removeLastFromSelectedGroup(),
        shouldBeActive: () => SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup || SlabHeatingPlannerApplicationState.selectedBoxGroup
    });

    groupManagerPosition.x += Constants.ui.halfWidthButtonSize.x;
    const addToGroupButton = new ButtonWrapper({
        text: '+',
        size: Constants.ui.halfWidthButtonSize,
        position: groupManagerPosition,
        onClick: () => {},//addToSelectedGroup(),
        shouldBeActive: () => SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup || SlabHeatingPlannerApplicationState.selectedBoxGroup
    });
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);

    UiLayoutDefinition.addLeftRibbonDelimeter(UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);
    const downloadButtonPos = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    const downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: Constants.ui.tallSmallButtonSize,
        position: downloadButtonPos,
        onClick: () => {},
        shouldBeActive: () => SlabHeaterGroupService.findAll().length > 0
    });
    leftRibbonButtonSizes.push(Constants.ui.tallSmallButtonSize);
}

/**
 * Rajzolátor UI felépítő függvény
 */
export const UiLayoutSlabHeatingPlanner = {
    createButtonsSlabHeatingPlanner
};