const elementStoreTypeMapping = {

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