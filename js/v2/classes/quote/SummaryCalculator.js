class SummaryCalculator {
    constructor() {}

    // public
    calculateSummary() {
        const quotePanelArray = panelContext.calculateQuotePanelArray();
        const invalidPanels = this.#searchForInvalidPositionPanels(quotePanelArray);
        if (invalidPanels) {
            displayErrorMessage('A rajzon nem minden panel tartozik szobához. Kérem nézze át a panelek elhelyezését.');
            return null;
        }

        const roomNames = roomContext.getRoomNames();
        return this.#summarizeByRoom(quotePanelArray, roomNames);
    }

    calculateSummaryAndMapToHtml() {
        const summary = this.calculateSummary();
        if (!summary) return null;

        const table = createTable();
        for (let room in summary) {
            if (typeof(summary[room]) !== 'object') continue;
            addHeaderRow(table, room, 2);

            const roomSummary = summary[room];
            for (let type in roomSummary) {
                if (type[0] !== 'F') {
                    continue;
                }
                const count = roomSummary[type];
                addRow(table, [type, `${count} db`]);
            }
        }

        return table;
    }

    // private
    #searchForInvalidPositionPanels(quotePanelArray) {
        if (!quotePanelArray || !quotePanelArray.length) {
            return;
        }

        const noRoomFound = quotePanelArray.filter(quotePanel => !quotePanel.getRoom());
        if (noRoomFound.length) {
            return this.#summarizePanelCounts(noRoomFound);
        }
        return null;
    }

    #summarizeByRoom(quotePanelArray, roomNames) {
        const summary = {};
        let totalRounds = 0;
        let totalCount = 0;

        for (let room of roomNames) {
            const panelsInRoom = quotePanelArray.filter(p => p.getRoom() === room);
            const roomSummary = this.#summarizePanelCounts(panelsInRoom);
            summary[room] = roomSummary;
            totalRounds += roomSummary.numberOfRounds;
            totalCount += roomSummary.count;
        }

        summary.count = totalCount;
        summary.numberOfRounds = totalRounds;
        return summary;
    }

    #summarizePanelCounts(quotePanelArray) {
        const summary = {};
        quotePanelArray.forEach(element => {
            const type = element.getType();
            const count = (summary[type] || 0) + 1;
            summary[type] = count;
        });

        summary.count = quotePanelArray.length;
        summary.numberOfRounds = this.#getNumberOfRounds(summary);
        return summary;
    }

    #getNumberOfRounds(summary) {
        let totalPipeLength = 0;
        for (let type in panelTypes) {
            const count = summary[type] || 0;
            const pipeLength = panelTypes[type].pipeLength;
            totalPipeLength += count * pipeLength;
        }

        return Math.ceil(totalPipeLength / 130);
    }
}

const summaryCalculator = new SummaryCalculator();