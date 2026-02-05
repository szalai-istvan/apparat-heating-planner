import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { MathTools } from "../../../common/math/MathTools.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { SlabHeaterGroupCalculations } from "./SlabHeaterGroupCalculations.js";
import { UpdateSlabHeaterGroupAction } from "./UpdateSlabHeaterGroupAction.js";

/** @type {SlabHeaterGroup} */
let cachedSelectableSlabHeaterGroup = null;


/**
 * Megkeresi és kiválasztja a födémfűtő csoportot és visszaadja
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup Opcionális paraméter, specifikálható a kiválasztandó födémfűtő csoport.
 * @returns {SlabHeaterGroup} a kiválasztott födémfűtő csoport.
 */
function selectSlabHeaterGroup(slabHeaterGroup = undefined) {
    Validators.checkClass(slabHeaterGroup, SlabHeatingPlannerConstants.classNames.slabHeaterGroup, true);

    slabHeaterGroup = slabHeaterGroup || checkForSelectableSlabHeaterGroup();
    if (!slabHeaterGroup) {
        return;
    }

    if (slabHeaterGroup === SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup) {
        slabHeaterGroup.isSelected = true;
        slabHeaterGroup.isSelectedForDrag = true;
        setSelectedSlabHeaterGroupIndex(slabHeaterGroup);
        slabHeaterGroup.roomId = null;
        return slabHeaterGroup;
    }

    if (SelectionAction.deselectObject()) {
        slabHeaterGroup.isSelected = true;
        SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup = slabHeaterGroup;
        setOptionBarValues(slabHeaterGroup);
        return slabHeaterGroup;
    }

    return undefined;
}

/**
 * Megkeresi és visszaadja a kiválasztható födémfűtő csoportot.
 * 
 * @returns {SlabHeaterGroup}
 */
function searchForSelectableSlabHeaterGroup() {
    const selectedSlabHeaterGroup = selectSlabHeaterGroup();
    if (selectedSlabHeaterGroup) {
        ApplicationState.selectedObject = selectedSlabHeaterGroup;
        return selectedSlabHeaterGroup;
    }
}

/**
 * Megkeresi a kiválasztható födémfűtő csoportot és visszaadja
 * 
 * @returns {SlabHeaterGroup} a kiválasztható födémfűtő csoport.
 */
function checkForSelectableSlabHeaterGroup() {
    if (cachedSelectableSlabHeaterGroup) {
        return cachedSelectableSlabHeaterGroup;
    }

    const selectableSlabHeater = SlabHeaterService.findAll().filter(p => SelectionCriteria.evaluateSelectionCriteria(p))[0];
    if (!selectableSlabHeater) {
        return undefined;
    }

    const selectableSlabHeaterGroup = SlabHeaterGroupService.findById(selectableSlabHeater.groupId);
    if (selectableSlabHeaterGroup) {
        cachedSelectableSlabHeaterGroup = selectableSlabHeaterGroup;
        return selectableSlabHeaterGroup;
    }

    return undefined;
}

function setOptionBarValues(slabHeaterGroup) {
    if (!(slabHeaterGroup.width && slabHeaterGroup.length)) {
        return;
    }

    const optionBarW = SlabHeatingPlannerApplicationState.widthMenu;
    const optionBarL = SlabHeatingPlannerApplicationState.lengthMenu;

    optionBarW.setValue(0, slabHeaterGroup.width.toString(), false);
    const meter = Math.floor(slabHeaterGroup.length).toString();
    const cm = (Math.floor(MathTools.roundNumber(slabHeaterGroup.length - Math.floor(slabHeaterGroup.length), 2) * 100)).toString();
    optionBarL.setValue(0, meter, false);
    optionBarL.setValue(1, cm, false);
}

/**
 * Beállítja hogy hanyadik födémfűtőre van rákattintva a csoportban.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {undefined}
 */
function setSelectedSlabHeaterGroupIndex(slabHeaterGroup) {
    let index = 0;
    while (index < slabHeaterGroup.slabHeaterIds.length) {
        const slabHeater = SlabHeaterService.findById(slabHeaterGroup.slabHeaterIds[index]);
        if (SelectionCriteria.evaluateSelectionCriteria(slabHeater)) {
            slabHeaterGroup.clickedMemberIndex = index;
            return;
        }
        index++;
    }

    slabHeaterGroup.clickedMemberIndex = undefined;
}

/**
 * Megkíséreli megszüntetni a födémfűtő csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectSlabHeaterGroup() {
    const slabHeaterGroup = SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return true;
    }

    const containingRoom = SlabHeaterGroupCalculations.getContainingRoom(slabHeaterGroup);
    if (!containingRoom) {
        Errors.throwError(ErrorCodes.SLAB_HEATER_GROUP_OUTSIDE_ROOM);
        return false;
    }

    UpdateSlabHeaterGroupAction.assignSlabHeaterGroupToRoom(slabHeaterGroup, containingRoom);

    UpdateSlabHeaterGroupAction.updatePositionDataIncludingMembers(slabHeaterGroup);
    slabHeaterGroup.isSelected = false;
    slabHeaterGroup.isSelectedForDrag = false;
    SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup = null;

    return true;
}

/**
 * Kiüríti a kiválasztásra cachelt födémfűtő csoportot
 * 
 * @returns {undefined}
 */
function clearSlabHeaterGroupSelectionCache() {
    cachedSelectableSlabHeaterGroup = null;
}

/**
 * Födémfűtő csoportok kiválasztásával kapcsolatos műveletek.
 */
export const SelectSlabHeaterGroupAction = {
    selectSlabHeaterGroup,
    deselectSlabHeaterGroup,
    clearSlabHeaterGroupSelectionCache,
    searchForSelectableSlabHeaterGroup
};