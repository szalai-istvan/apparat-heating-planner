/**
 * Projekt specifikus konstansok
 */
export const HeatingPlannerConstants = {
    panelTypes: {
        F100: {
            length: 0.4,
            width: 0.4,
            pipeLength: 9.5
        },
        F150: {
            length: 0.9,
            width: 0.4,
            pipeLength: 13.5
        },
        F200: {
            length: 1.4,
            width: 0.4,
            pipeLength: 17.5
        },
        F250: {
            length: 1.9,
            width: 0.4,
            pipeLength: 21.5
        },
        F300: {
            length: 2.4,
            width: 0.4,
            pipeLength: 25.5
        },
        F350: {
            length: 2.9,
            width: 0.4,
            pipeLength: 29.5

        },
        F400: {
            length: 3.4,
            width: 0.4,
            pipeLength: 33.5
        }
    },

    prices: {
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
    },

    beam: {
        beamColor: 'lightgery',
        beamWidthMeter: 0.06,
        ud30WidthMeter: 0.03,
        metersBetweenBeams: 1,
        beamsMinimumOffsetInMeters: 0.1,
        beamTextSizeInMeters: 0.05,
        cd3060BeamTypeName: 'CD30/60 profil',
        ud30BeamTypeName: 'UD30 profil'
    },

    panel: {
        panelTextSizeInMeters: 0.18,
        panelTextPopFactor: 0.1,
        panelSelectionMultiplier: 0.8, // TODO ez micsoda és van-e bármire használva?
        panelFillColor: 'white',
        panelContourLineThicknessInMeters: 0.02,
        panelLineThicknesInMeters: 0.01,
        panelEllipseRadiusInMeters: 0.24,
        panelTubeExtraLengthPerSideInMeters: 0.3,
        panelTubeExtraLengthStepInMeters: 0.03,
        panelTextRectSizeMul: 1.4
    },

    strings: {
        F100: 'F100'
    },

    classNames: {
        panel: 'Panel',
        panelGroup: 'PanelGroup',
        structureElements: 'StructureElements'
    }

};