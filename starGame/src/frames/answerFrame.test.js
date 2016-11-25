import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AnswerFrame from './answerFrame';

describe('when working with the answer frame', () => {

  let wrapper, selectedNumbers;
  function unSelectNumber() {};

  beforeEach(() => {
    selectedNumbers  = [1,2];
    wrapper = shallow(<AnswerFrame selectedNumbers={selectedNumbers} unSelectNumber={unSelectNumber}/>);
  });

  it('renders as many spans as numbers', () => {
    expect(wrapper.find('span').length).toEqual(selectedNumbers.length);
  });

  it('displays the names numbers', () => {
    expect(wrapper.find('span').at(0).text()).toEqual('1');
    expect(wrapper.find('span').at(1).text()).toEqual('2');
  });

});
