export default (state = [], action ) => {
  switch (action.type){
    case 'CELL_CLICK':
      return action.boardData;
    case 'INITIALIZE_BOARD':
      return action.boardData;
    default:
      return state;
  }
};  