export interface PriceData {
    [product:string]: number
}

export interface Prices {
    panels: PriceData,
    collectorTypes: PriceData,
    distBox: PriceData,
    transport: {a: number, b: number}
    tElement: number,
    confusor: number,
    collector: number,
    tube: number,
    eurokonusz: number,
    ud30: number,
    cd30_60: number,

}

export const PRICES: Prices = {
    panels: { // panelek egységára
        F100: 6350,
        F150: 9525,
        F200: 12700,
        F250: 16510,
        F300: 19812,
        F350: 23144,
        F400: 26416
    },
    tElement: 1750, // T-idomok egységára
    confusor: 1750, // Szűkítő egységára
    collector: 0,
    tube: 760, // Gerinc cső + héj egységára
    eurokonusz: 850, // Eurokónusz egységára
    ud30: 220, // UD30 profil egységára
    cd30_60: 320, // CD30/60 profil egységára
    collectorTypes: { // Osztógyüjtő típusok egységár
        "nem kell": 0,
        "2 körös": 32000,
        "3 körös": 38000,
        "4 körös": 42000,
        "5 körös": 48000,
        "6 körös": 55000,
        "7 körös": 65000,
        "8 körös": 72000,
        "9 körös": 80000,
        "10 körös": 88000,
        "11 körös": 94000,
        "12 körös": 102000
    },
    distBox: { // Osztószekrény típusok egységár
        "nem kell": 0,
        "Falba oszekrény 2-4": 21717,
        "Falba oszekrény 5-8": 23503,
        "Falba oszekrény 9-10": 26181,
        "Falba oszekrény 11-12": 27918,
        "Falba oszekrény 12-14": 29566,
        "Falon kívüli oszekrény 2-4": 19881,
        "Falon kívüli oszekrény 5-8": 21576,
        "Falon kívüli oszekrény 9-10": 24260,
        "Falon kívüli oszekrény 11-12": 25633,
        "Falon kívüli oszekrény 12-14": 27642,
    },
    transport: { // Szállítási költség = (a * [km]) + b
        a: 304,
        b: 6_000
    }
};