declare class SummaryCalculator {
    calculateSummary(): {
        count: number;
        numberOfRounds: number;
    } | null;
    calculateSummaryAndMapToHtml(): HTMLTableElement | null;
    #private;
}
declare const summaryCalculator: SummaryCalculator;
