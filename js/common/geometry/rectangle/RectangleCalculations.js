import { ReducerFunctions } from "../../math/ReducerFunctions.js";
import { CreateLine } from "../Line/CreateLine.js";
import { LineCalculations } from "../line/LineCalculations.js";
import { Point } from "../Point/Point.js";
import { PointCalculations } from "../Point/PointCalculations.js";
import { Rectangle } from "./Rectangle.js";

/**
 * Kiszámítja a téglalap x irányú vetületét.
 * 
 * @param {Rectangle} rectangle
 * @returns {number} Téglalap x irányú mérete
 */
function getProjectedSizeX(rectangle) {
    if (!rectangle) {
        return 0;
    }

    const xCoordinates = rectangle.points.map(p => p.x);
    const minX = xCoordinates.reduce(ReducerFunctions.minimumFunction);
    const maxX = xCoordinates.reduce(ReducerFunctions.maximumFunction);

    return Math.abs(maxX - minX);
}

/**
 * Kiszámítja a téglalap y irányú vetületét.
 * 
 * @param {Rectangle} rectangle
 * @returns {number} Téglalap y irányú mérete
 */
function getProjectedSizeY(rectangle) {
    if (!rectangle) {
        return 0;
    }

    const xCoordinates = rectangle.points.map(p => p.y);
    const minY = xCoordinates.reduce(ReducerFunctions.minimumFunction);
    const maxY = xCoordinates.reduce(ReducerFunctions.maximumFunction);

    return Math.abs(maxY - minY);
}

/**
 * Megállapítja, hogy a paraméterül kapott pont a paraméterül kapott téglalapban található-e.
 * 
 * @param {Point} point
 * @param {Rectangle} rectangle
 * @returns {boolean} true, ha a pont a téglalapon belül van
 */
function pointIsInsideRectangle(point, rectangle) {
    const lines = rectangle.lines;
    const testerLine = CreateLine.createTestLine(point);
    let intersectedLines = 0;
    for (let line of lines) {
        if (LineCalculations.linesIntersect(line, testerLine)) {
            intersectedLines += 1;
        }
    }

    return (intersectedLines % 2) === 1;
}

/**
 * Megvizsgálja, hogy van-e metszete a két paraméterül megadott téglalapnak.
 * 
 * @param {Rectangle} rectangle1 
 * @param {Rectangle} rectangle2 
 * @returns {boolean} true, ha van metszet.
 */
function rectanglesOverlap(rectangle1, rectangle2) {
    for (let p of rectangle1.points) {
        if (pointIsInsideRectangle(p, rectangle2)) {
            return true;
        }
    }

    for (let p of rectangle2.points) {
        if (pointIsInsideRectangle(p, rectangle1)) {
            return true;
        }
    }

    return false;
}

/**
 * Megállapítja, hogy a paraméterül kapott téglalap teljes mértékig benne van-e a másik téglalapban.
 * 
 * @param {Rectangle} insideRectangle
 * @param {Rectangle} outsideRectangle
 * @returns {boolean}
 */
function rectangleIsInsideRectangle(insideRectangle, outsideRectangle) {
    for (let point of insideRectangle.points) {
        if (!pointIsInsideRectangle(point, outsideRectangle)) {
            return false;
        }
    }

    return true;
}

/**
 * Kiszámítja és visszaadja a téglalap kerületét pixel mértékegységben
 * 
 * @param {Rectangle} rectangle 
 * @returns {Number}
 */
function calculateRectangleCircumference(rectangle) {
    const points = rectangle.points;
    const p0 = points[0];
    const p1 = points[1];
    const p2 = points[2];

    return 2 * (PointCalculations.calculateDistance(p0, p1) + PointCalculations.calculateDistance(p1, p2));
}

/**
 * Téglalap kalkulációk.
 */
export const RectangleCalculations = {
    getProjectedSizeX,
    getProjectedSizeY,
    pointIsInsideRectangle,
    rectanglesOverlap,
    rectangleIsInsideRectangle,
    calculateRectangleCircumference
};