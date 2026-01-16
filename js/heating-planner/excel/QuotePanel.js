class QuotePanel {
    type;
    room;
    details;

    constructor(type, details, room) {
        this.type = type;
        this.details = details;
        this.room = room;
    }

    static calculateQuotePanelArray(panel) {
        let i = 0;
        const firstPosition = PanelManager.getFirstCenterPositionAbsolute(panel);

        const quotePanels = [];
        while (i < panel.numberOfPanelsInGroup) {
            const offsetPosition = {
                x: firstPosition.x - i * (panel.alignment ? panel.widthInPixels : 0),
                y: firstPosition.y + i * (panel.alignment ? 0 : panel.widthInPixels)
            };

            const room = roomContext.getRoomContainingPoint(offsetPosition);

            quotePanels.push(new QuotePanel(panel.type, panel.details, room));
            i++;
        }
        return quotePanels;
    }
}

/**
 * Előállítja az árajánlatban szereplő panelek listáját és visszaadja.
 * 
 * @returns {QuotePanel[]}
 */
function calculateQuotePanelArray() {
    const panelGroups = elementStore.panelGroups;

    /** @type {QuotePanel[]} */
    const quotePanels = [];
    for (let panelGroup of panelGroups) {
        const room = getRoomById(panelGroup.roomId);
        const type = panelGroup.type;
        const details = panelGroup.details;

        panelGroup.panelIds.forEach(p => quotePanels.push(new QuotePanel(type, details, room)));
    }

    return quotePanels;
}