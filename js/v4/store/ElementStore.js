class ElementStore {
    /** @type {Blueprint[]} */
    blueprints = [];
    /** @type {Room[]} */
    rooms = [];
    /** @type {{[key:string]: Room}} */
    roomsById = {};
    /** @type {Panel[]} */
    panels = [];
    /** @type {{[key:string]: Panel}} */
    panelsById = {};
    /** @type {PanelGroup[]} */
    panelGroups = [];
    /** @type {{[key:string]: PanelGroup}} */
    panelGroupsById = {};
    /** @type {StructureElements[]} */
    structureElements = [];
    /** @type {{[key:string]: StructureElements}} */
    structureElementsById = {};

    /** @type {ButtonWrapper[]} */
    buttons = [];

    constructor() { }

    register(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === CLASS_BLUEPRINT) {
            this.blueprints.push(obj);
        } else if (className === CLASS_ROOM) {
            this.rooms.push(obj);
            this.#addById(this.roomsById, obj);
        } else if (className === CLASS_PANEL) {
            this.panels.push(obj);
            this.#addById(this.panelsById, obj);
        } else if (className === CLASS_PANEL_GROUP) {
            this.panelGroups.push(obj);
            this.#addById(this.panelGroupsById, obj);
        } else if (className === CLASS_BUTTON_WRAPPER) {
            this.buttons.push(obj);
        } else if (className === CLASS_STRUCTURE_ELEMENTS) {
            this.structureElements.push(obj);
            this.#addById(this.structureElementsById, obj);
        } else {
            throw new Error(`Attempt to register unexpected render type: ${className}`);
        }
    }

    remove(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === CLASS_BLUEPRINT) {
            this.blueprints = this.blueprints.filter((x) => x !== obj);
        } else if (className === CLASS_ROOM) {
            this.rooms = this.rooms.filter((x) => x !== obj);
            this.#removeById(this.roomsById, obj);
        } else if (className === CLASS_PANEL) {
            this.panels = this.panels.filter((x) => x !== obj);
            this.#removeById(this.panelsById, obj);
        } else if (className === CLASS_PANEL_GROUP) {
            this.panelGroups = this.panelGroups.filter((x) => x !== obj);
            this.#removeById(this.panelGroupsById, obj);
        } else if (className === CLASS_STRUCTURE_ELEMENTS) {
            this.structureElements = this.structureElements.filter((x) => x !== obj);
            this.#removeById(this.structureElementsById, obj);
        } else {
            throw new Error(`Deleting render object of type ${className} is unspecified.`);
        }
    }

    getById(obj, id) {
        return obj[id];
    }

    getByIdList(obj, idList) {
        return idList.map(id => obj[id]).filter(x => x);
    }

    #addById(objectsById, objectToAdd) {
        if (!objectToAdd.id) {
            objectToAdd.id = createUniqueId();
        }

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