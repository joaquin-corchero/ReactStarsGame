import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

describe('wghen working with the game component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
  });

  it('renders without crashing 2', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);

    console.log(div);
  });
});
