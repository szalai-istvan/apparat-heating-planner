import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/constants.js";
import { CreatePoint } from "../point/createPoint.js";
import { Point } from "../point/Point.js";
import { PointCalculations } from "../point/PointCalculations.js";
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
 * Létrehoz és visszaad egy a paraméterül kapott vonallal párhuzamos vonalat, a megadott offsettel.
 * 
 * @param {Line} line 
 * @param {number} offset 
 * @returns {Line}
 */
function createOffsetParallelLine(line, offset) {
    if (line.n === 0) { // line is vertical
        const p0 = CreatePoint.createPoint(line.p0.x + offset, line.p0.y);
        return createLineByPointAndAngle(p0, line.angleRad);
    }

    const p0 = CreatePoint.createPoint(
        line.p0.x, 
        line.p0.y + offset / Math.abs(Math.cos(line.angleRad))
    );

    return createLineByPointAndAngle(p0, line.angleRad);
}

/**
 * Visszaad egy párhuzamos vonalat, amely átmegy a paraméterül kapott ponton
 * 
 * @param {Line} line 
 * @param {Point} point
 * @returns {Line}
 */
function createLineParallelTo(line, point) {
    if (line.n === 0) { // line is vertical
        return createLineByPointAndAngle(point, line.angleRad);
    }

    return createLineByPointAndAngle(point, line.angleRad);
}

/**
 * Visszaad egy merőleges vonalat, amely átmegy a paraméterül kapott ponton
 * 
 * @param {Line} line 
 * @param {Point} p 
 * @returns {Line}
 */
function createPerpendicularLine(line, p) {
    if (line.n === 0) {
        return createLineByPointAndAngle(p, 0);
    }

    // @ts-ignore
    return createLineByPointAndAngle(p, line.angleRad + HALF_PI);
}

/**
 * Vonal létrehozó függvények gyüjteménye.
 */
export const CreateLine = {
    createLine,
    createTestLine,
    createLineParallelTo,
    createPerpendicularLine,
    createOffsetParallelLine,
    createLineByPointAndAngle
};