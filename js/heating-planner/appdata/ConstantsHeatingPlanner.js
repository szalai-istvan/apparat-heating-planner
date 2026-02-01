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