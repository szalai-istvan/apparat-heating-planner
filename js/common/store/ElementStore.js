import { Blueprint } from "../entities/Blueprint.js";
import { Room } from "../entities/Room.js";
import { ID } from "../math/ID.js";
import { ButtonWrapper } from "../ui/buttons/ButtonWrapper.js";
import { MenuLine } from "../ui/menuLine/MenuLine.js";
import { OptionsBar } from "../ui/OptionsBar/OptionsBar.js";
import { ClassUtil } from "../util/ClassUtil.js";

/**
 * A renderelendő elemeket tároló objektum.
 */
const elementStore = {
    /** @type {Blueprint[]} */
    blueprints: [],
    /** @type {{[key:string]: Blueprint}} */
    blueprintsById: {},
    /** @type {Room[]} */
    rooms: [],
    /** @type {{[key:string]: Room}} */
    roomsById: {},
    /** @type {ButtonWrapper[]} */
    buttons: [],
    /** @type {MenuLine[]} */
    menuLines: [],
    /** @type {OptionsBar[]}*/
    optionsBars: []
};

/**
 * Projekt specifikus típus mappelés az element store-ban.
 * 
 * @type {{[className:string]: {arrayField: string, byIdField?: string}}}
 */
const elementStoreTypeMapping = {
    Blueprint: {
        arrayField: 'blueprints',
        byIdField: 'blueprintsById'
    },
    Room: {
        arrayField: 'rooms',
        byIdField: 'roomsById'
    },
    ButtonWrapper: {
        arrayField: 'buttons',
    },
    MenuLine: {
        arrayField: 'menuLines',
    },
    OptionsBar: {
        arrayField: 'optionsBars',
    }
};

/**
 * Regisztrál egy projekt specifikus típus mappelést az element store-ban.
 * 
 * @param {string} className 
 * @param {string} arrayFieldName 
 * @param {string} byIdFieldName 
 * @returns {undefined}
 */
function registerElementStoreTypeMapping(className, arrayFieldName, byIdFieldName) {
    elementStore[arrayFieldName] = [];
    elementStore[byIdFieldName] = {};

    elementStoreTypeMapping[className] = {
        arrayField: arrayFieldName,
        byIdField: byIdFieldName
    };
}

/**
 * Egy renderelendő objektum elmentése.
 * 
 * @param {object} object 
 * @returns {object} Az elmentett objektum.
 */
function save(object) {
    const className = ClassUtil.getClassName(object);
    if (!className) {
        return; // todo throw string
    }

    const arrayField = elementStoreTypeMapping[className].arrayField;
    const byIdField = elementStoreTypeMapping[className].byIdField;

    if (!arrayField) {
        throw new Error(`Attempt to register unexpected render type: ${className}`); // todo egységes hibakezelése
    }

    elementStore[arrayField].push(object);

    if (byIdField) {
        while (!object.id || elementStore[byIdField][object.id]) {
            object.id = ID.createUniqueId();
        }

        elementStore[byIdField][object.id] = object;
    }

    return object;
}

/**
 * Eltávolít egy renderelendő objektumot az element store-ból.
 * 
 * @param {object} obj 
 * @returns {undefined}
 */
function remove(obj) {
    const className = ClassUtil.getClassName(obj);
    if (!className) {
        return; // todo throw string
    }

    const arrayField = elementStoreTypeMapping[className].arrayField;
    const byIdField = elementStoreTypeMapping[className].byIdField;

    if (!arrayField) {
        throw new Error(`Attempt to delete unexpected render type: ${className}`); // todo egységes hibakezelése
    }

    elementStore[arrayField] = elementStore[arrayField].filter(x => x !== obj);

    if (byIdField) {
        delete elementStore[byIdField][obj.id];
    }
}

/**
 * Visszaadja az adott típus összes példányát.
 * 
 * @param {string} className 
 * @returns {object[]}
 */
function findAll(className) {
    const arrayFieldName = elementStoreTypeMapping[className].arrayField;
    return elementStore[arrayFieldName];
}

/**
 * Megtalálja az adott azonosítójú renderelendő objektumot.
 * 
 * @param {string} className 
 * @param {string} id 
 * @returns {object|undefined} Az adott azonosítójú renderelendő objektum, vagy undefined, ha nincs ilyen.
 */
function findById(className, id) {
    const byIdField = elementStoreTypeMapping[className].byIdField;
    return elementStore[byIdField] ? elementStore[byIdField][id] : undefined;
}

/**
 * Azonosító lista alapján objektumok lekérdezése.
 * 
 * @param {string} className 
 * @param {string[]} idList 
 * @returns {object[]}
 */
function findByIdList(className, idList) {
    const byIdFieldName = elementStoreTypeMapping[className].byIdField;
    const byIdField = elementStore[byIdFieldName];
    return idList.map(id => byIdField[id]).filter(x => x);
}

/**
 * Törli az adott azonosítójú renderelendő objektumot.
 * 
 * @param {string} className 
 * @param {string} id 
 */
function removeById(className, id) {
    const obj = findById(className, id);
    if (obj) {
        remove(obj);
    }
}

/**
 * Törli az összes adott típusú entitást.
 * 
 * @param {string} className 
 */
function removeAll(className) {
    const arrayField = elementStoreTypeMapping[className].arrayField;
    const byIdField = elementStoreTypeMapping[className].byIdField;

    if (elementStore[arrayField]) {
        elementStore[arrayField] = [];
    }

    if (elementStore[byIdField]) {
        elementStore[byIdField] = {};
    }
}

/**
 * Renderelendő objektumok tárolásával kapcsolatos műveletek gyűjteménye.
 */
export const ElementStore = {
    registerElementStoreTypeMapping,
    save,
    remove,
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
};

window.elementStore = elementStore;