import { connect } from 'react-redux';

function mapProps (state) {
  return {
    data: state.data,
    board: state.board
  };
}

export default connect(mapProps); 
