/**
 * Megállapítja, hogy a kiválasztott csővezető objektum konfigurációja teljes-e.
 * Amennyiben szükséges, elvégzi a véglegesításhez szükséges igazításokat.
 * 
 * @returns {boolean}
 */
function selectedPipeDriverIsFullyConfigured() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    if (pipeDriver.isFullyConfigured) {
        return true;
    }

    const result = getBoxGroupWithEndNodeAtPipeDriversLastPoint(selectedPipeDriver);
    if (result) {
        const validationResult = validateBoxGroupAndPipeDriver(pipeDriver, result);
        if (validationResult === VALIDATION_OK) {
            const successfulAdjustment = adjustLastPointOfPipeDriver(pipeDriver, result);
            if (successfulAdjustment) {
                pipeDriver.isFullyConfigured = true;
                result.pipeDriverId = pipeDriver.id;
                calculatePipes(pipeDriver);
            } else {
                displayMessage('A végpontigazítás két pontból álló csőnyomvonal esetén nem lehetséges.<br/>Kérem igazítsa a födémáttörés helyzetét a rajzon úgy, hogy a nyomvonal pontosan találjon bele!');
                resetSelectedPipeDriver();
            }
        } else if (validationResult === VALIDATION_GROUP_MEMBER_NUMBER_MISMATCH) {
            displayMessage('A kiválasztott födémfűtő csoport nem köthető ehhez a födémáttörés csoporthoz, mert az áttörések és a fűtőelemek száma eltér!');
            resetSelectedPipeDriver();
        } else if (validationResult === VALIDATION_ALIGNMENT_MISMATCH) {
            displayMessage('A csőnyomvonal utolsó szakasza nem megfelelő irányból közelíti meg a födémáttörést!');
            resetSelectedPipeDriver();
        } else if (validationResult === VALIDATION_TOO_LONG_PIPE) {
            displayMessage(`${PIPE_DRIVER_MAX_LENGTH_METERS} m-nél hosszabb cső nem megengedett.`);
            resetSelectedPipeDriver();
        }
    }
    return pipeDriver.isFullyConfigured;
}


function validateBoxGroupAndPipeDriver(/** @type {PipeDriver} */ pipeDriver, /** @type {BoxGroup} */ boxGroup) {
    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);

    if (slabHeaterGroup.slabHeaterIds.length !== boxGroup.boxIds.length) {
        return VALIDATION_GROUP_MEMBER_NUMBER_MISMATCH;
    }

    const alignment = boxGroup.alignment;
    const lastDirection = getLastDirectionOfPipeDriver(pipeDriver);
    if (alignment % 2 === 1) {
        if (lastDirection !== DIRECTION_X) {
            return VALIDATION_ALIGNMENT_MISMATCH;
        }
    } else if (alignment % 2 === 0) {
        if (lastDirection !== DIRECTION_Y) {
            return VALIDATION_ALIGNMENT_MISMATCH;
        }
    }

    const pipeLengths = calculatePipeLengths(pipeDriver);
    const tooLongPipe = pipeLengths.filter(pl => pl > PIPE_DRIVER_MAX_LENGTH_METERS).length > 0;
    if (tooLongPipe) {
        return VALIDATION_TOO_LONG_PIPE;
    }

    return VALIDATION_OK;
}