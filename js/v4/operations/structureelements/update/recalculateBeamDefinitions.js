/**
 * Újraszámolja a szerkezeti elemek definícióját.
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function recalculateBeamDefinitions(room) {
    checkClass(room, CLASS_ROOM);

    const structureElements = getStructureElementsById(room.structureElementsId);
    const panelGroups = elementStore.panelGroups.filter(x => x.roomId = room.id);

    const alignedBeams = [];
    for (let panelGroup of panelGroups) {
        const beams = calculateAlignedBeamsOfPanelGroup(room, panelGroup);
        beams.forEach(b => alignedBeams.push(b));
    }

    structureElements.alignedBeams = alignedBeams;
    structureElements.crossBeams = calculateCrossBeams(room, panelGroups);
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

        console.log(intersectionPoints);
        beams.push(createLine(
            addPoints([intersectionPoints[0], firstPointCorrector]),
            addPoints([intersectionPoints[1], firstPointCorrector])
        ));
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
    const direction = room.angleRad + (panelGroups[0].alignment + 1) * HALF_PI;
    
    const middleLine = createLineByPointAndAngle(middlePoint, direction);
    const intersectionsSorted = boundingBox.lines
        .map(l => calculateIntersectionPointOfTwoLines(l, middleLine))
        .filter(x => x)
        .sort((a, b) => a.x - b.x);
    const leftPoint = intersectionsSorted[0];
    console.log(intersectionsSorted[0]);
    console.log(intersectionsSorted[1]);

}