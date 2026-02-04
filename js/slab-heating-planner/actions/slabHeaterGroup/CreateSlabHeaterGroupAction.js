import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeater } from "../../entities/SlabHeater.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { UpdateSlabHeaterGroupAction } from "./UpdateSlabHeaterGroupAction.js";

/**
 * Létrehoz és visszaad egy födémfűtő csoportot.
 * 
 * @param {number} width, szélesség, opcionális
 * @param {number} length, hosszúság, opcionális
 * @returns {undefined}
 */
function createSlabHeaterGroup(width = undefined, length = undefined) {
    width = width || SlabHeatingPlannerApplicationState.widthMenu.getValue();
    length = length || SlabHeatingPlannerApplicationState.lengthMenu.getValue();

    const slabHeater = new SlabHeater();
    const group = new SlabHeaterGroup();
    ElementStore.save(slabHeater);
    ElementStore.save(group);
    UpdateSlabHeaterGroupAction.assignSlabHeaterToGroup(slabHeater, group);

    const cursorPosition = MouseCursor.getCorrectedMousePositionAbsolute();
    group.middlePoint = cursorPosition;

    SelectionAction.selectObject(group);
    group.clickedMemberIndex = 0;
    group.isSelected = true;
    group.isSelectedForDrag = true;
    UpdateSlabHeaterGroupAction.setSlabHeaterGroupType(group, width, length);
}

export const CreateSlabHeaterGroupAction = {
    createSlabHeaterGroup
};