import { Constants } from "../../common/appdata/Constants.js";
import { RenderRectangle } from "../../common/geometry/rectangle/RenderRectangle.js";
import { RoomService } from "../../common/service/RoomService.js";
import { BoxGroupService } from "../service/BoxGroupService.js";
import { BoxService } from "../service/BoxService.js";
import { PipeDriverService } from "../service/PipeDriverService.js";
import { SlabHeaterGroupService } from "../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../service/SlabHeaterService.js";

/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú projekt specifikus elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjectsSlabHeatingPlanner() {
    const boxGroups = BoxGroupService.findAll();
    const slabHeaterGroups = SlabHeaterGroupService.findAll();
    const pipeDrivers = PipeDriverService.findAll();

    // boxGroups.forEach(bg => drawBoxGroup(bg));
    // slabHeaterGroups.forEach(shg => drawSlabHeaterGroup(shg)); todo
}

/**
 * Felrajzolja a kijelzőre a debug módban megjelenítendő draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderDebugOnlyTranslatedObjectsSlabHeatingPlanner() {
    const rooms = RoomService.findAll();
    const slabHeaterGroups = SlabHeaterGroupService.findAll();
    const slabHeaters = SlabHeaterService.findAll();
    const boxGroups = BoxGroupService.findAll();
    const boxes = BoxService.findAll();

    rooms.forEach(r => RenderRectangle.renderRectangle(r.boundingBox));
    rooms.forEach(r => RenderRectangle.renderRectangle(r.selectionBox));

    slabHeaterGroups.forEach(shg => RenderRectangle.renderRectangle(shg.boundingBox, Constants.strings.red, 2));
    slabHeaters.forEach(sh => RenderRectangle.renderRectangle(sh.boundingBox));
    slabHeaters.forEach(sh => RenderRectangle.renderRectangle(sh.selectionBox));

    boxGroups.forEach(bg => RenderRectangle.renderRectangle(bg.boundingBox, Constants.strings.red, 2));
    boxes.forEach(b => RenderRectangle.renderRectangle(b.boundingBox));
    boxes.forEach(b => RenderRectangle.renderRectangle(b.selectionBox));
}