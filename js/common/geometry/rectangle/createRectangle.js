import { LineCalculations } from "../line/LineCalculations.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";
import { PointCalculations } from "../Point/PointCalculations.js";
import { Rectangle } from "./Rectangle.js";

/**
 * Létrehoz egy téglalapot és visszaadja.
 * 
 * @param {Point} middlePoint 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} angleRad 
 * 
 * @returns {Rectangle}
 */
function createRectangleByMiddlePoint(middlePoint, width, height, angleRad) {
    const vector0 = PointCalculations.multiplyPoint(CreatePoint.createPoint(Math.cos(angleRad), Math.sin(angleRad)), width/2);
    const vector1 = PointCalculations.multiplyPoint(CreatePoint.createPoint(Math.sin(angleRad), -1 * Math.cos(angleRad)), height/2);
    const vector0Negative = PointCalculations.multiplyPoint(vector0, -1);
    const vector1Negative = PointCalculations.multiplyPoint(vector1, -1);

    const points = [];
    points.push(PointCalculations.addPoints([middlePoint, vector0, vector1]));
    points.push(PointCalculations.addPoints([middlePoint, vector0, vector1Negative]));
    points.push(PointCalculations.addPoints([middlePoint, vector0Negative, vector1Negative]));
    points.push(PointCalculations.addPoints([middlePoint, vector0Negative, vector1]));
    return new Rectangle(points);
}

/**
 * Lemásolja a paraméterül kapott téglalapot eltérő középponttal
 * 
 * @param {Rectangle} rectangle,
 * @param {Point} middlePoint,
 * @returns {Rectangle}
 */
function copyRectangleAtMiddlePoint(rectangle, middlePoint) {
    const width = rectangle.lines[1].length;
    const height = rectangle.lines[0].length;
    const angleRad = rectangle.lines[1].angleRad;

    return createRectangleByMiddlePoint(middlePoint, width, height, angleRad);
}

/**
 * Téglalap létrehozásával kapcsolatos műveletek gyüjteménye.
 */
export const CreateRectangle = {
    createRectangleByMiddlePoint,
    copyRectangleAtMiddlePoint
};