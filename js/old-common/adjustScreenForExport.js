/**
 * Beállítja a képernyő húzás és zoom értékeit az Excel exporthoz optimális értékekre
 * 
 * @returns {undefined}
 */
function adjustScreenForExport() {
    const blueprintSize = getBlueprintContentSize();
    const docSize = getDocumentDimensions();

    const x = blueprintSize.x;
    const y = blueprintSize.y;

    // screenZoom = Math.ceil(10 / beamTextSize);
    screenZoom = 1;

    const sumDrag = createPoint(
        (-x - (canvas.width / 2 / screenZoom)) + LEFT_RIBBON_WIDTH / screenZoom,
        (-y - (canvas.height / 2 / screenZoom)) + TOP_RIBBON_HEIGHT / screenZoom
    );
    screenSumDrag = multiplyPoint(sumDrag, 1);
}

function getDrawingTopLeftCoordinates() {
    const blueprints = elementStore.blueprints;
    const points = [];

    for (let bp of blueprints) {
        const width = bp.data.width;
        const height = bp.data.height;
        const angleRad = toRadians(bp.angleDeg);
        const center = bp.centerPosition;

        const deltaX = Math.abs(height * Math.sin(angleRad) / 2) + Math.abs(width * Math.cos(angleRad) / 2);
        const deltaY = Math.abs(width * Math.sin(angleRad) / 2) + Math.abs(height * Math.cos(angleRad) / 2);

        points.push(createPoint(
            center.x - deltaX,
            center.y - deltaY
        ));
    }

    const minX = points.map(p => p.x).reduce(minimumFunction);
    const minY = points.map(p => p.y).reduce(minimumFunction);

    return createPoint(minX, minY);
}
