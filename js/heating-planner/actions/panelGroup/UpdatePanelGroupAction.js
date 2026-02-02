import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { Room } from "../../../common/entities/Room.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { GridCalculations } from "../../../common/geometry/Grid/GridCalculations.js";
import { CreatePoint } from "../../../common/geometry/Point/CreatePoint.js";
import { Point } from "../../../common/geometry/Point/Point.js";
import { CreateRectangle } from "../../../common/geometry/Rectangle/CreateRectangle.js";
import { Rectangle } from "../../../common/geometry/Rectangle/Rectangle.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";
import { Panel } from "../../entities/Panel.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelService } from "../../service/PanelService.js";
import { RecalculateStructureElements } from "../structureElements/RecalculateStructureElements.js";
import { PanelGroupCalculations } from "./PanelGroupCalculations.js";

/**
 * Elforgatja a kiválasztott panelcsoportot.
 * 
 * @returns {boolean} true, ha a művelet sikeres.
 */
function rotateSelectedPanelGroup() {
    const panelGroup = HeatingPlannerApplicationState.selectedPanelGroup;
    if (!panelGroup) {
        return false;
    }

    panelGroup.alignment = (panelGroup.alignment + 1) % 4;
    updateAngleRadAndCenterPositions(panelGroup);
    updatePositionDataIncludingMembers(panelGroup);
    if (!panelGroup.isSelectedForDrag && !PanelGroupCalculations.getContainingRoom(panelGroup)) {
        panelGroup.alignment = (panelGroup.alignment + 3) % 4;
        updatePositionDataIncludingMembers(panelGroup);
        Errors.throwError(ErrorCodes.PANEL_GROUP_OUTSIDE_ROOM);
    } else if (!panelGroup.isSelectedForDrag && !PanelGroupCalculations.panelGroupAlignmentIsValid(panelGroup)) {
        panelGroup.alignment = (panelGroup.alignment + 3) % 4;
        updatePositionDataIncludingMembers(panelGroup);
        Errors.throwError(ErrorCodes.INVALID_PANEL_ALIGNMENT);
    }

    RecalculateStructureElements.recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}

/**
 * Upateli a panelcsoport és tagjainak pozícióját leíró adatokat.
 * 
 * @param {PanelGroup} panelGroup
 * @returns {undefined}
 */
function updatePositionDataIncludingMembers(panelGroup) {
    panelGroup = panelGroup || HeatingPlannerApplicationState.selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    const panelList = PanelService.findByIdList(panelGroup.panelIds);
    panelList.forEach(p => updatePanelBoundingBoxAndSelectionBox(panelGroup, p));
    updatePositionDataOfPanelGroup(panelGroup);
}

/**
* Kiszámítja a panelcsoport befoglaló téglalapját és visszaadja
* 
* @param {PanelGroup} panelGroup 
* @returns {undefined}
*/
function updatePositionDataOfPanelGroup(panelGroup) {
    const panelIds = panelGroup.panelIds;

    const firstPanelMiddle = PanelService.findById(panelIds[0]).boundingBox.middlePoint;
    const lastPanelMiddle = PanelService.findById(panelIds[panelIds.length - 1]).boundingBox.middlePoint;

    const middlePoint = CreatePoint.createPoint(
        (firstPanelMiddle.x + lastPanelMiddle.x) / 2,
        (firstPanelMiddle.y + lastPanelMiddle.y) / 2
    );

    panelGroup.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        panelGroup.lengthInPixels,
        panelGroup.widthInPixels * panelGroup.panelIds.length,
        PanelGroupCalculations.getTotalAngleRad(panelGroup)
    );

    const extraLength = HeatingPlannerConstants.panel.panelTubeExtraLengthPerSideInMeters * ApplicationState.pixelsPerMetersRatio;
    panelGroup.boundingBoxIncludingPipes = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        panelGroup.lengthInPixels + extraLength * 2,
        panelGroup.widthInPixels * panelGroup.panelIds.length,
        PanelGroupCalculations.getTotalAngleRad(panelGroup)
    );
}

/**
 * Kiszámítja a panel befoglaló téglalpját.
 * 
 * @param {PanelGroup} panelGroup
 * @param {Panel} panel
 * @returns {undefined}
 */
function updatePanelBoundingBoxAndSelectionBox(panelGroup, panel) {
    const middlePoint = calculateMiddlePointOfPanel(panelGroup, panel);

    panel.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        panelGroup.lengthInPixels,
        panelGroup.widthInPixels,
        PanelGroupCalculations.getTotalAngleRad(panelGroup)
    );

    panel.selectionBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        HeatingPlannerApplicationState.panelTextBoxWidth,
        HeatingPlannerApplicationState.panelTextBoxHeight,
        PanelGroupCalculations.getTotalAngleRad(panelGroup)
    );
}

