
const heartbeat = (state = [], action) => {
    switch (action.type) {
      case 'ADD_HEARTBEAT':
/*         console.log("ADD_HEARTBEAT Reducer action.payload: ", action.payload.data); */
        return action.payload.data;
      default:
        return state
    }
  }
  export default heartbeat