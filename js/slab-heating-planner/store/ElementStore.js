class ElementStore { //Project-specific
    /** @type {Blueprint[]} */
    blueprints = [];
    /** @type {Room[]} */
    rooms = [];
    /** @type {{[key:string]: Room}} */
    roomsById = {};
    /** @type {SlabHeater[]} */
    slabHeaters = [];
    /** @type {{[key:string]: SlabHeater}} */
    slabHeatersById = {};
    /** @type {SlabHeaterGroup[]} */
    slabHeaterGroups = [];
    /** @type {{[key:string]: SlabHeaterGroup}} */
    slabHeaterGroupsById = {};
    /** @type {PipeDriver[]} */
    pipeDrivers = [];
    /** @type {{[key:string]: PipeDriver}} */
    pipeDriversById = {};
    /** @type {Box[]} */
    boxes = [];
    /** @type {{[key:string]: Box}} */
    boxesById = {};
    /** @type {BoxGroup[]} */
    boxGroups = [];
    /** @type {{[key:string]: BoxGroup}} */
    boxGroupsById = {};

    /** @type {ButtonWrapper[]} */
    buttons = [];
    /** @type {MenuLine[]} */
    menus = [];
    /** @type {OptionsBar[]} */
    optionsBars = [];

    constructor() { }

    register(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === CLASS_SLAB_HEATER) {
            this.slabHeaters.push(obj);
            this.#addById(this.slabHeatersById, obj);
        } else if (className === CLASS_BOX) {
            this.boxes.push(obj);
            this.#addById(this.boxesById, obj);
        } else if (className === CLASS_BLUEPRINT) {
            this.blueprints.push(obj);
        } else if (className === CLASS_ROOM) {
            this.rooms.push(obj);
            this.#addById(this.roomsById, obj);
        } else if (className === CLASS_BUTTON_WRAPPER) {
            this.buttons.push(obj);
        } else if (className === CLASS_MENU_LINE) {
            this.menus.push(obj);
        } else if (className === CLASS_OPTIONS_BAR) {
            this.optionsBars.push(obj);
        } else if (className === CLASS_SLAB_HEATER_GROUP) {
            this.slabHeaterGroups.push(obj);
            this.#addById(this.slabHeaterGroupsById, obj);
        } else if (className === CLASS_BOX_GROUP) {
            this.boxGroups.push(obj);
            this.#addById(this.boxGroupsById, obj);
        } else if (className === CLASS_PIPE_DRIVER) {
            this.pipeDrivers.push(obj);
            this.#addById(this.pipeDriversById, obj);
        } else {
            throw new Error(`Attempt to register unexpected render type: ${className}`);
        }
    }

    remove(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === CLASS_ROOM) {
            this.rooms = this.rooms.filter((x) => x !== obj);
            this.#removeById(this.roomsById, obj);
        } else if (className === CLASS_BLUEPRINT) {
            this.blueprints = this.blueprints.filter((x) => x !== obj);
        } else if (className === CLASS_SLAB_HEATER) {
            this.slabHeaters = this.slabHeaters.filter((x) => x !== obj);
            this.#removeById(this.slabHeatersById, obj);
        } else if (className === CLASS_BOX) {
            this.boxes = this.boxes.filter((x) => x !== obj);
            this.#removeById(this.boxesById, obj);
        } else if (className === CLASS_SLAB_HEATER_GROUP) {
            this.slabHeaterGroups = this.slabHeaterGroups.filter((x) => x !== obj);
            this.#removeById(this.slabHeaterGroupsById, obj);
        } else if (className === CLASS_BOX_GROUP) {
            this.boxGroups = this.boxGroups.filter((x) => x !== obj);
            this.#removeById(this.boxGroupsById, obj);
        } else if (className === CLASS_PIPE_DRIVER) {
            this.pipeDrivers = this.pipeDrivers.filter((x) => x !== obj);
            this.#removeById(this.pipeDriversById, obj);
        } else {
            throw new Error(
                `Deleting render object of type ${className} is unspecified.`
            );
        }
    }

    getById(obj, id) {
        return obj[id];
    }

    getByIdList(obj, idList) {
        return idList.map(id => obj[id]).filter(x => x);
    }

    #addById(objectsById, objectToAdd) {
        let existingObject = objectToAdd.id ? objectsById[objectToAdd.id] : undefined;
        while (existingObject) {
            objectToAdd.id = createUniqueId();
            existingObject = objectsById[objectToAdd.id];
        }
        objectsById[objectToAdd.id] = objectToAdd;
    }

    #removeById(objectsById, objectToRemove) {
        delete objectsById[objectToRemove.id];
    }
}

const elementStore = new ElementStore();
