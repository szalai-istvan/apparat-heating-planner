import { ReducerFunctions } from "../../math/ReducerFunctions.js";
import { CreateLine } from "../Line/CreateLine.js";
import { Line } from "../Line/Line.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";
import { PointCalculations } from "../Point/PointCalculations.js";

/**
 * Téglalap osztály.
 */
export class Rectangle {
    /** @type {Point[]} */
    points = [];
    /** @type {Line[]} */
    lines = [];
    /** @type {Point} */
    middlePoint;

    constructor(points) {
        if (!points || points.length !== 4) {
            throw new Error(`Rectangle definition needs exactly four points. ${points.length} provided`);
        }

        this.points = points;

        let index = 0;
        while (index < 4) {
            this.lines.push(CreateLine.createLine(points[index], points[(index + 1) % 4]));
            index+=1;
        }

        const middleX = points.map(p => p.x).reduce(ReducerFunctions.sumFunction) / 4;
        const middleY = points.map(p => p.y).reduce(ReducerFunctions.sumFunction) / 4;
        this.middlePoint = CreatePoint.createPoint(middleX, middleY);
    }
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