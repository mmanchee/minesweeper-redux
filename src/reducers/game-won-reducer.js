export default (state = false, action ) => {
  switch (action.type){
    case 'CELL_CLICK':
      return action.gameWon;
    default:
      return state;
  }
};