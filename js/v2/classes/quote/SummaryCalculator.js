class SummaryCalculator {
    constructor() {}

    // public
    calculateSummary() {
        const quotePanelArray = panelContext.calculateQuotePanelArray();
        const invalidPanels = this.#searchForInvalidPositionPanels(quotePanelArray);
        if (invalidPanels) {
            displayErrorMessage('A rajzon nem minden panel tartozik szobához. Kérem nézze át a panelek elhelyezését.');
            return invalidPanels;
        }

        const roomNames = roomContext.getRoomNames();
        return this.#summarizeByRoom(quotePanelArray, roomNames);
    }

    calculateSummaryAndMapToHtml() {
        const summary = this.calculateSummary();

        const table = document.createElement('table');
        for (let room in summary) {
            const roomSummary = summary[room];
            const titleTr = document.createElement('tr');
            table.appendChild(titleTr);

            const titleTd = document.createElement('td');
            titleTd.colspan = 2;
            titleTr.appendChild(titleTd);

            titleTd.innerHTML = room;

            for (let type in roomSummary) {
                if (type === 'length') {
                    continue;
                }
                const count = roomSummary[type];
                const tr = document.createElement('tr');
                table.appendChild(tr);
                const td1 = document.createElement('td');
                tr.appendChild(td1);
                const td2 = document.createElement('td');
                tr.appendChild(td2);
                td1.innerHTML = type;
                td2.innerHTML = `${count} db`;
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
        for (let room of roomNames) {
            const panelsInRoom = quotePanelArray.filter(p => p.getRoom() === room);
            summary[room] = this.#summarizePanelCounts(panelsInRoom);
        }
        return summary;
    }

    #summarizePanelCounts(quotePanelArray) {
        const summary = {};
        quotePanelArray.forEach(element => {
            const type = element.getType();
            const count = (summary[type] || 0) + 1;
            summary[type] = count;
        });
        summary.length = quotePanelArray.length;
        return summary;
    }
}

const summaryCalculator = new SummaryCalculator();