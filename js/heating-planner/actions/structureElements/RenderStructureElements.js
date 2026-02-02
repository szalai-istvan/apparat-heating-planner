import { Constants } from "../../../common/appdata/Constants.js";
import { Line } from "../../../common/geometry/Line/Line.js";
import { LineCalculations } from "../../../common/geometry/line/LineCalculations.js";
import { PointCalculations } from "../../../common/geometry/Point/PointCalculations.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";
import { StructureElements } from "../../entities/StructureElements.js";

/**
 * Felrajzol a képernyőre egy szobányi tartószerkezetet.
 * 
 * @param {StructureElements} structureElements 
 * @returns {undefined}
 */
function renderStructureElements(structureElements) {
    Validators.checkClass(structureElements, HeatingPlannerConstants.classNames.structureElements);

    const room = RoomService.findById(structureElements.roomId);
    const beamLineWidthPixel = HeatingPlannerApplicationState.beamLineWidthPixel;
    const beamWidthPixel = HeatingPlannerApplicationState.beamWidthPixel;

    if (!room || !room.firstPoint) {
        return;
    }

    push();

    translate(room.firstPoint.x, room.firstPoint.y);
    rotate(room.angleRad);
    rectMode(CENTER);
    stroke(Constants.strings.black);
    strokeWeight(beamLineWidthPixel);
    textAlign(CENTER, CENTER);
    fill(HeatingPlannerConstants.beam.beamColor);

    let horizontalBeams;
    let verticalBeams;

    if (structureElements.alignment % 2 === 0) {
        horizontalBeams = structureElements.alignedBeams;
        verticalBeams = structureElements.crossBeams;
    } else {
        horizontalBeams = structureElements.crossBeams;
        verticalBeams = structureElements.alignedBeams;
    }

    for (let beam of horizontalBeams) {
        rect(beam.middlePoint.x, beam.middlePoint.y, beam.length, beamWidthPixel);
        drawCD3060BeamNames(beam);
    }

    for (let beam of verticalBeams) {
        rect(beam.middlePoint.x, beam.middlePoint.y, beamWidthPixel, beam.length);
        drawCD3060BeamNames(beam, HALF_PI);
    }

    pop();
}

/** @param {Line} beam */
function drawCD3060BeamNames(beam, rotateRad = 0) {
    const middlePoint = PointCalculations.rotatePoint(beam.middlePoint, -rotateRad);
    const leftPoint = PointCalculations.rotatePoint(beam.leftPoint, -rotateRad);
    const rightPoint = PointCalculations.rotatePoint(beam.rightPoint, -rotateRad);

    push();

    textSize(HeatingPlannerApplicationState.beamTextSize);
    noStroke();
    fill(Constants.strings.black);
    rotate(rotateRad);
    text(HeatingPlannerConstants.beam.cd3060BeamTypeName, leftPoint.x, leftPoint.y);
    text(HeatingPlannerConstants.beam.cd3060BeamTypeName, rightPoint.x, rightPoint.y);
    if (LineCalculations.calculateLengthOfLineInMeters(beam) > 1) {
        text(HeatingPlannerConstants.beam.cd3060BeamTypeName, middlePoint.x, middlePoint.y);
    }

    pop();
}

/**
 * Felrajzolja a képernyőre az UD30 gerendákat
 * 
 * @param {StructureElements} structureElements 
 * @returns {undefined}
 */
function renderUd30(structureElements) {
    Validators.checkClass(structureElements, HeatingPlannerConstants.classNames.structureElements);

    const room = RoomService.findById(structureElements.roomId);
    if (!room || !room.firstPoint) {
        return;
    }

    const ud30Beams = structureElements.ud30Beams;
    const beamLineWidthPixel = HeatingPlannerApplicationState.beamLineWidthPixel;
    const ud30WidthPixel = HeatingPlannerApplicationState.ud30WidthPixel;

    if (ud30Beams.length === 0) {
        return;
    }

    push();

    translate(room.firstPoint.x, room.firstPoint.y);
    rotate(room.angleRad);
    rectMode(CENTER);
    stroke(Constants.strings.black);
    strokeWeight(beamLineWidthPixel / 2);
    textAlign(CENTER, CENTER);
    fill(HeatingPlannerConstants.beam.beamColor);

    rect(ud30Beams[0].middlePoint.x, ud30Beams[0].middlePoint.y, ud30WidthPixel, ud30Beams[0].length);
    drawUD30BeamNames(ud30Beams[0], HALF_PI);
    rect(ud30Beams[1].middlePoint.x, ud30Beams[1].middlePoint.y, ud30Beams[1].length, ud30WidthPixel);
    drawUD30BeamNames(ud30Beams[1]);
    rect(ud30Beams[2].middlePoint.x, ud30Beams[2].middlePoint.y, ud30WidthPixel, ud30Beams[2].length);
    drawUD30BeamNames(ud30Beams[2], HALF_PI);
    rect(ud30Beams[3].middlePoint.x, ud30Beams[3].middlePoint.y, ud30Beams[3].length, ud30WidthPixel);
    drawUD30BeamNames(ud30Beams[3]);

    pop();
}


/** @param {Line} beam */
function drawUD30BeamNames(beam, rotateRad = 0) {
    const middlePoint = PointCalculations.rotatePoint(beam.middlePoint, -rotateRad);
    const leftPoint = PointCalculations.rotatePoint(beam.leftPoint, -rotateRad);
    const rightPoint = PointCalculations.rotatePoint(beam.rightPoint, -rotateRad);
    const beamTextSize = HeatingPlannerApplicationState.beamTextSize;

    push();

    textSize(beamTextSize / 2);
    noStroke();
    fill(Constants.strings.black);
    rotate(rotateRad);
    text(HeatingPlannerConstants.beam.ud30BeamTypeName, leftPoint.x, leftPoint.y);
    text(HeatingPlannerConstants.beam.ud30BeamTypeName, rightPoint.x, rightPoint.y);
    if (LineCalculations.calculateLengthOfLineInMeters(beam) > 1) {
        text(HeatingPlannerConstants.beam.ud30BeamTypeName, middlePoint.x, middlePoint.y);
    }

    pop();
}

/**
 * Szerkezeti elemek renderelésével kapcsolatos műveletek.
 */
export const RenderStructureElements = {
    renderStructureElements,
    renderUd30
};