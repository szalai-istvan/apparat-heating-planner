import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { GridCalculations } from "../../../common/geometry/Grid/GridCalculations.js";
import { CreatePoint } from "../../../common/geometry/Point/CreatePoint.js";
import { Point } from "../../../common/geometry/point/Point.js";
import { PointCalculations } from "../../../common/geometry/Point/PointCalculations.js";
import { CreateRectangle } from "../../../common/geometry/Rectangle/CreateRectangle.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { UiCalculations } from "../../../common/ui/UICalculations.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeater } from "../../entities/SlabHeater.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { SlabHeaterGroupCalculations } from "./SlabHeaterGroupCalculations.js";

/**
 * Átállítja a födémfűtő csoport méreteit.
 * 
 * @param {number} width opcionális
 * @param {number} length opcionális
 * @returns {undefined}
 */
function updateSelectedSlabHeaterGroupDimensions(width = undefined, length = undefined) {
    width = width || SlabHeatingPlannerApplicationState.widthMenu.getValue();
    length = length || SlabHeatingPlannerApplicationState.lengthMenu.getValue();

    const selectedSlabHeaterGroup = SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup;

    if (!selectedSlabHeaterGroup) {
        return;
    }

    const originalWidth = selectedSlabHeaterGroup.width;
    const originalLength = selectedSlabHeaterGroup.length;
    UpdateSlabHeaterGroupAction.setSlabHeaterGroupType(selectedSlabHeaterGroup, width, length);

    if (!selectedSlabHeaterGroup.isSelectedForDrag && !SlabHeaterGroupCalculations.getContainingRoom(selectedSlabHeaterGroup)) {
        updateSelectedSlabHeaterGroupDimensions(originalWidth, originalLength);
        Errors.throwError(ErrorCodes.SLAB_HEATER_GROUP_OUTSIDE_ROOM);
    }

}

/**
 * Beállítja a paraméterül kapott födémfűtő csoport típusát.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @param {number} width 
 * @param {number} length 
 * @returns {undefined}
 */
function setSlabHeaterGroupType(slabHeaterGroup, width, length) {
    Validators.checkClass(slabHeaterGroup, SlabHeatingPlannerConstants.classNames.slabHeaterGroup);
    Validators.checkClass(width, Constants.classNames.number);
    Validators.checkClass(length, Constants.classNames.number);
    const ratio = ApplicationState.pixelsPerMetersRatio;

    slabHeaterGroup.type = width.toString().replace('.', ',') + ' m x ' + length.toString().replace('.', ',') + ' m';
    slabHeaterGroup.width = width;
    slabHeaterGroup.length = length;
    slabHeaterGroup.widthInPixels = width * ratio;
    slabHeaterGroup.lengthInPixels = length * ratio;
    updatePositionDataIncludingMembers(slabHeaterGroup);
}

/**
 * Upateli a födémfűtő csoport és tagjainak pozícióját leíró adatokat.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup
 * @returns {undefined}
 */
function updatePositionDataIncludingMembers(slabHeaterGroup) {
    slabHeaterGroup = slabHeaterGroup || SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return;
    }

    const slabHeaterList = SlabHeaterService.findByIdList(slabHeaterGroup.slabHeaterIds);
    slabHeaterList.forEach(sh => updateSlabHeaterBoundingBoxAndSelectionBox(slabHeaterGroup, sh));
    updatePositionDataOfSlabHeaterGroup(slabHeaterGroup);
}

/**
 * Kiszámítja a födémfűtő befoglaló téglalapját.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup
 * @param {SlabHeater} slabHeater
 * @returns {undefined}
 */
function updateSlabHeaterBoundingBoxAndSelectionBox(slabHeaterGroup, slabHeater) {
    const middlePoint = calculateMiddlePointOfSlabHeater(slabHeaterGroup, slabHeater);

    slabHeater.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        slabHeaterGroup.lengthInPixels,
        slabHeaterGroup.widthInPixels,
        SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup)
    );

    slabHeater.selectionBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        SlabHeatingPlannerApplicationState.slabHeaterTextboxWidthInPixels,
        SlabHeatingPlannerApplicationState.slabHeaterTextboxHeightInPixels,
        SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup)
    );
}

