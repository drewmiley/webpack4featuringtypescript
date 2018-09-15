import * as actiontypes from './actiontypes';

function setNumber(state: Object, number: Number) {
    return Object.assign({}, { number });
}

export default function(state = {}, action) {
    switch (action.type) {
        case actiontypes.SET_NUMBER:
            return setNumber(state, action.number);
        default:
            return state;
    }
    return state;
}
