import { Constants } from "../../../common/appdata/Constants.js";
import { Room } from "../../../common/entities/Room.js";
import { CreateLine } from "../../../common/geometry/Line/CreateLine.js";
import { Line } from "../../../common/geometry/Line/Line.js";
import { LineCalculations } from "../../../common/geometry/line/LineCalculations.js";
import { CreatePoint } from "../../../common/geometry/Point/CreatePoint.js";
import { PointCalculations } from "../../../common/geometry/Point/PointCalculations.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { ReducerFunctions } from "../../../common/math/ReducerFunctions.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { StructureElements } from "../../entities/StructureElements.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { PanelService } from "../../service/PanelService.js";
import { StructureElementsService } from "../../service/StructureElementsService.js";

/**
 * Újraszámolja a szerkezeti elemek definícióját.
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function recalculateBeamDefinitions(room) {
    Validators.checkClass(room, Constants.classNames.room);

    // if (selectedPanelGroup.isSelectedForDrag) {
        // return;
    // } TODO Ez vajon kell?

    const structureElements = StructureElementsService.findById(room.structureElementsId);
    const panelGroups = PanelGroupService.findByRoomId(room.id);
    structureElements.alignment = panelGroups.length > 0 ? panelGroups[0].alignment % 2 : undefined;

    const alignedBeams = [];
    for (let panelGroup of panelGroups) {
        const beams = calculateAlignedBeamsOfPanelGroup(room, panelGroup);
        beams.forEach(b => alignedBeams.push(b));
    }

    structureElements.alignedBeams = alignedBeams;
    structureElements.crossBeams = calculateCrossBeams(room, panelGroups);
    structureElements.ud30Beams = calculateUd30Beams(room, panelGroups);

    purifyStructureElements(room, structureElements);
}

/**
 * Kiszámítja a panelcsoporthoz tartozó tartógerendák pozícióját és visszaadja.
 * 
 * @param {Room} room 
 * @param {PanelGroup} panelGroup 
 * @returns {Line[]}
 */
