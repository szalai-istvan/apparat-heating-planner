/**
 * Újraszámolja a szerkezeti elemek definícióját.
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function recalculateBeamDefinitions(room) {
    checkClass(room, CLASS_ROOM);

    const structureElements = getStructureElementsById(room.structureElementsId);
    const panelGroups = elementStore.panelGroups.filter(x => x.roomId === room.id);
    structureElements.alignment = panelGroups.length > 0 ? panelGroups[0].alignment % 2 : undefined;

    const alignedBeams = [];
    for (let panelGroup of panelGroups) {
        const beams = calculateAlignedBeamsOfPanelGroup(room, panelGroup);
        beams.forEach(b => alignedBeams.push(b));
    }

    structureElements.alignedBeams = alignedBeams;
    structureElements.crossBeams = calculateCrossBeams(room, panelGroups);
    structureElements.ud30Beams = calculateUd30Beams(room);
}

/**
 * Kiszámítja a panelcsoporthoz tartozó tartógerendák pozícióját és visszaadja.
 * 
 * @param {Room} room 
 * @param {PanelGroup} panelGroup 
 * @returns {Line[]}
 */
function calculateAlignedBeamsOfPanelGroup(room, panelGroup) {
    const panels = getPanelsByIdList(panelGroup.panelIds);

    const referencePoints = panels.map(p => p.boundingBox).map(bb => bb.points[0]);
    referencePoints.push(panels[panels.length - 1].boundingBox.points[1]);
    referencePoints.push(panels[0].boundingBox.points[1]);

    const boundingBoxLines = room.boundingBox.lines;
    const direction = room.angleRad + panelGroup.alignment * HALF_PI;
    const firstPointCorrector = multiplyPoint(room.firstPoint, -1);

    /** @type {Line[]} */
    const beams = [];
    for (let referencePoint of referencePoints) {
        const referenceLine = createLineByPointAndAngle(referencePoint, direction);
        const intersectionPoints = boundingBoxLines
            .map(bbl => calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = createLine(
            rotatePoint(addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            rotatePoint(addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );

        beam.leftPoint = createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = createLine(beam.p1, beam.middlePoint).middlePoint;
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

    const panelLine = createLineByPointAndAngle(middlePoint, panelDirection);
    const widthIntersections = boundingBox.lines
        .map(l => calculateIntersectionPointOfTwoLines(l, panelLine))
        .filter(x => x);
    const roomWidth = calculateDistance(widthIntersections[0], widthIntersections[1]);

    const crossLine = createLineByPointAndAngle(middlePoint, panelDirection);
    const intersectionsSorted = boundingBox.lines
        .map(l => calculateIntersectionPointOfTwoLines(l, crossLine))
        .filter(x => x)
        .sort((a, b) => {
            if (Math.abs(a.x - b.x) > PARALLELITY_TRESHOLD) {
                return a.x - b.x;
            }
            return a.y - b.y;
        });

    const leftPoint = intersectionsSorted[0];
    const initialOffset = (roomWidth % pixelsBetweenBeams) / 2;
    const initialOffsetVector = multiplyPoint(createUnitVector(panelDirection), initialOffset);
    const offsetVector = multiplyPoint(createUnitVector(panelDirection), pixelsBetweenBeams);
    const referencePoints = [addPoints([leftPoint, initialOffsetVector])];

    while (true) {
        const lastPoint = referencePoints[referencePoints.length - 1];
        const nextPoint = addPoints([lastPoint, offsetVector]);
        if (pointIsInsideRectangle(nextPoint, boundingBox)) {
            referencePoints.push(nextPoint);
        } else {
            break;
        }
    }

    const firstPointCorrector = multiplyPoint(room.firstPoint, -1);
    const beams = [];
    for (let referencePoint of referencePoints) {
        const referenceLine = createLineByPointAndAngle(referencePoint, crossDirection);
        const intersectionPoints = boundingBox.lines
            .map(bbl => calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = createLine(
            rotatePoint(addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            rotatePoint(addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );
        beam.leftPoint = createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = createLine(beam.p1, beam.middlePoint).middlePoint;
        beams.push(beam);
    }

    return beams;
}

/**
 * UD30 tartógerendák kiszámítása.
 * 
 * @param {Room} room 
 * @returns {Line[]}
 */
function calculateUd30Beams(room) {
    const boundingBox = room.boundingBox;
    const roomMiddlePoint = boundingBox.middlePoint;
    const lines = boundingBox.lines;
    const middlePoints = lines.map(l => l.middlePoint);
    const offsetInPixels = 0.5 * UD30_WIDTH_METER * pixelsPerMetersRatio;
    const firstPointCorrector = multiplyPoint(room.firstPoint, -1);

    const beams = [];
    for (let line of lines) {
        const middlePoint = line.middlePoint;
        const negativeMiddlePoint = multiplyPoint(middlePoint, -1);
        const vectorTowardsMiddle = addPoints([roomMiddlePoint, negativeMiddlePoint]);
        const unitVectorTowardsMiddle = multiplyPoint(vectorTowardsMiddle, 1 / calculateDistanceFromOrigin(vectorTowardsMiddle));
        const scaledVectorTowardsMiddle = multiplyPoint(unitVectorTowardsMiddle, offsetInPixels);
        const offsetMiddlePoint = addPoints([middlePoint, scaledVectorTowardsMiddle]);

        const referenceLine = createLineByPointAndAngle(offsetMiddlePoint, line.angleRad);
        const intersectionPoints = lines
            .map(bbl => calculateIntersectionPointOfTwoLines(bbl, referenceLine))
            .filter(x => x);

        const beam = createLine(
            rotatePoint(addPoints([intersectionPoints[0], firstPointCorrector]), - room.angleRad),
            rotatePoint(addPoints([intersectionPoints[1], firstPointCorrector]), - room.angleRad)
        );
        beam.leftPoint = createLine(beam.p0, beam.middlePoint).middlePoint;
        beam.rightPoint = createLine(beam.p1, beam.middlePoint).middlePoint;
        beams.push(beam);
    }

    return beams;
}