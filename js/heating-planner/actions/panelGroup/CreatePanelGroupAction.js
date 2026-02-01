import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { Panel } from "../../entities/Panel.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelGroupCalculations } from "./PanelGroupCalculations.js";
import { UpdatePanelGroupAction } from "./UpdatePanelGroupAction.js";

/**
 * Létrehoz és visszaad egy fűtő csoportot és visszaadja.
 * 
 * @param {string} type, típus 
 * @returns {undefined}
 */
function createOrReplacePanelGroup(type) {
    Validators.checkClass(type, Constants.classNames.string);

    const selectedPanelGroup = HeatingPlannerApplicationState.selectedPanelGroup;

    if (selectedPanelGroup) {
        const originalType = selectedPanelGroup.type;
        UpdatePanelGroupAction.setPanelGroupType(selectedPanelGroup, type);

        if (!selectedPanelGroup.isSelectedForDrag && !PanelGroupCalculations.getContainingRoom(selectedPanelGroup)) {
            displayMessage('A típus változtatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
            createOrReplacePanelGroup(originalType);
        }

        return;
    }

    const panel = new Panel();
    const group = new PanelGroup();
    ElementStore.save(panel);
    ElementStore.save(group);
    UpdatePanelGroupAction.assignPanelToGroup(panel, group);

    const cursorPosition = MouseCursor.getCorrectedMousePositionAbsolute();
    group.middlePoint = cursorPosition;

    SelectionAction.selectObject(group);
    group.clickedMemberIndex = 0;
    group.isSelected = true;
    group.isSelectedForDrag = true;
    UpdatePanelGroupAction.setPanelGroupType(group, type);
}

export const CreatePanelGroupAction = {
    createOrReplacePanelGroup
};