function calculateAlignedBeamsOfPanelGroup(room, panelGroup) {
    const panels = PanelService.findByIdList(panelGroup.panelIds);

    if (panels.length === 0) {
        return [];
    }

    const referencePoints = panels.map(p => p.boundingBox).map(bb => bb.points[0]);
    referencePoints.push(panels[panels.length - 1].boundingBox.points[1]);
    referencePoints.push(panels[0].boundingBox.points[1]);

    const boundingBoxLines = room.boundingBox.lines;
    const direction = room.angleRad + panelGroup.alignment * HALF_PI;
    const firstPointCorrector = PointCalculations.multiplyPoint(room.firstPoint, -1);

    /** @type {Line[]} */
    const beams = [];
    for (let referencePoint of referencePoints) {
        const referenceLine = CreateLine.createLineByPointAndAngle(referencePoint, direction);
        const intersectionPoints = boundingBoxLines
            .map(bbl => LineCalculations.calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = CreateLine.createLine(
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );

        // intentionally used invalid fields!
        beam.leftPoint = CreateLine.createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = CreateLine.createLine(beam.p1, beam.middlePoint).middlePoint;
        beams.push(beam);
    }

    return beams;
}

/**
 * Keresztirányú gerendák kiszámítása.
 * 
 * @param {Room} room 
 * @param {PanelGroup[]} panelGroups
 * @returns {Line[]}
 */
function calculateCrossBeams(room, panelGroups) {
    if (panelGroups.length === 0) {
        return [];
    }

    const boundingBox = room.boundingBox;
    const middlePoint = boundingBox.middlePoint;
    let panelDirection = (((room.angleRad + (panelGroups[0].alignment) * HALF_PI) + 2 * PI) % PI);
    panelDirection = panelDirection - (panelDirection > HALF_PI ? PI : 0);
    const crossDirection = ((panelDirection + HALF_PI) % PI);

    const panelLine = CreateLine.createLineByPointAndAngle(middlePoint, panelDirection);
    const widthIntersections = boundingBox.lines
        .map(l => LineCalculations.calculateIntersectionPointOfTwoLines(l, panelLine))
        .filter(x => x);
    const roomWidth = PointCalculations.calculateDistance(widthIntersections[0], widthIntersections[1]);

    const crossLine = CreateLine.createLineByPointAndAngle(middlePoint, panelDirection);
    const intersectionsSorted = boundingBox.lines
        .map(l => LineCalculations.calculateIntersectionPointOfTwoLines(l, crossLine))
        .filter(x => x)
        .sort((a, b) => {
            if (Math.abs(a.x - b.x) > Constants.geometry.parallelityTreshold) {
                return a.x - b.x;
            }
            return a.y - b.y;
        });

    const pixelsBetweenBeams = HeatingPlannerApplicationState.pixelsBetweenBeams;
    const leftPoint = intersectionsSorted[0];
    const initialOffset = (roomWidth % pixelsBetweenBeams) / 2;
    const initialOffsetVector = PointCalculations.multiplyPoint(CreatePoint.createUnitVector(panelDirection), initialOffset);
    const offsetVector = PointCalculations.multiplyPoint(CreatePoint.createUnitVector(panelDirection), pixelsBetweenBeams);
    const referencePoints = [PointCalculations.addPoints([leftPoint, initialOffsetVector])];

    while (true) {
        const lastPoint = referencePoints[referencePoints.length - 1];
        const nextPoint = PointCalculations.addPoints([lastPoint, offsetVector]);
        if (RectangleCalculations.pointIsInsideRectangle(nextPoint, boundingBox)) {
            referencePoints.push(nextPoint);
        } else {
            break;
        }
    }

    const firstPointCorrector = PointCalculations.multiplyPoint(room.firstPoint, -1);
    const beams = [];
    for (let referencePoint of referencePoints) {
        const referenceLine = CreateLine.createLineByPointAndAngle(referencePoint, crossDirection);
        const intersectionPoints = boundingBox.lines
            .map(bbl => LineCalculations.calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = CreateLine.createLine(
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );

        // intentionally used invalid fields!
        beam.leftPoint = CreateLine.createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = CreateLine.createLine(beam.p1, beam.middlePoint).middlePoint;
        beams.push(beam);
    }

    return beams;
}

/**
 * UD30 tartógerendák kiszámítása.
 * 
 * @param {Room} room 
 * @param {PanelGroup[]} panelGroups 
 * @returns {Line[]}
 */
function calculateUd30Beams(room, panelGroups) {

    if (panelGroups.length === 0) {
        return [];
    }

    const boundingBox = room.boundingBox;
    const roomMiddlePoint = boundingBox.middlePoint;
    const lines = boundingBox.lines;
    const middlePoints = lines.map(l => l.middlePoint);
    const offsetInPixels = 0.5 * HeatingPlannerApplicationState.ud30WidthPixel;
    const firstPointCorrector = PointCalculations.multiplyPoint(room.firstPoint, -1);

    const beams = [];
    for (let line of lines) {
        const middlePoint = line.middlePoint;
        const negativeMiddlePoint = PointCalculations.multiplyPoint(middlePoint, -1);
        const vectorTowardsMiddle = PointCalculations.addPoints([roomMiddlePoint, negativeMiddlePoint]);
        const unitVectorTowardsMiddle = PointCalculations.multiplyPoint(vectorTowardsMiddle, 1 / PointCalculations.calculateDistanceFromOrigin(vectorTowardsMiddle));
        const scaledVectorTowardsMiddle = PointCalculations.multiplyPoint(unitVectorTowardsMiddle, offsetInPixels);
        const offsetMiddlePoint = PointCalculations.addPoints([middlePoint, scaledVectorTowardsMiddle]);

        const referenceLine = CreateLine.createLineByPointAndAngle(offsetMiddlePoint, line.angleRad);
        const intersectionPoints = lines
            .map(bbl => LineCalculations.calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = CreateLine.createLine(
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            PointCalculations.rotatePoint(PointCalculations.addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );

        // intentionally used invalid fields!
        beam.leftPoint = CreateLine.createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = CreateLine.createLine(beam.p1, beam.middlePoint).middlePoint;
        beams.push(beam);
    }

    return beams;
}

/** 
 * @param {Room} room
 * @param {StructureElements} structureElements 
 */
function purifyStructureElements(room, structureElements) {
    const alignedBeams = structureElements.alignedBeams;

    const alignedBeamsToDelete = [];
    let i = 0;
    while (i < alignedBeams.length) {
        let j = 0;
        while (j < i) {
            const bi = alignedBeams[i];
            const bj = alignedBeams[j];

            const bip0 = bi.p0;
            const bip1 = bi.p1;

            const bjp0 = bj.p0;
            const bjp1 = bj.p1;

            const minimumDistance = [[bip0, bjp0], [bip0, bjp1], [bip1, bjp0], [bip1, bjp1]]
                .map(b => PointCalculations.calculateDistance(b[0], b[1]))
                .reduce(ReducerFunctions.minimumFunction);

            if (minimumDistance < HeatingPlannerApplicationState.beamWidthPixel) {
                alignedBeamsToDelete.push(bi);
            }

            j++;
        }

        i++;
    }
    structureElements.alignedBeams = alignedBeams.filter(ab => !alignedBeamsToDelete.includes(ab));

    const crossBeams = structureElements.crossBeams;
    const crossBeamsToDelete = [];
    i = 0;
    while (i < crossBeams.length) {
        const beam = crossBeams[i];

        let minimumDistance = Number.MAX_SAFE_INTEGER;
        for (let p1 of room.boundingBox.points) {
            for (let p2 of [beam.p0, beam.p1]) {
                minimumDistance = Math.min(minimumDistance, PointCalculations.calculateDistance(p1, p2));
            }
        }

        if (minimumDistance < HeatingPlannerApplicationState.beamsMinimumOffset) {
            crossBeamsToDelete.push(beam);
        }

        i++;
    }
    structureElements.crossBeams = crossBeams.filter(cb => !crossBeamsToDelete.includes(cb));
}

function recalculateBeamDefinitionsByRoomId(roomId) {
    const room = RoomService.findById(roomId);
    room && recalculateBeamDefinitions(room);
}

/**
 * Szerkezet újraszámító metódusok
 */
export const RecalculateStructureElements = {
    recalculateBeamDefinitions,
    recalculateBeamDefinitionsByRoomId
}