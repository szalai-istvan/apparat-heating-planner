// @ts-nocheck
import { ApplicationState } from "../../common/appdata/ApplicationState.js";
import { Room } from "../../common/entities/Room.js";
import { PointCalculations } from "../../common/geometry/Point/PointCalculations.js";
import { RectangleCalculations } from "../../common/geometry/Rectangle/RectangleCalculations.js";
import { ReducerFunctions } from "../../common/math/ReducerFunctions.js";
import { RoomService } from "../../common/service/RoomService.js";
import { HeatingPlannerConstants } from "../appdata/HeatingPlannerConstants.js";
import { StructureElementsService } from "../service/StructureElementsService.js";
import { HeatingPlannerExcelConstants } from "./excelConstants.js";
import { CalculateQuotePanels } from "./QuotePanel.js";

class SummaryCalculator {
    constructor() {}

    
    calculateSummary() {
        const quotePanelArray = CalculateQuotePanels.calculateQuotePanelArray();
        const invalidPanels = this.searchForInvalidPositionPanels(quotePanelArray);
        if (invalidPanels) {
            return null;
        }

        return this.summarizeByRoom(quotePanelArray);
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

    /** @param {QuotePanel[]} quotePanelArray */
    summarizeByRoom(quotePanelArray) {
        const summary = {};
        let totalRounds = 0;
        let totalCount = 0;

        const rooms = RoomService.findAll();
        for (let room of rooms) {
            const panelsInRoom = quotePanelArray.filter(p => p.room === room);
            const roomSummary = this.summarizePanelCounts(panelsInRoom);
            summary[room.name] = roomSummary;
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
            const unitPrice = HeatingPlannerConstants.prices.panels[type];
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
        const panelTypes = HeatingPlannerConstants.panelTypes;
        let totalPipeLength = 0;
        for (let type in panelTypes) {
            const count = summary[type]?.count || 0;
            const pipeLength = panelTypes[type].pipeLength;
            totalPipeLength += count * pipeLength;
        }

        return Math.ceil(totalPipeLength / 130);
    }

    addAdditionalElements(summary) {
        const prices = HeatingPlannerConstants.prices;
        summary.additionalElements = {};
        const additionalElements = summary.additionalElements;
        let sumCount = 0;

        const count = summary.count;
        const numberOfRounds = summary.numberOfRounds;

        const tElements = 2 * (count - numberOfRounds);
        if (tElements > 0) {
            sumCount += tElements;
            additionalElements.tElements = {count: tElements, unitPrice: prices.tElement, price: tElements * prices.tElement};            
        }

        const confusors = 2 * count - tElements;
        if (confusors > 0) {
            sumCount += confusors;
            additionalElements.confusors = {count: confusors, unitPrice: prices.confusor, price: confusors * prices.confusor};
        }

        const collectors = numberOfRounds;
        if (collectors > 0) {
            sumCount += collectors;
            additionalElements.collectors = {count: collectors, unitPrice: prices.collector, price: collectors * prices.collector};
        }

        const mainlineTube = numberOfRounds * 20;
        if (mainlineTube > 0) {
            sumCount += mainlineTube;
            additionalElements.mainlineTube = mainlineTube;
            additionalElements.mainlineTube = {count: mainlineTube, unitPrice: prices.tube, price: mainlineTube * prices.tube};
        }

        const eurokonusz = numberOfRounds * 2;
        if (eurokonusz > 0) {
            sumCount += eurokonusz;
            additionalElements.eurokonusz = eurokonusz;
            additionalElements.eurokonusz = {count: eurokonusz, unitPrice: prices.eurokonusz, price: eurokonusz * prices.eurokonusz};
        }

        const rooms = RoomService.findAll();
        const sumUd30 = rooms.map(r => calculateRoomCircumference(r)).reduce(ReducerFunctions.sumFunction);
        const ud30 = Math.ceil(sumUd30);
        if (ud30 > 0) {
            sumCount += ud30;
            additionalElements.ud30 = {count: ud30, unitPrice: prices.ud30, price: ud30 * prices.ud30};
        }

        const sumCd30_60 = rooms.map(r => calculateRoomCd3060Amount(r)).reduce(ReducerFunctions.sumFunction)

        const cd30_60 = Math.ceil(sumCd30_60);
        if (cd30_60 > 0) {
            sumCount += cd30_60;
            additionalElements.cd30_60 = {count: cd30_60, unitPrice: prices.cd30_60, price: cd30_60 * prices.cd30_60};
        }
        additionalElements.count = sumCount;
    }
}

/**
 * Kiszámítja és visszaadja a szoba kerületét méter mértékegységben
 * 
 * @param {Room} room 
 * @returns {Number}
 */
function calculateRoomCircumference(room) {
    const circ = RectangleCalculations.calculateRectangleCircumference(room.boundingBox);
    return circ / ApplicationState.pixelsPerMetersRatio;
}

/**
 * Kiszámítja és visszaadja a szobában található CD30/60 tartóelemek mennyiségét méter mértékegységben
 * 
 * @param {Room} room 
 * @returns {Number}
 */
function calculateRoomCd3060Amount(room) {
    const structureElements = StructureElementsService.findById(room.structureElementsId);

    const alignedBeams = structureElements.alignedBeams;
    const crossBeams = structureElements.crossBeams;

    const alignedBeamsSumLength = alignedBeams.map(ab => PointCalculations.calculateDistance(ab.p0, ab.p1)).reduce(ReducerFunctions.sumFunction, 0);
    const crossBeamsSumLength = crossBeams.map(cb => PointCalculations.calculateDistance(cb.p0, cb.p1)).reduce(ReducerFunctions.sumFunction, 0);

    return (alignedBeamsSumLength + crossBeamsSumLength) / ApplicationState.pixelsPerMetersRatio;
}

// todo előbb utóbb ezt is kéne majd refaktorálni
export const summaryCalculator = new SummaryCalculator();