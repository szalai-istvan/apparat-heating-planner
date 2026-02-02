import { Line } from "./Line.js";
import { Constants } from "../../appdata/Constants.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Validators } from "../../validators/Validators.js";
import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Point } from "../Point/Point.js";

/**
 * 
 * @param {Line} line
 * @param {Number} x 
 * @returns {Number}
 */
function calculateY(line, x) {
    Validators.checkClass(x, Constants.classNames.number);

    if (line.n === 0) {
        console.log('Attempt at calculating y value of vertical line!');
        return NaN;
    }

    return line.a * x + line.b;
}

/**
 * 
 * @param {Line} line
 * @returns {Number}
 */
function calculateLengthOfLineInMeters(line) {
    return line.length / ApplicationState.pixelsPerMetersRatio;
}

/**
 * Megvizsgálja, hogy a paraméterül kapott két vonal metszi-e egymást.
 * 
 * @param {Line} line0 
 * @param {Line} line1
 * @returns {boolean} true, ha a két vonal metszi egymást. 
 */
function linesIntersect(line0, line1) {
    if (Math.abs(line0.angleRad - line1.angleRad) < Constants.geometry.parallelityTreshold) {
        return false;
    }

    let intersectionPoint = CreatePoint.createPoint(0, 0);
    if (line0.n === 0) {
        const x = line0.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line1, x);
        return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
    }

    if (line1.n === 0) {
        const x = line1.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line0, x);
        return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
    }

    intersectionPoint.x = (line1.b - line0.b) / (line0.a - line1.a);
    intersectionPoint.y = calculateY(line1, intersectionPoint.x);
    return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
}

/**
 * Megállapítja, hogy a megadott pont a vonal határain belül található-e.
 * 
 * @param {Point} point 
 * @param {Line} line 
 * @returns {boolean}
 */
function pointIsWithinLineBounds(point, line) {
    const x = point.x;
    const y = point.y;

    if (line.n === 0) {
        const yMax = Math.max(line.p0.y, line.p1.y);
        const yMin = Math.min(line.p0.y, line.p1.y);
        return y < yMax && y > yMin;
    }
    
    const xMax = Math.max(line.p0.x, line.p1.x);
    const xMin = Math.min(line.p0.x, line.p1.x);
    return x > xMin && x < xMax;
}


/**
 * Kiszámítja két vonal metszéspontját.
 * 
 * @param {Line} line0 
 * @param {Line} line1 
 * @returns {Point} a metszéspont
 */
function calculateIntersectionPointOfTwoLines(line0, line1) {
    if (Math.abs(line0.angleRad - line1.angleRad) < Constants.geometry.parallelityTreshold) {
        return undefined;
    }

    let intersectionPoint = CreatePoint.createPoint(0, 0);
    if (line0.n === 0) {
        const x = line0.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line1, x);
    } else if (line1.n === 0) {
        const x = line1.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line0, x);
    } else {
        const x = (line1.b - line0.b) / (line0.a - line1.a);
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line1, x);
    }

    if (pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1)) {
        return intersectionPoint;
    }

    return undefined;
}

/**
 * Vonallal kapcsolatos számítások gyűjteménye.
 */
export const LineCalculations = {
    calculateY,
    calculateLengthOfLineInMeters,
    linesIntersect,
    pointIsWithinLineBounds,
    calculateIntersectionPointOfTwoLines
};