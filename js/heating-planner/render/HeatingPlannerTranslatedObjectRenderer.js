import { RenderRectangle } from "../../common/geometry/Rectangle/RenderRectangle.js";
import { BlueprintService } from "../../common/service/BlueprintService.js";
import { RoomService } from "../../common/service/RoomService.js";
import { RenderPanelGroup } from "../actions/panelGroup/RenderPanelGroup.js";
import { RenderStructureElements } from "../actions/structureElements/RenderStructureElements.js";
import { PanelGroupService } from "../service/PanelGroupService.js";
import { PanelService } from "../service/PanelService.js";
import { StructureElementsService } from "../service/StructureElementsService.js";

/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjectsHeatingPlanner() {
    const panelGroups = PanelGroupService.findAll();
    const structureElements = StructureElementsService.findAll();

    panelGroups.forEach(pg => RenderPanelGroup.renderPanelGroup(pg));
    structureElements.forEach(se => RenderStructureElements.renderStructureElements(se));
    structureElements.forEach(se => RenderStructureElements.renderUd30(se));
    panelGroups.forEach(pg => RenderPanelGroup.renderPanelGroupType(pg));
}

/**
 * Felrajzolja a kijelzőre a debug módban megjelenítendő draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderDebugOnlyTranslatedObjectsHeatingPlanner() {
    const rooms = RoomService.findAll();
    const blueprints = BlueprintService.findAll();
    const panels = PanelService.findAll();
    const panelGroups = PanelGroupService.findAll();

    blueprints.forEach(bp => RenderRectangle.renderRectangle(bp.boundingBox));
    rooms.forEach(r => RenderRectangle.renderRectangle(r.boundingBox));
    rooms.forEach(r => RenderRectangle.renderRectangle(r.selectionBox));
    panelGroups.forEach(pg => RenderRectangle.renderRectangle(pg.boundingBox));
    panelGroups.forEach(pg => RenderRectangle.renderRectangle(pg.boundingBoxIncludingPipes));
    panels.forEach(p => RenderRectangle.renderRectangle(p.boundingBox));
    panels.forEach(p => RenderRectangle.renderRectangle(p.textBox));
}

/**
 * Projekt specifikus renderelési műveletek.
 */
export const HeatingPlannerTranslatedObjectRenderer = {
    renderTranslatedObjectsHeatingPlanner,
    renderDebugOnlyTranslatedObjectsHeatingPlanner
};