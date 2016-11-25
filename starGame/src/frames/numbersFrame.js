import React from 'react';

const NumbersFrame = (props) => {
  let numbers = [];
  let selectedNumbers = props.selectedNumbers;
  let selectNumber = props.selectNumber;
  let usedNumbers = props.usedNumbers;
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
  );
};

export default NumbersFrame;
