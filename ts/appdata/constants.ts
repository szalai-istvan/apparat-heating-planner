import { Coordinates } from "../types/types";

export class Constants {
    static readonly REGULAR_BUTTON_SIZE: Coordinates = { x: 100, y: 40 };
    static readonly SMALL_BUTTON_SIZE: Coordinates = { x: 80, y: 30 };
    static readonly HALF_BUTTON_SIZE: Coordinates = { x: 40, y: 30 };
    static readonly TALL_BUTTON_SIZE: Coordinates = { x: 80, y: 60 };

    static readonly PANEL_TEXT_SIZE_IN_METERS: number = 0.18;
    static readonly PANEL_TEXT_POP_FACTOR: number = 0.1;
    static readonly PANEL_SELECTION_MULTIPLIER: number = 0.8;
    static readonly PANEL_FILL_COLOR: string = 'white';
    static readonly PANEL_CONTOUR_LINE_THICKNESS: number = 0.02;
    static readonly PANEL_LINE_THICKNESS: number = 0.01;
    static readonly PANEL_ELLIPSE_RADIUS: number = 0.24;
    static readonly PANEL_TUBE_EXTRA_LENGTH_PER_SIDE: number = 0.3;
    static readonly PANEL_TUBE_EXTRA_LENGTH_STEP: number = 0.03;
    static readonly PANEL_TEXT_RECT_SIZE_MUL: number = 1.4;

    static readonly ROOM_TEXT_SIZE_IN_METERS: number = 0.25;
    static readonly ROOM_TEXT_POP_FACTOR: number = 1.1;
    static readonly ROOM_LINE_WEIGHT_IN_METERS: number = 0.017;

    static readonly DEFAULT_TEXT_COLOR: string = 'black';
    static readonly SELECTED_TEXT_COLOR: string = 'red';

    static readonly IMAGE_CONTENT_TYPES: string[] = ['image/jpeg', 'image/png'];
    static readonly PDF_CONTENT_TYPE: string = 'application/pdf';

    static readonly BEAM_COLOR: string = 'lightgrey';
    static readonly BEAM_WIDTH_METER: number = 0.06;
    static readonly METERS_BETWEEN_BEAMS: number = 1;
    static readonly BEAM_MINIMUM_OFFSET_METERS: number = 0.1;
    static readonly BEAM_TEXT_SIZE_METER: number = 0.04;
    static readonly BEAM_TYPE: string = 'CD30/60 profil';
}