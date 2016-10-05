import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import React from 'react';
import Gobbler from './gobbler.c.js'
import Cell from './cell.c.js';
import { Link } from 'react-router';
import { model } from './model';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {sideUp : 'FRONT'};
  }

  componentWillMount() {
    var { params } = this.props;
    var { boardId } = params;
    this.runner = model.board.createAutorun(boardId);
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    this.runner.stop();
  }

  render() {
    var { board, params, login } = this.props;
    if (!board) {
      return (<div></div>);
    }
    var header = (<div><Link to='/'>Quit</Link></div>);
    if (board.winner === login._id) {
      header = (<h2>You won!<Link to='/'>Rematch</Link></h2>);
    } else if (board.winner) {
      header = (<div><h2>You lost!</h2><div><Link to='/'>Rematch</Link></div></div>);
    }
    var game = board;
    board = board.board;
    var playerColor = game.red === login._id ? 'red' : game.green === login._id ? 'green' : null;
    // var { boardId } = params;
    // console.log(boardId);
    // let announcement;
    // if (this.state.winner) {
    //   const msg = this.state.winner > 2 ? 'It\'s a tie!' : 'Player '+this.state.winner+' wins!';
    //   announcement = (
    //     <div className="announcement">
    //       <p>{ msg }</p>
    //       <button onClick={ this.reset.bind(this) }>Reset</button>
    //     </div>
    //   );
    // }
    const grid = board.map((row, rowInd) => {
      const cells = row.map((gobblers, cellInd) => {
        const coords = `${rowInd}_${cellInd}`;
        return ( <span key={ coords } className="cellContainer">
          <Cell gobblers={ gobblers } coords={ coords } ></Cell>
          </span> 
        )
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    function flipBoard(e) {
      switch (this.state.sideUp) {
        case 'RIGHT':
          this.setState({sideUp: 'FRONT'});
        case 'FRONT':
          this.setState({sideUp: 'RIGHT'});
      }
    }

    return (
      <div className="game">
        {header}
        <div className=''>
          <div className="grid">
            { grid }
          </div>
        </div>
        <button className="rightButton"> > </button>
        <div className="unplayedGobblers" onClick={flipBoard}>
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="small" sizeNum={1} /></span>
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="medium" sizeNum={2} /></span>
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="big" sizeNum={3} /></span>
        </div>
      </div>
    );
  }
}

var connectRedux = connect(state => Object.assign({}, {
    leaderboard: state.leaderboard,
    login: state.login
}));

export default connectRedux(DragDropContext(HTML5Backend)(Board));