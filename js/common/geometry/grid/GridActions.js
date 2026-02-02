import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Validators } from "../../validators/Validators.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";
/**
 * Beállítja a paraméterül kapott pontot a grid origójaként.
 * 
 * @param {Point} point paraméter
 * @returns {undefined} 
 */
function setGlobalGridSeed(point) {
    Validators.checkClass(point, Constants.classNames.point);

    if (ApplicationState.gridSeed) {
        return;
    }

    ApplicationState.gridSeed = CreatePoint.createPoint(point.x, point.y);
}

/**
 * Kinullázza a globális gridet.
 * 
 * @returns {undefined} 
 */
function clearGrid() {
    ApplicationState.gridSeed = null;
}

/**
 * Rajzlap rácshálóval kapcsolatos műveletek.
 */
export const GridActions = {
    clearGrid,
    setGlobalGridSeed
};