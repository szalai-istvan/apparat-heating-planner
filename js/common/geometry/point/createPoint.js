import { Constants } from "../../appdata/Constants.js";
import { Validators } from "../../validators/Validators.js";
import { Point } from "./Point.js";

/**
 * Létrehoz és visszaad egy pontot.
 * 
 * @param {number} x koordináta
 * @param {number} y koordináta
 * @returns {Point} a létrehozott pont objektum
 */
function createPoint(x, y) {
    Validators.checkClass(x, Constants.classNames.number);
    Validators.checkClass(y, Constants.classNames.number);
    return new Point(x, y);
}

/**
 * Létrehoz és visszaad egy adott irányba mutató egységvektort.
 * 
 * @param {number} angleRad koordináta
 * @returns {Point} a létrehozott objektum
 */
function createUnitVector(angleRad) {
    return createPoint(Math.cos(angleRad), Math.sin(angleRad));
}

/**
 * Pont létrehozó és egységvektor létrehozó függvények gyűjteménye.
 */
export const CreatePoint = {
    createPoint,
    createUnitVector
};