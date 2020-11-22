import _ from 'lodash';
import { FETCH_PERSONS,
        CREATE_PERSON,
        DELETE_PERSON
} from '../actions/types';

export default (state = {}, action) => {
switch (action.type) {
        case FETCH_PERSONS:
            return _.mapKeys(action.payload, 'PersonID') // Luo objekti payloadista --> storeen
        case CREATE_PERSON:
            return { ...state, [action.payload.PersonID]: action.payload.Name };
        case DELETE_PERSON:
            return _.omit(state, action.payload);
        default:
        return state;
    }
};