import React, {Component, Fragment} from 'react';
import Board from './component/Board'
import style from './styles/app.scss'

export default class app extends Component {
  state = {
    height: 8,
    width: 8,
    mines: 10
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className={style.game}>
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}