/**
 * Kiszámítja a középpontját a födémfűtő elemnek
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @param {SlabHeater} slabHeater 
 * @returns {Point}
 */
function calculateMiddlePointOfSlabHeater(slabHeaterGroup, slabHeater) {
    const clickedMemberIndex = slabHeaterGroup.clickedMemberIndex;
    const index = slabHeaterGroup.slabHeaterIds.indexOf(slabHeater.id);
    const length = slabHeaterGroup.slabHeaterIds.length;
    const offset = index - clickedMemberIndex;
    const clickedSlabHeater = SlabHeaterService.findById(slabHeaterGroup.slabHeaterIds[clickedMemberIndex]);
    const basePoint = slabHeaterGroup.isSelectedForDrag ? MouseCursor.getMousePositionAbsolute() : clickedSlabHeater.boundingBox.middlePoint;
    const width = slabHeaterGroup.widthInPixels;

    const angleRad = slabHeaterGroup.angleRad + (Number(slabHeaterGroup.alignment % 2) + 1) * HALF_PI;
    const vector = PointCalculations.multiplyPoint(
        CreatePoint.createUnitVector(angleRad),
        width * offset
    );

    const point = CreatePoint.createPoint(
        basePoint.x + vector.x,
        basePoint.y + vector.y
    );

    if (!slabHeaterGroup.isSelectedForDrag) {
        return point;
    }

    const minimumX = (slabHeaterGroup.alignment % 2 === 1) ?
        Constants.ui.leftRibbonWidth + (length - clickedMemberIndex) * slabHeaterGroup.widthInPixels * ApplicationState.screenZoom :
        Constants.ui.leftRibbonWidth + 1 * slabHeaterGroup.lengthInPixels * ApplicationState.screenZoom;

    const minimumY = (slabHeaterGroup.alignment % 2 === 1) ?
        Constants.ui.topRibbonHeight + 1 * slabHeaterGroup.lengthInPixels * ApplicationState.screenZoom :
        Constants.ui.topRibbonHeight + (clickedMemberIndex + 1) * slabHeaterGroup.widthInPixels * ApplicationState.screenZoom;

    const mousePosition = MouseCursor.getMousePosition();
    const diffX = UiCalculations.calculateCorrector(minimumX, mousePosition.x);
    const diffY = UiCalculations.calculateCorrector(minimumY, mousePosition.y);

    return GridCalculations.getClosestGlobalGridPoint(CreatePoint.createPoint(
        point.x + diffX,
        point.y + diffY
    ));
}

/**
* Kiszámítja a födémfűtő csoport befoglaló téglalapját és visszaadja
* 
* @param {SlabHeaterGroup} slabHeaterGroup 
* @returns {undefined}
*/
function updatePositionDataOfSlabHeaterGroup(slabHeaterGroup) {
    const slabHeaterIds = slabHeaterGroup.slabHeaterIds;

    const firstSlabHeaterMiddle = SlabHeaterService.findById(slabHeaterIds[0]).boundingBox.middlePoint;
    const lastSlabHeaterMiddle = SlabHeaterService.findById(slabHeaterIds[slabHeaterIds.length - 1]).boundingBox.middlePoint;

    const middlePoint = CreatePoint.createPoint(
        (firstSlabHeaterMiddle.x + lastSlabHeaterMiddle.x) / 2,
        (firstSlabHeaterMiddle.y + lastSlabHeaterMiddle.y) / 2
    );

    slabHeaterGroup.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        slabHeaterGroup.lengthInPixels,
        slabHeaterGroup.widthInPixels * slabHeaterGroup.slabHeaterIds.length,
        SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup)
    );
}

/**
 * Panel hozzáadása a csoporthoz.
 * 
 * @param {SlabHeater} slabHeater 
 * @param {SlabHeaterGroup} group 
 * @returns {undefined}
 */
function assignSlabHeaterToGroup(slabHeater, group) {
    group.slabHeaterIds.push(slabHeater.id);
    slabHeater.groupId = group.id;
}

/**
 * Födémfűtők módosításával kapcsolatos műveletek
 */
export const UpdateSlabHeaterGroupAction = {
    setSlabHeaterGroupType,
    assignSlabHeaterToGroup,
    updateSelectedSlabHeaterGroupDimensions
};