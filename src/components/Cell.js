import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cell extends React.Component {
  
  getValue() {
  if (!this.props.value.isRevealed){
    return this.props.value.isFlagged ? "🚩" : null;
  }
  if (this.props.value.isMine) {
    return "💣";
  }
  if(this.props.value.neighbor === 0 ){
    return null;
  }
  return this.props.value.neighbor;
}

render(){
  console.log(this.props)
  console.log(this.state)
  let className = "cell" + (this.props.value.isRevealed ? "" : " hidden") + (this.props.value.isMine ? " is-mine" : "") + (this.props.value.isFlagged ? " is-flag" : "");

  return (
    <div ref="cell" onClick={this.props.onClick} className={className} onContextMenu={this.props.cMenu}>
      {this.getValue()}
    </div>
  );
}           
}

// const cellItemShape = { 
//   isRevealed: PropTypes.bool,
//   isMine: PropTypes.bool,
//   isFlagged: PropTypes.bool
// }
// Cell.propTypes = {
//   value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
//   onClick: PropTypes.func,
//   cMenu: PropTypes.func
// }

// Cell.propTypes = {
//   value: PropTypes.object,
  
// };

// const mapStateToProps = state => {
//   return {
//     value: state.value,
    
//   }
// }
// Cell = connect(mapStateToProps)(Cell)
export default Cell; 