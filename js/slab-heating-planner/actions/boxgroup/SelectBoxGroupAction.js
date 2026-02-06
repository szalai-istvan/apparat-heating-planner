import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { BoxGroup } from "../../entities/BoxGroup.js";
import { BoxGroupService } from "../../service/BoxGroupService.js";
import { BoxService } from "../../service/BoxService.js";
import { BoxGroupCalculations } from "./BoxGroupCalculations.js";

/** @type {BoxGroup} */
let cachedSelectableBoxGroup = null;

/**
 * Megkeresi és kiválasztja a doboz csoportot és visszaadja
 * 
 * @param {BoxGroup} boxGroup Opcionális paraméter, specifikálható a kiválasztandó csoport.
 * @returns {BoxGroup} a kiválasztott csoport.
 */
function selectBoxGroup(boxGroup = undefined) {
    Validators.checkClass(boxGroup, SlabHeatingPlannerConstants.classNames.boxGroup, true);

    boxGroup = boxGroup || checkForSelectableBoxGroup();
    if (!boxGroup) {
        return;
    }

    if (boxGroup === SlabHeatingPlannerApplicationState.selectedBoxGroup) {
        boxGroup.isSelected = true;
        boxGroup.isSelectedForDrag = true;
        return boxGroup;
    }
    
    if (SelectionAction.deselectObject()) {
        boxGroup.isSelected = true;
        SlabHeatingPlannerApplicationState.selectedBoxGroup = boxGroup;
        setSelectedBoxGroupIndex(boxGroup);
        return boxGroup;
    }

    return undefined;
}

/**
 * Megkeresi és visszaadja a kiválasztható dobozcsoportot.
 * 
 * @returns {BoxGroup}
 */
function searchForSelectableBoxGroup() {
    const selectedBoxGroup = selectBoxGroup();
    if (selectedBoxGroup) {
        ApplicationState.selectedObject = selectedBoxGroup;
        return selectedBoxGroup;
    }
}

/**
 * Megkeresi a kiválasztható elosztódoboz csoportot és visszaadja
 * 
 * @returns {BoxGroup} a kiválasztható elosztódoboz csoport.
 */
function checkForSelectableBoxGroup() {

    if (cachedSelectableBoxGroup) {
        return cachedSelectableBoxGroup;
    }

    const selectableBox = BoxService.findAll().filter(p => SelectionCriteria.evaluateSelectionCriteria(p))[0];
    if (!selectableBox) {
        return undefined;
    }

    const selectableBoxGroup = BoxGroupService.findById(selectableBox.groupId);
    if (selectableBoxGroup) {
        cachedSelectableBoxGroup = selectableBoxGroup;
        return selectableBoxGroup;
    }

    return undefined;
}

/**
 * Megkíséreli megszüntetni a doboz csoport kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectBoxGroup() {
    const boxGroup = SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!boxGroup) {
        return true;
    }

    // const containingRoom = BoxGroupCalculations.getContainingRoom(boxGroup);
    // if (!containingRoom) {
    //     Errors.throwError(ErrorCodes.BOX_GROUP_OUTSIDE_ROOM);
    //     return false;
    // } ha mégis kéne szobához tartozást validálni.

    boxGroup.isSelected = false;
    boxGroup.isSelectedForDrag = false;

    SlabHeatingPlannerApplicationState.selectedBoxGroup = null;
    return true;
}

/**
 * Kiüríti a kiválasztásra cachelt doboz csoportot
 * 
 * @returns {undefined}
 */
function clearBoxGroupSelectionCache() {
    cachedSelectableBoxGroup = null;
}

/**
 * Beállítja hogy hanyadik dobozra van rákattintva a csoportban.
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {undefined}
 */
function setSelectedBoxGroupIndex(boxGroup) {
    let index = 0;
    while (index < boxGroup.boxIds.length) {
        const box = BoxService.findById(boxGroup.boxIds[index]);
        if (SelectionCriteria.evaluateSelectionCriteria(box)) {
            boxGroup.clickedMemberIndex = index;
            return;
        }
        index++;
    }
    
    boxGroup.clickedMemberIndex = undefined;
}

export const SelectBoxGroupAction = {
    selectBoxGroup,
    deselectBoxGroup,
    searchForSelectableBoxGroup,
    clearBoxGroupSelectionCache
};