const waist = (state = [], action) => {
  switch (action.type) {
    case 'ADD_WAIST':
/*         console.log("ADD_waist Reducer action.payload: ", action.payload.data); */
      return action.payload.data;
    default:
      return state
  }
}
export default waist