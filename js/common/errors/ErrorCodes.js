/**
 * Hibakódok gyüjteménye.
 */
export const ErrorCodes = {
    INVALID_PAGE_NUMBER: 'INVALID_PAGE_NUMBER',
    UNEXPECTED_FILE_TYPE: 'UNEXPECTED_FILE_TYPE',
    ROOM_NAME_NOT_UNIQUE: 'ROOM_NAME_NOT_UNIQUE',
    ROOM_OVERLAP: 'ROOM_OVERLAP',
    INVALID_SCALE: 'INVALID_SCALE',
    MISSING_ROOM_NAME: 'MISSING_ROOM_NAME',
    PANEL_GROUP_OUTSIDE_ROOM: 'PANEL_GROUP_OUTSIDE_ROOM',
    INVALID_PANEL_ALIGNMENT: 'INVALID_PANEL_ALIGNMENT',
    INVALID_DISTANCE: 'INVALID_DISTANCE',
    SLAB_HEATER_GROUP_OUTSIDE_ROOM: 'SLAB_HEATER_GROUP_OUTSIDE_ROOM',
    BOX_GROUP_OUTSIDE_ROOM: 'BOX_GROUP_OUTSIDE_ROOM',
    INVALID_DIRECTION_TO_BOX: 'INVALID_DIRECTION_TO_BOX'
};

/**
 * Hibakódok fordítása.
 */
export const ErrorTranslations = {
    INVALID_PAGE_NUMBER: 'Érvénytelen oldalszám. Az első oldal lesz megjelenítve.',
    UNEXPECTED_FILE_TYPE: 'Váratlan fájl típus!<br/>Válasszon jpg, png vagy pdf fájlt a folytatáshoz.',
    ROOM_NAME_NOT_UNIQUE: 'Ilyen nevű szoba már létezik. Egyedi nevet kell megadni.',
    ROOM_OVERLAP: 'A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.',
    INVALID_SCALE: 'Érvénytelen méretarány. Csak pozitív szám adható meg!',
    MISSING_ROOM_NAME: 'Név nélkül nem vehető fel szoba!',
    PANEL_GROUP_OUTSIDE_ROOM: 'A panelcsoport egy része szobán kívülre kerülne!',
    SLAB_HEATER_GROUP_OUTSIDE_ROOM: 'A födémfűtő csoport egy része szobán kívülre kerülne!',
    INVALID_PANEL_ALIGNMENT: 'Egymásra merőleges panelek nem lehetnek egy szobában!',
    INVALID_DISTANCE: 'Érvénytelen távolság!',
    BOX_GROUP_OUTSIDE_ROOM: 'A födémáttörés csoportnak szobán belül kell lennie!',
    INVALID_DIRECTION_TO_BOX: 'A csőnyomvonal nem megfelelő irányból közelíti meg a dobozt!'
};