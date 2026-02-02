/**
 * Alkalmazás konstans értékei
 */
export const Constants = {
    room: {
        roomTextSizeInMeters: 0.25,
        roomTextPopFactor: 1.1,
        roomLineWeightInMeters: 0.017,
        roomDefaultTextColor: 'green',
        roomFillColor: '#FFFFFFA0',
        roomNameOutlineWidthInMeters: 0.0035,
        prefillRoomNames: [
            'Szoba 1',
            'Nappali',
            'Szoba 2',
            'Hálószoba 1',
            'Szoba 3',
            'Hálószoba 2',
            'Folyosó',
            'Gyerekszoba 1',
            'Dolgozószoba',
            'Gyerekszoba 2',
            'Gardrób',
            'Konyha',
            'Fürdőszoba',
            'Előszoba'
        ]
    },

    ui: {
        backgroundColor: 255,
        topRibbonHeight: 60,
        leftRibbonWidth: 120,
        uiColor: 'lightgrey',
        defaultTextColor: 'black',
        selectedTextColor: 'red',
        regularButtonSize: { x: 100, y: 40 },
        smallButtonSize: { x: 100, y: 30 },
        tallSmallButtonSize: { x: 100, y: 45 },
        halfWidthButtonSize: { x: 50, y: 30 },
        buttonGapX: 10,
        buttonGapY: 5,
        uiTextSize: 12,
        keyStrokeRecordLength: 30,
        selectDragThreshold: 10,
        modals: [],
        enterableButtons: [],
        optionsBarTextSize: 14,
        uncensorBoobsPassword: 'CICI'
    },

    resources: {
        apparatLogoPath: 'img/APPARAT_transparent.PNG',
        cicisNeniPath: 'img/cicis_neni.png'
    },

    debug: {
        saveToLocalStorageEnabled: true,
        projectStateLoggingEnabled: true,
        localStorageDataKey: window.location.href.split('/').filter(sp => sp.includes('html'))[0].replaceAll('.html', '') + '-project-save'
    },

    grid: {
        gridResolutionInMeters: 0.05
    },

    file: {
        supportedImageContentTypes: ['image/jpeg', 'image/png'],
        supportedPdfContentType: 'application/pdf'
    },

    screen: {
        minimumZoom: 0.2,
        maximumZoom: 50,
        zoomStep: 1.05
    },

    classNames: {
        appError: 'AppError',
        number: 'number',
        string: 'string',
        point: 'Point',
        array: 'Array',
        blueprint: 'Blueprint',
        room: 'Room',
        buttonWrapper: 'ButtonWrapper',
        line: 'Line',
        rectangle: 'Rectangle',
        optionsBar: 'OptionsBar',
        menuLine: 'MenuLine'
    },

    strings: {
        background: 'background',
        black: 'black',
        blue: 'blue',
        body: 'body',
        button: 'button',
        change: 'change',
        click: 'click',
        contextmenu: 'contextmenu',
        darkgrey: 'darkgrey',
        dialog: 'dialog',
        disabled: 'disabled',
        delete: 'Delete',
        emptyString: '',
        enter: 'Enter',
        escape: 'Escape',
        for: 'for',
        id: 'id',
        input: 'input',
        keydown: 'keydown',
        keypress: 'keypress',
        keyup: 'keyup',
        label: 'label',
        left: 'left',
        name: 'name',
        nemKell: 'nem kell',
        open: 'open',
        radio: 'radio',
        radioLabel: 'radio-label',
        red: 'red',
        resize: 'resize',
        right: 'right',
        span: 'span',
        type: 'type',
        value: 'value',
        white: 'white'
    },

    geometry: {
        testPointCoordinate: 20000000,
        parallelityTreshold: 0.0001,
        maximumLineIntersectionRoundingError: 0.0001,
        infiniteLineLength: 20000000,
        deltaXVerticalityThreshold: 0.00001,
        defaultRectangleColor: 'blue',
        defaultRectangleStrokeWeight: 1

    }
};

window.Constants = Constants;