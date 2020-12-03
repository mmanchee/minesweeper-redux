export default (state = 0, action ) => {
  switch (action.type){
    case 'CELL_CLICK':
      return action.mineCount;
    case 'INITIALIZE_BOARD':
      return action.mineCount;
    default:
      return state;
  }
};