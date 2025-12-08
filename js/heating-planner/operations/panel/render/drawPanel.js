/**
 * Felrajtol egy fűtőpanelt a képernyőre
 * 
 * @param {Panel} panel
 * @returns {undefined}
 */
function drawPanel(panel) {
    checkClass(panel, CLASS_PANEL);

    const ratio = pixelsPerMetersRatio;
    const group = getPanelGroupById(panel.groupId);
    const length = group.lengthInPixels;
    const width = group.widthInPixels;
    const alignment = group.alignment;
    const centerCoordinates = panel.centerPosition;
    const type = group.type;

    push();

    rectMode(CENTER);
    translate(centerCoordinates.x, centerCoordinates.y);
    rotate(alignment * 90 + group.angleDeg);
    strokeWeight(panelLineWeight);
    stroke(BLACK);
    fill(PANEL_FILL_COLOR);
    rect(0, 0, length, width);

    const i = width / 9;
    for (let pipeNumber = -width / 2; pipeNumber < width / 2; pipeNumber += i) {
        line(- length / 2, pipeNumber, length / 2, pipeNumber);
    }

    drawTubes({ panel, group, ratio, length, width });
    rotate(- alignment * 90 - group.angleDeg);
    rotate((alignment * 90) % 180 + group.angleDeg);

    pop();
}

function drawTubes({ panel, group, ratio, length, width }) {
    const panelTubeExtraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * pixelsPerMetersRatio;
    const panelStep = PANEL_TUBE_EXTRA_LENGTH_STEP * pixelsPerMetersRatio;

    noFill();
    strokeWeight(panelLineWeight);

    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 3,
        endpoint2: 8,
        length: panelTubeExtraLength,
        side: 0
    });
    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 4,
        endpoint2: 7,
        length: panelTubeExtraLength - panelStep,
        side: 0
    });
    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 5,
        endpoint2: 6,
        length: panelTubeExtraLength - 2 * panelStep,
        side: 0
    });

    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 1,
        endpoint2: 8,
        length: panelTubeExtraLength,
        side: 1
    });
    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 2,
        endpoint2: 7,
        length: panelTubeExtraLength - panelStep,
        side: 1
    });
    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 3,
        endpoint2: 6,
        length: panelTubeExtraLength - 2 * panelStep,
        side: 1
    });
    drawOneTube({
        panel: panel,
        group: group,
        endpoint1: 4,
        endpoint2: 5,
        length: panelTubeExtraLength - 3 * panelStep,
        side: 1
    });

    const y1 = group.widthInPixels * (-0.5 + 1 / 9);
    const y2 = y1 + group.widthInPixels / 9;
    const x2 = -length * 0.5 - panelTubeExtraLength;
    line(-length * 0.5, y1, x2, y1);
    line(-length * 0.5, y2, x2, y2);
}

function drawOneTube({ panel, group, endpoint1, endpoint2, length, side }) {
    const diameter = Math.abs(endpoint2 - endpoint1) * group.widthInPixels / 9;
    const straightLength = length - diameter / 2;

    const x1 = side ? group.lengthInPixels / 2 : - group.lengthInPixels / 2;
    const x2 = side ? group.lengthInPixels / 2 + straightLength : - group.lengthInPixels / 2 - straightLength;
    const y1 = group.widthInPixels * (-0.5 + endpoint1 / 9);
    const y2 = group.widthInPixels * (-0.5 + endpoint2 / 9);
    const centerY = (y1 + y2) / 2;

    line(x1, y1, x2, y1);
    line(x1, y2, x2, y2);

    const angle1 = side ? -90 : 90;
    const angle2 = side ? 90 : 270;

    arc(x2, centerY, diameter, diameter, angle1, angle2);
}