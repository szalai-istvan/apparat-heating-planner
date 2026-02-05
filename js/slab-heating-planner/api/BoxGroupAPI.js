import { UserActionHandler } from "../../common/api/userActionHandler/UserActionHandler.js";
import { CreateBoxGroupAction } from "../actions/boxgroup/CreateBoxGroupAction.js";

/**
 * Új dobozcsoport létrehozása
 * 
 * @returns {undefined}
 */
function createBoxGroup() {
    UserActionHandler.handleUserActionNoParam(CreateBoxGroupAction.createBoxGroup);
}

export const BoxGroupAPI = {
    createBoxGroup
};