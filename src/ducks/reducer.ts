import * as actiontypes from './actiontypes';

function setNumber(state: Object, number: Number) {
    return Object.assign({}, { number });
}

export default function(state: Object | {}, action: any) {
    switch (action.type) {
        case actiontypes.SET_NUMBER:
            return setNumber(state, action.number);
        default:
            return state;
    }
    return state;
}