/**
 * Beállítja a paraméterül kapott panelcsoport típusához tartozó tulajdonságokat
 * 
 * @param {PanelGroup} panelGroup panelcsoport
 * @param {string} type típus
 * @returns {undefined}
 */
function setPanelGroupType(panelGroup, type) {
    Validators.checkClass(panelGroup, HeatingPlannerConstants.classNames.panelGroup);
    Validators.checkClass(type, Constants.classNames.string);

    const ratio = ApplicationState.pixelsPerMetersRatio;

    panelGroup.details = HeatingPlannerConstants.panelTypes[type];
    if (!panelGroup.details) {
        throw new Error(`Unknown panel type: ${type}`);
    }

    panelGroup.type = type;
    panelGroup.lengthInPixels = panelGroup.details.length * ratio;
    panelGroup.widthInPixels = panelGroup.details.width * ratio;
    updatePositionDataIncludingMembers(panelGroup);
}


/**
 * Beállítja a szög és középpont értékeket.
 * 
 * @param {PanelGroup} panelGroup 
 */
function updateAngleRadAndCenterPositions(panelGroup) {
    const room = PanelGroupCalculations.getContainingRoom(panelGroup);
    panelGroup.angleRad = room ? room.angleRad : 0.00;
    updatePositionDataIncludingMembers(panelGroup);
}

/**
 * Panel hozzáadása a csoporthoz.
 * 
 * @param {Panel} panel 
 * @param {PanelGroup} group 
 * @returns {undefined}
 */
function assignPanelToGroup(panel, group) {
    group.panelIds.push(panel.id);
    panel.groupId = group.id;
}

/**
 * Hozzáadja a szobához a panelcsoportot
 * 
 * @param {PanelGroup} panelGroup 
 * @param {Room} room 
 * @returns {undefined}
 */
function assignPanelGroupToRoom(panelGroup, room) {
    panelGroup.roomId = room.id;
}

/**
 * Kiszámítja a középpontját a paneltagnak
 * 
 * @param {PanelGroup} panelGroup 
 * @param {Panel} panel 
 * @returns {Point}
 */
function calculateMiddlePointOfPanel(panelGroup, panel) {
    const clickedMemberIndex = panelGroup.clickedMemberIndex;
    const index = panelGroup.panelIds.indexOf(panel.id);
    const offset = index - clickedMemberIndex;
    const basePoint = panelGroup.isSelectedForDrag ?
        GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition() :
        PanelService.findById(panelGroup.panelIds[clickedMemberIndex]).boundingBox.middlePoint;
    const width = panelGroup.widthInPixels;

    return CreatePoint.createPoint(
        basePoint.x + (width * offset * Number((panelGroup.alignment % 2) === 1)),
        basePoint.y + (width * offset * Number((panelGroup.alignment % 2) === 0))
    );
}

/**
 * Hozzáad egy új panelt a kiválasztott csoporthoz
 * 
 * @returns {undefined}
 */
function addPanelToSelectedGroup() {
    const panelGroup = HeatingPlannerApplicationState.selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    const panel = new Panel();
    ElementStore.save(panel);
    assignPanelToGroup(panel, panelGroup);
    updatePositionDataIncludingMembers(panelGroup);

    if (!panelGroup.isSelectedForDrag && !PanelGroupCalculations.getContainingRoom(panelGroup)) {
        removePanelFromSelectedGroup();
        Errors.throwError(ErrorCodes.PANEL_GROUP_OUTSIDE_ROOM);
    } else {
        RecalculateStructureElements.recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
    }

}

/**
 * Eltávolítja a legutolsó panelt a kiválasztott csoportból.
 * 
 * @returns {undefined}
 */
function removePanelFromSelectedGroup() {
    const panelGroup = HeatingPlannerApplicationState.selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    if (panelGroup.panelIds.length < 2) {
        return;
    }

    if (panelGroup.clickedMemberIndex === panelGroup.panelIds.length) {
        panelGroup.clickedMemberIndex--;
    }

    const lastId = panelGroup.panelIds[panelGroup.panelIds.length - 1];
    panelGroup.panelIds = panelGroup.panelIds.filter(x => x !== lastId);
    PanelService.removeById(lastId);

    updatePositionDataIncludingMembers(panelGroup);
    RecalculateStructureElements.recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}

/**
 * Panelcsoportok updatelésével kapcsolatos műveletek.
 */
export const UpdatePanelGroupAction = {
    rotateSelectedPanelGroup,
    setPanelGroupType,
    updateAngleRadAndCenterPositions,
    updatePositionDataIncludingMembers,
    assignPanelToGroup,
    assignPanelGroupToRoom,
    addPanelToSelectedGroup,
    removePanelFromSelectedGroup
};