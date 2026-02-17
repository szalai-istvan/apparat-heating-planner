// @ts-nocheck

import { Constants } from "../../../common/appdata/Constants.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { PipeDriverCalculations } from "./PipeDriverCalculations.js";
import { UpdatePipeDriverAction } from "./UpdatePipeDriverAction.js";

/** @type {boolean} */
let middleLineRenderingEnabled = true;

/**
 * Felrajzolja a képernyőre a paraméterül kapott csővezetőt
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {undefined}
 */
function renderPipeDriver(pipeDriver) {
    Validators.checkClass(pipeDriver, SlabHeatingPlannerConstants.classNames.pipeDriver);

    UpdatePipeDriverAction.updatePropositions(pipeDriver);
    UpdatePipeDriverAction.updateSelectedPointPosition(pipeDriver);

    const isSelected = pipeDriver.isSelected;
    const mouseCursorIsInsidePoint = PipeDriverCalculations.mouseCursorIsInsidePipeDriversPoint(pipeDriver);
    const lineThickness = SlabHeatingPlannerApplicationState.pipeDriverPipeThicknessInPixels;
    const diameter = SlabHeatingPlannerApplicationState.pipeDriverNodeDiameterInPixels * (1 + 0.2 * Number(mouseCursorIsInsidePoint));
    const circleThickness = SlabHeatingPlannerApplicationState.pipeDriverNodeThicknessInPixels;
    const regularColor = (isSelected || mouseCursorIsInsidePoint) ? Constants.strings.red : Constants.strings.black;
    const proposedColor = Constants.strings.darkgrey;
    const selectedPoint = pipeDriver.points[pipeDriver.selectedPointIndex];

    const points = pipeDriver.points;
    const proposedPoints = pipeDriver.proposedPoints;
    const segments = pipeDriver.segments;
    const proposedSegments = pipeDriver.proposedSegments;

    push();
    ellipseMode(CENTER);
    strokeWeight(lineThickness);

    stroke(regularColor);
    if (middleLineRenderingEnabled) {
        for (let segment of segments) {
            line(segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y);
        }
    }
    stroke(proposedColor);
    if (middleLineRenderingEnabled) {
        for (let segment of proposedSegments) {
            line(segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y);
        }
    }

    strokeWeight(circleThickness);
    stroke(regularColor);
    if (middleLineRenderingEnabled) {
        for (let p of points.filter(p => p !== selectedPoint)) {
            ellipse(p.x, p.y, diameter, diameter);
        }
        if (selectedPoint) {
            push();
            fill(Constants.strings.red);
            ellipse(selectedPoint.x, selectedPoint.y, diameter, diameter);
            pop();
        }
    }


    stroke(proposedColor);
    if (middleLineRenderingEnabled) {
        for (let p of proposedPoints) {
            ellipse(p.x, p.y, diameter, diameter);
        }
    }

    strokeWeight(SlabHeatingPlannerApplicationState.pipeLineWeightInPixels);
    stroke(Constants.strings.blue);
    for (let bluePipe of pipeDriver.bluePipe) {
        line(bluePipe.p0.x, bluePipe.p0.y, bluePipe.p1.x, bluePipe.p1.y);
    }

    stroke(Constants.strings.red);
    for (let redPipe of pipeDriver.redPipe) {
        line(redPipe.p0.x, redPipe.p0.y, redPipe.p1.x, redPipe.p1.y);
    }

    pop();
}

/**
 * Kikapcsolja a középvonal renderelését
 * 
 * @returns {undefined}
 */
function disableMiddleLineRendering() {
    middleLineRenderingEnabled = false;
}

/**
 * Bekapcsolja a középvonal renderelését
 * 
 * @returns {undefined}
 */
function enableMiddleLineRendering() {
    middleLineRenderingEnabled = true;
}

/**
 * Csőnyomvonalak rajzolásához kapcsolódó műveletek. 
 */
export const RenderPipeDriver = {
    renderPipeDriver,
    enableMiddleLineRendering,
    disableMiddleLineRendering,
};