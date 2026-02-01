import { CreateRoomAction } from "../../../common/actions/room/CreateRoomAction.js";
import { Room } from "../../../common/entities/Room.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { StructureElements } from "../../entities/StructureElements.js";

/**
 * Szoba létrehozása utáni művelet.
 * 
 * @param {Room} room szoba
 * @returns {undefined}
 */
function onRoomIsCreatedHeatingPlanner(room) {
    const structureElements = new StructureElements(room);
    ElementStore.save(structureElements);
    room.structureElementsId = structureElements.id;
}

CreateRoomAction.onRoomIsCreated(onRoomIsCreatedHeatingPlanner);