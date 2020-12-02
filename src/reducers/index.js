import boardDataReducer from './board-data-reducer';
import gameWonReducer from './game-won-reducer';
import mineCountReducer from './mine-count-reducer';
import minesReducer from './mines-reducer';
import heightReducer from './height-reducer';
import widthReducer from './width-reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  boardData: boardDataReducer,
  gameWon: gameWonReducer,
  mineCount: mineCountReducer,
  height: heightReducer,
  mines: minesReducer,
  width: widthReducer,
});

export default rootReducer;