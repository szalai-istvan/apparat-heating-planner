import { UserActionHandler } from "../../common/api/userActionHandler/UserActionHandler.js";
import { CreateSlabHeaterGroupAction } from "../actions/slabHeaterGroup/CreateSlabHeaterGroupAction.js";
import { UpdateSlabHeaterGroupAction } from "../actions/slabHeaterGroup/UpdateSlabHeaterGroupAction.js";

/**
 * Új slabHeatercsoport létrehozása. Amennyiben van kiválasztott slabHeatercsoport, úgy a meglévő típusát váltja le.
 * 
 * @returns {undefined}
 */
function createSlabHeaterGroup() {
    UserActionHandler.handleUserActionNoParam(CreateSlabHeaterGroupAction.createSlabHeaterGroup);
}

/**
 * A kiválasztott födémfűtő csoport méreteinek átállítása.
 */
function updateSelectedSlabHeaterGroupDimensions() {
    UserActionHandler.handleUserActionNoParam(UpdateSlabHeaterGroupAction.updateSelectedSlabHeaterGroupDimensions);
}

/**
 * Fűtőelem csoportokkal kapcsolatos műveletek.
 */
export const SlabHeaterGroupAPI = {
    createSlabHeaterGroup,
    updateSelectedSlabHeaterGroupDimensions
};