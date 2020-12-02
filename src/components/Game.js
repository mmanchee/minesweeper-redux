import React from 'react';
import Board from './Board';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 
class Game extends React.Component {
  /*
    Beginner: 10 mines, 8x8 board
    Intermediate: 20 mines, 12x12 board
    Expert: 40 mines, 16x16 board
    */
  // state = {
  //   height: 0,
  //   width: 0,
  //   mines: 0
  // };

  handleGameStart = () => {
    const {dispatch} = this.props;
    const action = {
      type: 'CREATE_BOARD',
      width: parseInt(document.getElementById('width').value),
      height: parseInt(document.getElementById('height').value),
      mines: parseInt(document.getElementById('mines').value)
    }
    dispatch(action);



    // let width = document.querySelector("#level_select");
    // if (difficulty.value === "beginner") {
    //   this.setState({
    //     height: 8,
    //     width: 8,
    //     mines: 10,
    //   });
    // } else if (difficulty.value === "intermediate") {
    //   this.setState({
    //     height: 12,
    //     width: 12,
    //     mines: 20,
    //   });
    // } else  { //(difficulty.value === "expert")
    //   this.setState({
    //     height: 16,
    //     width: 16,
    //     mines: 40,
    //   });
    //}
    console.log('state in handleGameStart',this.state)
  }

  render() {
    // const { height, width, mines } = this.state;
    return (
      <div className="game">
        <div className="game-info">
          <div className="instructions">
            <h4 data-tip data-for="tooltip">Rules</h4>
            <ReactTooltip id="tooltip" place="top" effect="solid">
              You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) or flag all the mines, you win.
              Clicking a square which doesn't have a bomb reveals the number of neighboring squares containing bombs. Use this information plus some guess work to avoid the bombs.
              To open a square, point at the square and click on it. To mark a square you think is a bomb, point and right-click.
            </ReactTooltip>
          </div>
          <h4>Select a level a click "start"</h4>
          <span className="info">Choose Size:
          <input type="number" id="height" min="4" max="45" placeholder="Enter Height"/>
          <input type="number" id="width" min="4" max="45" placeholder="Enter Width"/>
          <input type="number" id="mines" min="1" placeholder="Enter Mine Qty"/>
            {/* <select id="level_select">
              <option value="beginner"> Beginner </option>
              <option value="intermediate"> Intermediate </option>
              <option value="expert"> Expert </option>
            </select> */}
          </span>
          <button onClick={this.handleGameStart}>Start</button>
        </div>
        <Board height={this.props.height} width={this.props.width} mines={this.props.mines} />
      </div>
    );
  }
}

Game.propTypes={
  width: PropTypes.number,
  height: PropTypes.number,
  mines: PropTypes.number,
  
}

const mapStateToProps = state => {
  return {
    width: state.width,
    height: state.height,
    mines: state.mines,
  }
}

Game = connect(mapStateToProps)(Game)

export default Game;