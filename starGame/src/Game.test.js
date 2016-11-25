import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Game from './game';

describe('when working with the game component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
  });

  it('renders a stars frame', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find('StarsFrame').length).toEqual(1);
  });

  it('renders a button frame', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find('ButtonFrame').length).toEqual(1);
  });

  it('renders an answer frame', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find('AnswerFrame').length).toEqual(1);
  });

  it('renders a bottom frame', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find('NumbersFrame').length).toEqual(1);
  });
});
