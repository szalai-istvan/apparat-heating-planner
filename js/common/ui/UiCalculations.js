import { RoomCalculations } from "../actions/room/RoomCalculations.js";
import { ApplicationState } from "../appdata/ApplicationState.js";

/**
 * Korrigálja az adott limithez a paraméterül kapott koordinátát
 * 
 * @param {number} lim limit paraméter
 * @param {number} coord koordináta paraméter
 * @returns korrigált koordinátaérték
 */
function calculateCorrector(lim, coord) {
    const screenZoom = ApplicationState.screenZoom;
    const dif = lim - coord;
    return (Math.abs(dif) + dif) / (2 * screenZoom);
}

/**
 * Megállapítja, hogy folyamatban van-e valamilyen felhasználói művelet
 * 
 * @returns {boolean}
 */
function operationInProgress() {
    if (ApplicationState.scalingInProgress) {
        return true;
    }
    
    if (ApplicationState.selectedRoom && !RoomCalculations.roomIsConfigured(ApplicationState.selectedRoom)) {
        return true;
    }

    return false;
}

/**
 * Ui kalkuláció függvények
 */
export const UiCalculations = {
    calculateCorrector,
    operationInProgress
};