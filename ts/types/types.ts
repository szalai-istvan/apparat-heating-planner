import { ButtonWrapper } from "../classes/renderable/ButtonWrapper"

export interface BlueprintSizeData extends Coordinates {
    w: number,
    h: number
}

export interface BoundaryPoints {
    p1: Coordinates,
    p2: Coordinates
}

export interface BeamDefinition {
    p1: Coordinates,
    p2: Coordinates
}

export interface ButtonWrapperCreateParams {
    text: string,
    size: Coordinates,
    position: Coordinates,
    onClick: Function,
    shouldBeRendered: Supplier<boolean>
}

export interface Coordinates {
    x: number,
    y: number
}

export interface Dimensions {
    width: number,
    length: number
}

export interface Renderable {
    render: Supplier<void>
}

export interface Selectable {
    select: Supplier<void>,
    tryToDeselect: Supplier<boolean>
}

export interface Selector<T extends Selectable> {
    create: (param: string) => boolean,
    select: (param?: T) => void,
    tryToDeselect: Supplier<boolean>,
    removeSelected: Supplier<void>,
    checkForSelection: Supplier<T | null>,
    clearSelectionCache: Supplier<void>,
    clear: Supplier<void>
}

export interface PanelDrawOffsetParams {
    ratio: number,
    length: number,
    width: number,
    offset: number
}
export interface PanelType {
    length: number,
    width: number,
    pipeLength: number
}

export interface EditPanelButtons {
    rotate: ButtonWrapper | null,
    add: ButtonWrapper | null,
    subtract: ButtonWrapper | null,
    delete: ButtonWrapper | null
}

export type Supplier<T> = () => T;
export type Reducer<T> = (a: T, b: T) => T;

export interface DocumentDimensions {
    vw: number,
    vh: number
}