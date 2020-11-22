const weight = (state = [], action) => {
  switch (action.type) {
    case 'ADD_WEIGHT':
/*         console.log("ADD_weight Reducer action.payload: ", action.payload.data); */
      return action.payload.data;
    default:
      return state
  }
}
export default weight