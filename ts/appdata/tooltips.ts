export interface Tooltips {
    [name:string]: string
}

export const TOOLTIP_TEXT: Tooltips = {
    WELCOME: "Üdvözli Önt az APPARAT Kft. árajánlatkészítő szoftvere.",
    DRAWING_UPLOAD: "A Fájl feltöltése gomb segítségével töltsön fel egy tervrajzot a kezdéshez.\nVálaszthat jpg, png vagy pdf fájlt.",
    DRAWING_NAV: "A tervrajzon való navigációhoz húzza az egeret a bal egérgomb nyomvatartásával.\nA zoomoláshoz használja az egérgörgőt.",
    SCALING_0: "A Méretarány felvétele gomb segítségével vegyen fel két referenciapontot, majd adja\nmeg a köztük lévő távolságot.",
    SCALING_1: "A jobb egérgomb segítségével adja meg az első referenciapontot.",
    SCALING_2: "A jobb egérgomb segítségével adja meg az második referenciapontot.",
    ROOM_ADD: "A Szoba felvétele gomb segítségével jelölje ki az árajánlathoz tartozó szobákat.",
    ROOM_0: "A jobb egérgomb segítségével jelölje ki a szoba két átellenes sarkát.",
    ROOM_1: "Hogyha végzett a szobák hozzáadásával, a baloldali menü segítségével húzzon be hűtő-fűtő paneleket a folytatáshoz.",
    ROOM_HOVER: "Kattintson a bal egérgombbal a szoba kiválasztásához.",
    ROOM_SELECT: "A kiválasztott szoba törléséhez használja a baloldali menüt.\nA kijelölést megszüntetheti a jobb egérgomb megnyomásával.",
    PANEL_0: "Húzza be a rajzba a hozzáadni kívánt hűtő-fűtő paneleket.\nHa végzett, a baloldali menüben található gomb segítségével letöltheti az árkalkulációt!",
    PANEL_1: "Kattintson a jobb egérgombbal a panel lehelyezéséhez.",
    PANEL_ADD: "",
    PANEL_HOVER: "Kattintson a bal egérgombbal a panel kiválasztásához",
    PANEL_SELECT: "Használja a baloldali menüt a panelcsoporthoz való hozzáadás- és eltávolításhoz, forgatáshoz\nés a csoport törléséhez. Kattintson újra a panelra a mozgatáshoz."
};

export const WELCOME: string = 'WELCOME';
export const DRAWING_UPLOAD: string = 'DRAWING_UPLOAD';
export const DRAWING_NAV: string = 'DRAWING_NAV';
export const SCALING_0: string = 'SCALING_0';
export const SCALING_1: string = 'SCALING_1';
export const SCALING_2: string = 'SCALING_2';
export const ROOM_ADD: string = 'ROOM_ADD';
export const ROOM_0: string = 'ROOM_0';
export const ROOM_1: string = 'ROOM_1';
export const PANEL_0: string = 'PANEL_0';
export const PANEL_1: string = 'PANEL_1';
export const ROOM_HOVER: string = 'ROOM_HOVER';
export const ROOM_SELECT: string = 'ROOM_SELECT';
export const PANEL_ADD: string = 'PANEL_ADD';
export const PANEL_HOVER: string = 'PANEL_HOVER';
export const PANEL_SELECT: string = 'PANEL_SELECT';