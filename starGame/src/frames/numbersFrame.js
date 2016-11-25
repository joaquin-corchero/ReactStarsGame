import React, { Component } from 'react';

class NumbersFrame extends Component{
  render(){
    let numbers = [];
    let selectedNumbers = this.props.selectedNumbers;
    let selectNumber = this.props.selectNumber;
    let usedNumbers = this.props.usedNumbers;
    for(let i = 1; i <= 9; i++)
    {
      let className= "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (usedNumbers.indexOf(i) >=0);
      numbers.push(
        <div className={className} key={i} onClick={selectNumber.bind(null, i)}>
          {i}
        </div>
      );
    }
    return(
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    )
  }
};

export default NumbersFrame;
