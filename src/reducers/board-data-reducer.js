export default (state = [], action ) => {
  switch (action.type){
    case 'CELL_CLICK':
      return action.boardData;
    default:
      return state;
  }
};