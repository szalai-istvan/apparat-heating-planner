import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { CreatePoint } from "../../../common/geometry/Point/CreatePoint.js";
import { Point } from "../../../common/geometry/point/Point.js";
import { PointCalculations } from "../../../common/geometry/Point/PointCalculations.js";
import { CreateRectangle } from "../../../common/geometry/Rectangle/CreateRectangle.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { UiCalculations } from "../../../common/ui/UICalculations.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { Box } from "../../entities/Box.js";
import { BoxGroup } from "../../entities/BoxGroup.js";
import { BoxService } from "../../service/BoxService.js";
import { PipeDriverService } from "../../service/PipeDriverService.js";
import { DeletePipeDriverAction } from "../pipeDriver/DeletePipeDriverAction.js";
import { PipeDriverCalculations } from "../pipeDriver/PipeDriverCalculations.js";
import { BoxGroupCalculations } from "./BoxGroupCalculations.js";

/**
 * Hozzáadja a paraméterül kapott doboz a paraméterül kapott csoporthoz.
 * 
 * @param {Box} box 
 * @param {BoxGroup} group 
 * @returns {undefined}
 */
function assignBoxToGroup(box, group) {
    group.boxIds.push(box.id);
    box.groupId = group.id;
}

/**
 * Beállítja a szög és középpont értékeket.
 * 
 * @param {BoxGroup} boxGroup 
 */
function updateAngleRadAndCenterPositions(boxGroup) {
    const room = BoxGroupCalculations.getContainingRoom(boxGroup);
    // boxGroup.angleRad = room ? room.angleRad : 0.00;
    boxGroup.angleRad = 0.00;
    updatePositionDataIncludingMembers(boxGroup);
}

/**
 * Upateli a dobozcsoport és tagjainak pozícióját leíró adatokat.
 * 
 * @param {BoxGroup} boxGroup
 * @returns {undefined}
 */
function updatePositionDataIncludingMembers(boxGroup) {
    boxGroup = boxGroup || SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!boxGroup) {
        return;
    }

    const boxList = BoxService.findByIdList(boxGroup.boxIds);
    boxList.forEach(p => updateBoxBoundingBoxAndSelectionBox(boxGroup, p));
    updatePositionDataOfBoxGroup(boxGroup);
}

/**
 * Kiszámítja a doboz befoglaló téglalpját.
 * 
 * @param {BoxGroup} boxGroup
 * @param {Box} box
 * @returns {undefined}
 */
function updateBoxBoundingBoxAndSelectionBox(boxGroup, box) {
    const middlePoint = calculateMiddlePointOfBox(boxGroup, box);

    box.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        SlabHeatingPlannerApplicationState.boxWidthInPixels,
        SlabHeatingPlannerApplicationState.boxLengthInPixels,
        BoxGroupCalculations.getTotalAngleRad(boxGroup)
    );

    box.selectionBox = box.boundingBox;
}

/**
* Kiszámítja a boxcsoport befoglaló téglalapját és visszaadja
* 
* @param {BoxGroup} boxGroup 
* @returns {undefined}
*/
function updatePositionDataOfBoxGroup(boxGroup) {
    const boxIds = boxGroup.boxIds;

    const firstBoxMiddle = BoxService.findById(boxIds[0]).boundingBox.middlePoint;
    const lastBoxMiddle = BoxService.findById(boxIds[boxIds.length - 1]).boundingBox.middlePoint;

    const boxLengthInPixels = SlabHeatingPlannerApplicationState.boxLengthInPixels;
    const widthInPixels = SlabHeatingPlannerApplicationState.boxWidthInPixels;

    const middlePoint = CreatePoint.createPoint(
        (firstBoxMiddle.x + lastBoxMiddle.x) / 2,
        (firstBoxMiddle.y + lastBoxMiddle.y) / 2
    );

    boxGroup.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        middlePoint,
        widthInPixels * boxGroup.boxIds.length,
        boxLengthInPixels,
        BoxGroupCalculations.getTotalAngleRad(boxGroup)
    );
}

/**
 * Kiszámítja a középpontját a paneltagnak
 * 
 * @param {BoxGroup} boxGroup 
 * @param {Box} box 
 * @returns {Point}
 */
