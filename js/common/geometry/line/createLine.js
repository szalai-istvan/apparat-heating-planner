import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";
import { PointCalculations } from "../Point/PointCalculations.js";
import { Line } from "./Line.js";

/**
 * Létrehoz és visszaad egy egyenest.
 * 
 * @param {Point} p0 
 * @param {Point} p1 
 * @returns {Line}
 */
function createLine(p0, p1) {
    return new Line(p0, p1);
}

/**
 * Létrehoz és visszaad egy tesztvonalat.
 * 
 * @param {Point} p0 
 * @returns {Line}
 */
function createTestLine(p0) {
    return new Line(p0, ApplicationState.testPoint);
}

/**
 * Létrehoz egy vonalat a megadott pont és a dőlésszög alapján és visszaadja.
 * 
 * @param {Point} p0 
 * @param {Number} angleRad 
 * @returns {Line}
 */
function createLineByPointAndAngle(p0, angleRad) {
    const vector = CreatePoint.createUnitVector(angleRad);
    const offsetPositive = PointCalculations.multiplyPoint(vector, Constants.geometry.infiniteLineLength);
    const offsetNegative = PointCalculations.multiplyPoint(vector, -1 * Constants.geometry.infiniteLineLength);
    const p1 = PointCalculations.addPoints([offsetPositive, p0]);
    const p2 = PointCalculations.addPoints([offsetNegative, p0]);
    return createLine(p1, p2);
}

/**
 * Vonal létrehozó függvények gyüjteménye.
 */
export const CreateLine = {
    createLine,
    createTestLine, 
    createLineByPointAndAngle
};