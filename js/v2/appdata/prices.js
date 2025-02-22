const PRICES = {
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
    collector: 25,
    tube: 10, // Gerinc cső + héj egységára
    eurokonusz: 5, // Eurokónusz egységára
    ud30: 10, // UD30 profil egységára
    cd30_60: 10, // CD30/60 profil egységára
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
        a: 10_000,
        b: 5_000
    }
};