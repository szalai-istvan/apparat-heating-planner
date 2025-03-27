class SummaryCalculator {
    constructor() {}

    
    calculateSummary() {
        const quotePanelArray = panelContext.calculateQuotePanelArray();
        const invalidPanels = this.searchForInvalidPositionPanels(quotePanelArray);
        if (invalidPanels) {
            displayMessage('A rajzon nem minden panel tartozik szobához. Kérem nézze át a panelek elhelyezését.');
            return null;
        }

        const roomNames = roomContext.getRoomNames();
        return this.summarizeByRoom(quotePanelArray, roomNames);
    }

    calculateSummaryAndMapToHtml() {
        const summary = this.calculateSummary();
        if (!summary) return null;

        const table = createTable();
        for (let room in summary) {
            const roomSummary = summary[room];
            if (typeof(roomSummary) !== 'object') continue;
            
            if (!(roomSummary.count > 0)) {
                continue;
            }

            const headerText = room === 'additionalElements' ? 'Szerelési anyagok és egyéb költségek' : room;
            addHeaderRow(table, headerText, 4);

            const backgroundColors = ['white', 'lightgrey'];
            let backgroundColorIndex = 0;
            for (let type in roomSummary) {
                if (['count', 'numberOfRounds'].includes(type)) {
                    continue;
                }

                const summarized = roomSummary[type];
                const count = formatNumber(summarized.count);
                const unitPrice = formatNumber(summarized.unitPrice);
                const price = formatNumber(summarized.price);
                const unit = UNITS[type] || 'db';
                addRow(table, [TRANSLATIONS[type] || type, `${count} ${unit}`, `${unitPrice} Ft/${unit}`, `${price} Ft`], backgroundColors[backgroundColorIndex]);
                backgroundColorIndex = (backgroundColorIndex + 1) % backgroundColors.length; 
            }
        }

        return table;
    }

    
    searchForInvalidPositionPanels(quotePanelArray) {
        if (!quotePanelArray || !quotePanelArray.length) {
            return;
        }

        const noRoomFound = quotePanelArray.filter(quotePanel => !quotePanel.room);
        if (noRoomFound.length) {
            return this.summarizePanelCounts(noRoomFound);
        }
        return null;
    }

    summarizeByRoom(quotePanelArray, roomNames) {
        const summary = {};
        let totalRounds = 0;
        let totalCount = 0;

        for (let room of roomNames) {
            const panelsInRoom = quotePanelArray.filter(p => p.room === room);
            const roomSummary = this.summarizePanelCounts(panelsInRoom);
            summary[room] = roomSummary;
            totalRounds += roomSummary.numberOfRounds;
            totalCount += roomSummary.count;
        }

        summary.count = totalCount;
        summary.numberOfRounds = totalRounds;
        this.addAdditionalElements(summary);
        return summary;
    }

    summarizePanelCounts(quotePanelArray) {
        const summary = {};
        quotePanelArray.forEach(element => {
            const type = element.type;
            const count = (summary[type]?.count || 0) + 1;
            const unitPrice = PRICES.panels[type];
            summary[type] = {
                count: count,
                unitPrice: unitPrice,
                price: count * unitPrice
            };
        });

        summary.count = quotePanelArray.length;
        summary.numberOfRounds = this.getNumberOfRounds(summary);
        return summary;
    }

    getNumberOfRounds(summary) {
        let totalPipeLength = 0;
        for (let type in panelTypes) {
            const count = summary[type]?.count || 0;
            const pipeLength = panelTypes[type].pipeLength;
            totalPipeLength += count * pipeLength;
        }

        return Math.ceil(totalPipeLength / 130);
    }

    addAdditionalElements(summary) {
        summary.additionalElements = {};
        const additionalElements = summary.additionalElements;
        let sumCount = 0;

        const count = summary.count;
        const numberOfRounds = summary.numberOfRounds;

        const tElements = 2 * (count - numberOfRounds);
        if (tElements > 0) {
            sumCount += tElements;
            additionalElements.tElements = {count: tElements, unitPrice: PRICES.tElement, price: tElements * PRICES.tElement};            
        }

        const confusors = 2 * count - tElements;
        if (confusors > 0) {
            sumCount += confusors;
            additionalElements.confusors = {count: confusors, unitPrice: PRICES.confusor, price: confusors * PRICES.confusor};
        }

        const collectors = numberOfRounds;
        if (collectors > 0) {
            sumCount += collectors;
            additionalElements.collectors = {count: collectors, unitPrice: PRICES.collector, price: collectors * PRICES.collector};
        }

        const mainlineTube = numberOfRounds * 20;
        if (mainlineTube > 0) {
            sumCount += mainlineTube;
            additionalElements.mainlineTube = mainlineTube;
            additionalElements.mainlineTube = {count: mainlineTube, unitPrice: PRICES.tube, price: mainlineTube * PRICES.tube};
        }

        const eurokonusz = numberOfRounds * 2;
        if (eurokonusz > 0) {
            sumCount += eurokonusz;
            additionalElements.eurokonusz = eurokonusz;
            additionalElements.eurokonusz = {count: eurokonusz, unitPrice: PRICES.eurokonusz, price: eurokonusz * PRICES.eurokonusz};
        }

        const ud30 = Math.ceil(roomContext.calculateUd30Amount());
        if (ud30 > 0) {
            sumCount += ud30;
            additionalElements.ud30 = {count: ud30, unitPrice: PRICES.ud30, price: ud30 * PRICES.ud30};
        }

        const cd30_60 = Math.ceil(roomContext.calculateCd3060Amount());
        if (cd30_60 > 0) {
            sumCount += cd30_60;
            additionalElements.cd30_60 = {count: cd30_60, unitPrice: PRICES.cd30_60, price: cd30_60 * PRICES.cd30_60};
        }
        additionalElements.count = sumCount;
    }
}

const summaryCalculator = new SummaryCalculator();