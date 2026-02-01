import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";
import { Panel } from "../../entities/Panel.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { PanelService } from "../../service/PanelService.js";
import { UpdatePanelGroupAction } from "./UpdatePanelGroupAction.js";

/**
 * Felrajzolja a képernyőre a megadott panelcsoportot.
 * 
 * @param {PanelGroup} panelGroup, panelcsoport
 * @returns {undefined}
 */
function renderPanelGroup(panelGroup) {
    Validators.checkClass(panelGroup, HeatingPlannerConstants.classNames.panelGroup);
    UpdatePanelGroupAction.updateAngleRadAndCenterPositions(panelGroup);
    const panels = PanelService.findByIdList(panelGroup.panelIds);
    panels.forEach(p => renderPanel(p));
}

/** 
 * Felrajzolja a képernyőre a panelcsoport típusát
 * 
 * @param {PanelGroup} group 
 * @returns {undefined}
 */
function renderPanelGroupType(group) {
    const panels = PanelService.findByIdList(group.panelIds);
    panels.forEach(p => drawPanelType(p, group));
}

/**
 * Felrajzolja a panelcsoport típusát.
 * 
 * @param {Panel} panel 
 * @param {PanelGroup} group 
 * @returns {undefined}
 */
function drawPanelType(panel, group) {
    const ratio = ApplicationState.pixelsPerMetersRatio;
    const length = group.lengthInPixels;
    const width = group.widthInPixels;
    const centerCoordinates = panel.boundingBox.middlePoint;
    const alignment = group.alignment;
    const type = group.type;
    const angleRad = group.angleRad;
    const panelTextBoxWidth = HeatingPlannerApplicationState.panelTextBoxWidth;
    const panelTextBoxHeight = HeatingPlannerApplicationState.panelTextBoxHeight;
    const panelTextSize = HeatingPlannerApplicationState.panelTextSize;

    push();

    rectMode(CENTER);
    translate(centerCoordinates.x, centerCoordinates.y);
    rotate((alignment % 2) * HALF_PI + group.angleRad);
    strokeWeight(HeatingPlannerApplicationState.panelLineWeight);
    stroke(Constants.strings.black);
    fill(HeatingPlannerConstants.panel.panelFillColor);

    const sizeMultiplier = group.type === HeatingPlannerConstants.strings.F100 ? 0.7 : 1;
    rect(0, 0, sizeMultiplier * panelTextBoxWidth, sizeMultiplier * panelTextBoxHeight);

    const pointIsInsideTextBox = SelectionCriteria.evaluateSelectionCriteria(panel);
    if (pointIsInsideTextBox) {
        fill(Constants.ui.selectedTextColor);
    } else {
        fill(Constants.ui.defaultTextColor);
    }

    const p = HeatingPlannerConstants.panel.panelTextPopFactor;
    textSize(sizeMultiplier * panelTextSize * (1 + p * group.isSelected + p * pointIsInsideTextBox));
    textAlign(CENTER, CENTER);
    noStroke();
    text(group.type, 0, 0);

    pop();
}

/**
 * Felrajtol egy fűtőpanelt a képernyőre
 * 
 * @param {Panel} panel
 * @returns {undefined}
 */
function renderPanel(panel) {
    Validators.checkClass(panel, HeatingPlannerConstants.classNames.panel);

    const ratio = ApplicationState.pixelsPerMetersRatio;
    const group = PanelGroupService.findById(panel.groupId);
    const length = group.lengthInPixels;
    const width = group.widthInPixels;
    const alignment = group.alignment;
    const centerCoordinates = panel.boundingBox.middlePoint;
    const type = group.type;

    push();

    rectMode(CENTER);
    translate(centerCoordinates.x, centerCoordinates.y);
    rotate(alignment * HALF_PI + group.angleRad);
    strokeWeight(HeatingPlannerApplicationState.panelLineWeight);
    stroke(Constants.strings.black);
    fill(HeatingPlannerConstants.panel.panelFillColor);
    rect(0, 0, length, width);

    const i = width / 9;
    for (let pipeNumber = -width / 2; pipeNumber < width / 2; pipeNumber += i) {
        line(- length / 2, pipeNumber, length / 2, pipeNumber);
    }

    drawTubes({ panel, group, ratio, length, width });

    pop();
}

function drawTubes({ panel, group, ratio, length, width }) {
    const panelTubeExtraLength = HeatingPlannerConstants.panel.panelTubeExtraLengthPerSideInMeters * ratio;
    const panelStep = HeatingPlannerConstants.panel.panelTubeExtraLengthStepInMeters * ratio; // TODO ezek is egyszer legyenek kiszámolva

    noFill();
    strokeWeight(HeatingPlannerApplicationState.panelLineWeight);

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

    const angle1 = side ? -HALF_PI : HALF_PI;
    const angle2 = side ? HALF_PI : 3 * HALF_PI;

    arc(x2, centerY, diameter, diameter, angle1, angle2);
}

/**
 * Panelcsoport renderelésével kapcsolatos műveletek.
 */
export const RenderPanelGroup = {
    renderPanelGroup,
    renderPanelGroupType
};