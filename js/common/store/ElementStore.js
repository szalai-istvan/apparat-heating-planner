class ElementStore {
    /** @type {Blueprint[]} */
    blueprints = [];
    /** @type {{[key:string]: Blueprint}} */
    blueprintsById = {};
    /** @type {Room[]} */
    rooms = [];
    /** @type {{[key:string]: Room}} */
    roomsById = {};

    /** @type {ButtonWrapper[]} */
    buttons = [];
    /** @type {MenuLine[]} */
    menuLines = [];
    /** @type {OptionsBar[]}*/
    optionsBars = [];

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
        } else if (className === CLASS_BUTTON_WRAPPER) {
            this.buttons.push(obj);
        } else if (className === CLASS_MENU_LINE) {
            this.menuLines.push(obj);
        } else if (className === CLASS_OPTIONS_BAR) {
            this.optionsBars.push(obj);
        } else {
            const arrayField = elementStoreTypeMapping[className].arrayField;
            const byIdField = elementStoreTypeMapping[className].byIdField;
            if (!(arrayField && byIdField)) {
                throw new Error(`Attempt to register unexpected render type: ${className}`);
            }

            const array = this[arrayField];
            const byId = this[byIdField];
            if (!(array && byId)) {
                throw new Error(`Attempt to register unexpected render type: ${className}`);
            }

            array.push(obj);
            this.#addById(byId, obj);
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
        } else {
            const arrayField = elementStoreTypeMapping[className].arrayField;
            const byIdField = elementStoreTypeMapping[className].byIdField;
            if (!(arrayField && byIdField)) {
                throw new Error(`Deleting render object of type ${className} is unspecified.`);
            }

            const array = this[arrayField];
            const byId = this[byIdField];
            if (!(array && byId)) {
                throw new Error(`Deleting render object of type ${className} is unspecified.`);
            }

            this[arrayField] = array.filter(x => x !== obj);
            this.#removeById(byId, obj);
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