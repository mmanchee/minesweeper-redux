import React from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Board extends React.Component {
  constructor(props){
    console.log('in constructor') 
    super(props);
    // const {dispatch} = this.props;
    // const action = {
    //   type: 'INITIALIZE_BOARD',
    //   boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
    //   gameWon: false,
    //   mineCount: this.props.mines,
    // }
    // dispatch(action);
    // console.log(action) 
    // this.state = {
    //   boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
    //   gameWon: false,
    //   mineCount: this.props.mines,
    // };
  }
  

  /* Helper Functions */
  // get mines
  getMines(data) {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (dataItem.isMine) {
          mineArray.push(dataItem);
        }
      });
    });
    return mineArray;
  }

  // get Flags
  getFlags(data) {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (dataItem.isFlagged) {
          mineArray.push(dataItem);
        }
      });
    });

    return mineArray;
  }

  // get Hidden cells
  getHidden(data) {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (!dataItem.isRevealed) {
          mineArray.push(dataItem);
        }
      });
    });

    return mineArray;
  }

  // // get random number given a dimension
  getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }

  // Gets initial board data
  initBoardData(height, width, mines) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbor: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    data = this.plantMines(data, height, width, mines);
    data = this.getNeighbors(data, height, width);
    //console.log(data);
    return data;
  }

  // plant mines on the board
  plantMines(data, height, width, mines) {
    let randomX, randomY, minesPlanted = 0;

    while (minesPlanted < mines) {
      randomY = this.getRandomNumber(width);
      randomX = this.getRandomNumber(height);
      if (!(data[randomX][randomY].isMine)) {
        data[randomX][randomY].isMine = true;
        minesPlanted++;
      }
    }
    return (data);
  }

  // get number of neighboring mines for each board cell
  getNeighbors(data, height, width) {
    let updatedData = data, index = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data, height,width);
          area.map(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbor = mine;
        }
      }
    }
    return (updatedData);
  };

  // looks for neighboring cells and returns them
  traverseBoard(x, y, data,height,width) {
    const el = [];
    //console.log('travis props',this.props)
    
    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }
    // up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }
    // top right
    if (x > 0 && y <width - 1) {  
      el.push(data[x - 1][y + 1]);
    }
    // right
    if (y < width - 1) {
      el.push(data[x][y + 1]);
    }
    // bottom right
    if (x < height - 1 && y < width - 1) {
      el.push(data[x + 1][y + 1]);
    }
    // down
    if (x < height - 1) {
      el.push(data[x + 1][y]);
    }
    // bottom left
    if (x < height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }
    // left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }
    return el;
  }

  // reveals the whole board
  revealBoard() {
    let updatedData = this.props.boardData;
    updatedData.map((dataRow) => {
      dataRow.map((dataItem) => {
        dataItem.isRevealed = true;
      });
    });
    this.setState({
      boardData: updatedData
    })
  }

  /* reveal logic for empty cell */
  revealEmpty(x, y, data) {
    //console.log('reveal empty', this.props);
    let area = this.traverseBoard(x, y, data, this.props.height, this.props.width);
    area.map(value => {
      if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  // Handle User Events
  handleCellClick(x, y) {
    let win = false;

    // check if revealed. return if true.
    if (this.props.boardData[x][y].isRevealed) return null;

    // check if mine. game over if true
    if (this.props.boardData[x][y].isMine) {
      this.revealBoard();
      alert("game over");
    }

    let updatedData = this.props.boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

    if (this.getHidden(updatedData).length === this.props.mines) {
      win = true;
      this.revealBoard();
      alert("You Win");
    }
    const {dispatch} = this.props;
    const action = {
      type: 'CELL_CLICK',
      boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
      gameWon: false,
      mineCount: this.props.mines,
    }
    dispatch(action);
    // this.setState({
    //   boardData: updatedData,
    //   mineCount: this.props.mines - this.getFlags(updatedData).length,
    //   gameWon: win,
    // });
  }

  _handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = this.props.boardData;
    let mines = this.props.mineCount;
    let win = false;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = this.getMines(updatedData);
      const FlagArray = this.getFlags(updatedData);
      win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
      if (win) {
        this.revealBoard();
        alert("You Win");
      }
    }
    const {dispatch} = this.props;
    const action = {
      type: 'CELL_CLICK',
      boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
      gameWon: false,
      mineCount: mines,
    }
    console.log(action)
    dispatch(action);

    // this.setState({
    //   boardData: updatedData,
    //   mineCount: mines,
    //   gameWon: win,
    // });
  }

  renderBoard(data) {
    return data.map((dataRow) => {
      return dataRow.map((dataItem) => {
        return (
          <div key={dataItem.x * dataRow.length + dataItem.y}>
            <Cell
              onClick={() => this.handleCellClick(dataItem.x, dataItem.y)}
              cMenu={(e) => this._handleContextMenu(e, dataItem.x, dataItem.y)}
              value={dataItem}
              />
            {(dataRow[dataRow.length - 1] === dataItem) ? <div className="clear" /> : ""}
          </div>
        );
      })
    });
  }

  // Component methods
  // componentWillReceiveProps(nextProps) {
  //   if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
  //     this.setState({
  //       boardData: this.initBoardData(nextProps.height, nextProps.width, nextProps.mines),
  //       gameWon: false,
  //       mineCount: nextProps.mines,
  //     });
  //   }
  // }

  render() {
    console.log("props ", this.props);
    return (
      <div className="board">
        <div className="game-info">
          <span className="info">mines: {this.props.mineCount}</span><br />
          <span className="info">{this.props.gameWon ? "You Win" : ""}</span>
        </div>
        {
          this.renderBoard(this.props.boardData)
        }
      </div>
    );
  }
}

Board.propTypes = {
  //boardData: PropTypes.array,
  gameWon: PropTypes.bool,
  mineCount: PropTypes.number
};

const mapStateToProps = state => {
  return {
    //boardData: state.boardData,
    gameWon: state.gameWon,
    mineCount: state.mineCount
  }
}

Board = connect(mapStateToProps)(Board);

export default Board;