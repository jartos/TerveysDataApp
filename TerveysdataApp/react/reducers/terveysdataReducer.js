import _ from 'lodash';

import {
    FETCH_MEASURES,
    CREATE_MEASURE,
    DELETE_MEASURE,
    CLEAR_MEASURES,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MEASURES:
            if(action.payload[0] === undefined){ // Palautetaan state nollaan jos käyttäjälle ei ole mittauksia
                console.log("action.payload[1]: ",action.payload[0]);
                return state = {};
            }
            else return { ..._.groupBy(action.payload, 'TypeID')}; // Luo objekti payloadista --> storeen
        case CREATE_MEASURE:          
            return { ...state, [action.payload.data]: action.payload.data };
        case DELETE_MEASURE:
            console.log("DELETE_MEASURE: ", action.payload);
            return _.omit(state, action.payload);
        case CLEAR_MEASURES:
            return state = {};
        default:
            return state;
    }
};