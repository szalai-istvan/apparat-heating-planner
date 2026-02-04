import { RoomService } from "../../common/service/RoomService.js";
import { PanelGroupService } from "../service/PanelGroupService.js";

class QuotePanel {
    type;
    room;
    details;

    constructor(type, details, room) {
        this.type = type;
        this.details = details;
        this.room = room;
    }
}

/**
 * Előállítja az árajánlatban szereplő panelek listáját és visszaadja.
 * 
 * @returns {QuotePanel[]}
 */
function calculateQuotePanelArray() {
    const panelGroups = PanelGroupService.findAll();

    /** @type {QuotePanel[]} */
    const quotePanels = [];
    for (let panelGroup of panelGroups) {
        const room = RoomService.findById(panelGroup.roomId);
        const type = panelGroup.type;
        const details = panelGroup.details;

        panelGroup.panelIds.forEach(p => quotePanels.push(new QuotePanel(type, details, room)));
    }

    return quotePanels;
}

export const CalculateQuotePanels = {
    calculateQuotePanelArray
};