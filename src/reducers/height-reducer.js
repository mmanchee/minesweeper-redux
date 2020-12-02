export default (state = 0, action ) => {
  switch (action.type){
    case 'CREATE_BOARD':
      return action.height;
    default:
      return state;
  }
};