function calculateMiddlePointOfBox(boxGroup, box) {
    const clickedMemberIndex = boxGroup.clickedMemberIndex;
    const index = boxGroup.boxIds.indexOf(box.id);
    const length = boxGroup.boxIds.length;
    const offset = index - clickedMemberIndex;
    const clickedBox = BoxService.findById(boxGroup.boxIds[clickedMemberIndex]);
    const basePoint = boxGroup.isSelectedForDrag ? MouseCursor.getMousePositionAbsolute() : clickedBox.boundingBox.middlePoint;
    const width = SlabHeatingPlannerApplicationState.boxWidthInPixels;
    const lengthInPixel = SlabHeatingPlannerApplicationState.boxLengthInPixels;

    const angleRad = boxGroup.angleRad + (Number(boxGroup.alignment % 2)) * HALF_PI;
    const vector = PointCalculations.multiplyPoint(
        CreatePoint.createUnitVector(angleRad),
        width * offset,
    );

    const point = CreatePoint.createPoint(
        basePoint.x + vector.x,
        basePoint.y + vector.y
    );

    if (!boxGroup.isSelectedForDrag) {
        return point;
    }

    const minimumX = (boxGroup.alignment % 2 === 1) ?
        Constants.ui.leftRibbonWidth + (length - clickedMemberIndex) * width * ApplicationState.screenZoom :
        Constants.ui.leftRibbonWidth + 1 * lengthInPixel * ApplicationState.screenZoom;

    const minimumY = (boxGroup.alignment % 2 === 1) ?
        Constants.ui.topRibbonHeight + 1 * lengthInPixel * ApplicationState.screenZoom :
        Constants.ui.topRibbonHeight + (clickedMemberIndex + 1) * width * ApplicationState.screenZoom;

    const mousePosition = MouseCursor.getMousePosition();
    const diffX = UiCalculations.calculateCorrector(minimumX, mousePosition.x);
    const diffY = UiCalculations.calculateCorrector(minimumY, mousePosition.y);

    return PipeDriverCalculations.mapPointToPipeDriverGrid(CreatePoint.createPoint(
        point.x + 0,
        point.y + 0
    ));
}

/**
 * Elforgatja a kiválasztott doboz csoportot a megadott irányba
 * 
 * @param {Number} direction 
 * @returns {undefined}
 */
function rotateSelectedBoxGroup(direction) {
    Validators.checkClass(direction, Constants.classNames.number);

    const group = SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!group) {
        return;
    }

    group.alignment = (group.alignment + Math.sign(direction)) % 4;
    while (group.alignment < 0) {
        group.alignment += 4;
    }

    updateAngleRadAndCenterPositions(group);
    updatePositionDataIncludingMembers(group); // todo ez lehet hogy nem kell
    resetPipeDrivers(group);
}

/**
 * Hozzáad egy új dobozt a kiválasztott csoporthoz.
 * 
 * @returns {undefined}
 */
function addBoxToSelectedGroup() {
    const boxGroup = SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!boxGroup) {
        return;
    }

    const box = new Box();
    ElementStore.save(box);
    assignBoxToGroup(box, boxGroup);
    updatePositionDataIncludingMembers(boxGroup);
}

/**
 * Elveszi az utolsó dobozt a csoportból
 * 
 * @returns {undefined}
 */
function removeLastBoxFromSelectedGroup() {
    const boxGroup = SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!boxGroup) {
        return;
    }

    if (boxGroup.boxIds.length < 2) {
        return;
    }

    if (boxGroup.clickedMemberIndex === (boxGroup.boxIds.length - 1)) {
        boxGroup.clickedMemberIndex--;
    }

    resetPipeDrivers(boxGroup);
    const lastId = boxGroup.boxIds[boxGroup.boxIds.length - 1];
    boxGroup.boxIds = boxGroup.boxIds.filter(x => x !== lastId);
    BoxService.removeById(lastId);

    updatePositionDataIncludingMembers(boxGroup);
}

/**
 * Visszaállítja a dobozcsoport csőnyomvezetőit.
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {undefined}
 */
function resetPipeDrivers(boxGroup) {
    const boxes = BoxService.findByIdList(boxGroup.boxIds);
    for (let b of boxes) {
        if (b.pipeDriverId) {
            const pipeDriver = PipeDriverService.findById(b.pipeDriverId);
            if (pipeDriver) {
                DeletePipeDriverAction.resetPipeDriver(pipeDriver);
            }
        }
    }
}

/**
 * Dobozcsoportokat módosító műveletek
 */
export const UpdateBoxGroupAction = {
    resetPipeDrivers,
    assignBoxToGroup,
    addBoxToSelectedGroup,
    rotateSelectedBoxGroup,
    removeLastBoxFromSelectedGroup,
    updateAngleRadAndCenterPositions
};