import { RoomCalculations } from "../../common/actions/room/RoomCalculations.js";
import { SelectionAPI } from "../../common/api/SelectionAPI.js";
import { ApplicationState } from "../../common/appdata/ApplicationState.js";
import { Constants } from "../../common/appdata/Constants.js";
import { ButtonWrapper } from "../../common/ui/buttons/ButtonWrapper.js";
import { UiLayoutDefinition } from "../../common/ui/UiLayoutDefinition.js";
import { PanelGroupCalculations } from "../actions/panelGroup/PanelGroupCalculations.js";
import { PanelGroupAPI } from "../api/PanelGroupAPI.js";
import { HeatingPlannerApplicationState } from "../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../appdata/HeatingPlannerConstants.js";
import { TransportDialog } from "./dialog/TransportDialog.js";

/**
 * Létrehozza és regisztrálja a projekt specifikus UI vezérlőket.
 * 
 * @returns {undefined}
 */
function createButtonsHeatingPlanner() {
    const topRibbonButtonSizes = [];
    const leftRibbonButtonSizes = [];
    UiLayoutDefinition.createCommonButtons(topRibbonButtonSizes, leftRibbonButtonSizes);

    for (let type in HeatingPlannerConstants.panelTypes) {
        new ButtonWrapper({
            text: type,
            size: Constants.ui.smallButtonSize,
            position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
            onClick: () => PanelGroupAPI.createOrReplacePanelGroup(type),
            shouldBeActive: () => RoomCalculations.configuredRoomsExist()
        });
        leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);
    }

    UiLayoutDefinition.addLeftRibbonDelimeter(UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);

    new ButtonWrapper({
        text: 'Forgatás',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => SelectionAPI.rotateSelectedObject(1),
        shouldBeActive: () => HeatingPlannerApplicationState.selectedPanelGroup || ApplicationState.selectedBlueprint
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);

    const addButtonPosition = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    new ButtonWrapper({
        text: '-',
        size: Constants.ui.halfWidthButtonSize,
        position: addButtonPosition,
        onClick: () => PanelGroupAPI.removePanelFromSelectedGroup(),
        shouldBeActive: () => HeatingPlannerApplicationState.selectedPanelGroup
    });

    addButtonPosition.x += Constants.ui.halfWidthButtonSize.x;
    new ButtonWrapper({
        text: '+',
        size: Constants.ui.halfWidthButtonSize,
        position: addButtonPosition,
        onClick: () => PanelGroupAPI.addPanelToSelectedGroup(),
        shouldBeActive: () => HeatingPlannerApplicationState.selectedPanelGroup
    });
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);

    new ButtonWrapper({
        text: 'Törlés',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => SelectionAPI.removeSelectedObject(),
        shouldBeActive: () => HeatingPlannerApplicationState.selectedPanelGroup || ApplicationState.selectedRoom || ApplicationState.selectedBlueprint
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);

    const downloadButtonPos = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadButtonPos.y += Constants.ui.smallButtonSize.y + Constants.ui.buttonGapY;
    const downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: Constants.ui.tallSmallButtonSize,
        position: downloadButtonPos,
        onClick: () => TransportDialog.openTransportDialog(),
        shouldBeActive: () => PanelGroupCalculations.panelGroupsExist() && !(HeatingPlannerApplicationState.selectedPanelGroup?.isSelectedForDrag)
    });
    leftRibbonButtonSizes.push(Constants.ui.tallSmallButtonSize);
}

/**
 * Rajzolátor UI felépítő függvény
 */
export const UiLayoutHeatingPlanner = {
    createButtonsHeatingPlanner
};