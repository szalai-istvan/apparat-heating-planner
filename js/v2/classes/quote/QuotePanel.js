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
        const firstPosition = panel.getFirstCenterPositionAbsolute();

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