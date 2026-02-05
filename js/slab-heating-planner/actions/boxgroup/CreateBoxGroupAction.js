import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { Box } from "../../entities/Box.js";
import { BoxGroup } from "../../entities/BoxGroup.js";
import { UpdateBoxGroupAction } from "./UpdateBoxGroupAction.js";

/**
 * Létrehoz egy új doboz csoportot
 * 
 * @returns {undefined}
 */
function createBoxGroup() {
    const box = new Box();
    const group = new BoxGroup();
    ElementStore.save(box);
    ElementStore.save(group);

    UpdateBoxGroupAction.assignBoxToGroup(box, group);

    const cursorPosition = MouseCursor.getCorrectedMousePositionAbsolute();
    group.middlePoint = cursorPosition;

    SelectionAction.selectObject(group);
    group.clickedMemberIndex = 0;
    group.isSelected = true;
    group.isSelectedForDrag = true;
}

/**
 * Dobozcsoportok létrehozásával kapcsolatos műveletek
 */
export const CreateBoxGroupAction = {
    createBoxGroup
};