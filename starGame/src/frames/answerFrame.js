import React from 'react';

const AnswerFrame = (props) => {
    let selectedNumbers = props.selectedNumbers.map((i) => {
      return(
          <span key={i} className="number" onClick={props.unSelectNumber.bind(null, i)}>
            {i}
          </span>
        );
    });
    return(
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    )
};


export default AnswerFrame;
