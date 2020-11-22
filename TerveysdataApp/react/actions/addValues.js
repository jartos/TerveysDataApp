const addHeartbeat = (value) => ({
  
    type: 'ADD_HEARTBEAT',
    value
  });
  
  const addWaist = (value) => ({
    type: 'ADD_WAIST',
    value
  });
  
  const addWeight = (value) => ({
    type: 'ADD_WEIGHT',
    value
  });
  
  export default {
      addHeartbeat,
      addWaist,
      addWeight
  };