import {
    FETCH_PERSON,
    CLEAR_SELECTED_PERSON
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PERSON:
            return action.payload;
        case CLEAR_SELECTED_PERSON:
            return state = {};
        default:
            return state;
    }
};