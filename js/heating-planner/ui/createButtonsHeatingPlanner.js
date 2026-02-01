import { RoomCalculations } from "../../common/actions/room/RoomCalculations.js";
import { Constants } from "../../common/appdata/Constants.js";
import { ButtonWrapper } from "../../common/ui/buttons/ButtonWrapper.js";
import { UiLayoutDefinition } from "../../common/ui/UiLayoutDefinition.js";
import { HeatingPlannerConstants } from "../appdata/ConstantsHeatingPlanner.js";

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
            onClick: () => createOrReplacePanelGroup(type),
            shouldBeActive: () => RoomCalculations.configuredRoomsExist()
        });
        leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);
    }

    UiLayoutDefinition.addLeftRibbonDelimeter(UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes).y);

    new ButtonWrapper({
        text: 'Forgatás',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => rotateSelectedObject(),
        shouldBeActive: () => selectedPanelGroup || selectedBlueprint
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);

    const addButtonPosition = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    new ButtonWrapper({
        text: '-',
        size: Constants.ui.halfWidthButtonSize,
        position: addButtonPosition,
        onClick: () => removePanelFromSelectedGroup(),
        shouldBeActive: () => selectedPanelGroup
    });

    addButtonPosition.x += Constants.ui.halfWidthButtonSize.x;
    new ButtonWrapper({
        text: '+',
        size: Constants.ui.halfWidthButtonSize,
        position: addButtonPosition,
        onClick: () => addPanelToSelectedGroup(),
        shouldBeActive: () => selectedPanelGroup
    });
    leftRibbonButtonSizes.push(Constants.ui.halfWidthButtonSize);

    new ButtonWrapper({
        text: 'Törlés',
        size: Constants.ui.smallButtonSize,
        position: UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => removeSelectedObject(),
        shouldBeActive: () => selectedPanelGroup || selectedRoom || selectedBlueprint
    });
    leftRibbonButtonSizes.push(Constants.ui.smallButtonSize);

    const downloadButtonPos = UiLayoutDefinition.sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadButtonPos.y += Constants.ui.smallButtonSize.y + Constants.ui.buttonGapY;
    const downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: Constants.ui.tallSmallButtonSize,
        position: downloadButtonPos,
        onClick: () => openTransportDialog(),
        shouldBeActive: () => panelGroupsExist() && !(selectedPanelGroup?.isSelectedForDrag)
    });
    leftRibbonButtonSizes.push(Constants.ui.tallSmallButtonSize);
}

/**
 * Rajzolátor UI felépítő függvény
 */
export const UiLayoutHeatingPlanner = {
    createButtonsHeatingPlanner
};