import { UploadNewBlueprint } from "../actions/blueprint/UploadNewBlueprint.js";
import { UserActionHandler } from "./userActionHandler/UserActionHandler.js";

/**
 * Új tervrajz létrehozása.
 * 
 * @returns {undefined}
 */
function uploadNewBlueprint() {
    UserActionHandler.handleUserActionNoParam(UploadNewBlueprint.uploadBlueprint);
}

/**
 * Tervrajzok kezelésével kapcsolatos felhasználói műveletek.
 */
export const BlueprintAPI = {
    uploadNewBlueprint
};