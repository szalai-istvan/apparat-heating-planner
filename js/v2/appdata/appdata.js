const panelTypes = {
    AP100: {
        length: 1,
        width: 0.4
    },
    AP150: {
        length: 1.5,
        width: 0.4
    },
    AP200: {
        length: 2,
        width: 0.4
    },
    AP250: {
        length: 2.5,
        width: 0.4
    },
    AP300: {
        length: 3,
        width: 0.4
    },
    AP350: {
        length: 3.5,
        width: 0.4
    },
    AP400: {
        length: 4,
        width: 0.4
    },
    AP450: {
        length: 4.5,
        width: 0.4
    }
};

const tooltipText = {
    WELCOME: "Üdvözli Önt az APPARAT Kft. árajánlatkészítő szoftvere.",
    DRAWING_UPLOAD: "A Fájl feltöltése gomb segítségével töltsön fel egy tervrajzot a kezdéshez.\nVálaszthat jpg, png vagy pdf fájlt.",
    DRAWING_NAV: "A tervrajzon való navigációhoz húzza az egeret a bal egérgomb nyomvatartásával.\nA zoomoláshoz használja az egérgörgőt.",
    SCALING_0: "A Méretarány felvétele gomb segítségével vegyen fel két referenciapontot, majd adja\nmeg a köztük lévő távolságot.",
    SCALING_1: "A jobb egérgomb segítségével adja meg az első referenciapontot.",
    SCALING_2: "A jobb egérgomb segítségével adja meg az második referenciapontot.",
    ROOM_ADD: "A Szoba felvétele gomb segítségével jelölje ki az árajánlathoz tartozó szobákat.",
    ROOM_0: "A jobb egérgomb segítségével jelölje ki a szoba két átellenes sarkát.",
    ROOM_1: "Hogyha végzett a szobák hozzáadásával, a baloldali menü segítségével húzzon be hűtő-fűtő paneleket a folytatáshoz.",
    PANEL_0: "Húzza be a rajzba a hozzáadni kívánt hűtő-fűtő paneleket.",
    PANEL_1: "Kattintson a jobb egérgombbal a panel lehelyezéséhez.",
    ROOM_HOVER: "Kattintson a bal egérgombbal a szoba kiválasztásához.",
    ROOM_SELECT: "A kiválasztott szoba törléséhez használja a baloldali menüt.\nA kijelölést megszüntetheti a jobb egérgomb megnyomásával.",
    PANEL_ADD: "",
    PANEL_HOVER: "",
    PANEL_SELECT: ""
};

const WELCOME = 'WELCOME';
const DRAWING_UPLOAD = 'DRAWING_UPLOAD';
const DRAWING_NAV = 'DRAWING_NAV';
const SCALING_0 = 'SCALING_0';
const SCALING_1 = 'SCALING_1';
const SCALING_2 = 'SCALING_2';
const ROOM_ADD = 'ROOM_ADD';
const ROOM_0 = 'ROOM_0';
const ROOM_1 = 'ROOM_1';
const PANEL_0 = 'PANEL_0';
const PANEL_1 = 'PANEL_1';
const ROOM_HOVER = 'ROOM_HOVER';
const ROOM_SELECT = 'ROOM_SELECT';
const PANEL_ADD = 'PANEL_ADD';
const PANEL_HOVER = 'PANEL_HOVER';
const PANEL_SELECT = 'PANEL_SELECT';