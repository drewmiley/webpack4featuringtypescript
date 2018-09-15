import * as actiontypes from './actiontypes';

export function setNumber(number: Number) {
    return {
        type: actiontypes.SET_NUMBER,
        number
    }
}
