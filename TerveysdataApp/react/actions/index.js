import api from '../apis/data';
import { 
    FETCH_PERSONS,
    FETCH_PERSON,
    CREATE_PERSON,
    DELETE_PERSON,
    CREATE_MEASURE,
    DELETE_MEASURE,
    FETCH_MEASURES,
    SELECT_PERSON
 } from './types';

 export const selectedUser = (value) => ({
    type: SELECT_PERSON,
    value
  });


export const fetchPerson = (id) => async dispatch => {
    const response = await api.get(`/persons/${id}`);
    console.log("fetchPerson response: ", response);
    dispatch({type: FETCH_PERSON, payload: response.data});
};

export const fetchPersons = () => async dispatch => {
    const response = await api.get('/persons');
    dispatch({type: FETCH_PERSONS, payload: response.data});
};

export const createPerson = (formValues) => async dispatch => {
    console.log("createPerson formValues: ", formValues)
    const response = await api.post(`/persons`, formValues);
    dispatch({ type: CREATE_PERSON, payload: response.data });
};

export const deletePerson = (id) => async dispatch => {
    console.log("deletePerson id: ", id)
    await api.delete(`/persons/${id}`);
    dispatch({ type: DELETE_PERSON, payload: id });
};

export const fetchMeasures = (id) => async dispatch => {
    const response = await api.get(`/measures/person/${id}`);
    console.log("fetchMeasures response: ", response)   
    dispatch({ type: FETCH_MEASURES, payload: response.data });
  
};

export const createMeasure = (id, formValues) => async dispatch => {
    console.log("createMeasure id: ", formValues)
    const response = await api.post(`/measures/person/${id}`, formValues);
    console.log("response: ", response.data)
    dispatch({ type: CREATE_MEASURE, payload: response.data });
};

export const deleteMeasure = (id) => async dispatch => {
    console.log("deleteMeasure id: ", id)
    await api.delete(`/measures/${id}`);
    
    dispatch({ type: DELETE_MEASURE, payload: id });
};


export const createHeartBeat = (id, formValues) => async dispatch => {
  console.log("createHeartBeat formValues: ", formValues)
  const response = await api.post(`/measures/person/${id}`, formValues);
  console.log("CREATE HeartBeat response", response);
  dispatch({ type: 'ADD_HEARTBEAT', payload: response });
};

export const createWeight = (id, formValues) => async dispatch => {
  console.log("createWeight formValues: ", formValues)
  const response = await api.post(`/measures/person/${id}`, formValues);
  console.log("createWeight response", response);
  dispatch({ type: 'ADD_WEIGHT', payload: response });
};

export const createWaist = (id, formValues) => async dispatch => {
  console.log("createWaist formValues: ", formValues)
  const response = await api.post(`/measures/person/${id}`, formValues);
  console.log("createWaist response", response);
  dispatch({ type: 'ADD_WAIST', payload: response });
};


  
export const addWaist = (value) => ({
    type: 'ADD_WAIST',
    value
  });
  
export const addWeight = (value) => ({
    type: 'ADD_WEIGHT',
    value
  });

  export const clearMeasures = () => ({
    type: 'CLEAR_MEASURES',
    payload: []
  });
  
  export const clearSelectedPerson = () => ({
    type: 'CLEAR_SELECTED_PERSON',
    payload: []
  });



