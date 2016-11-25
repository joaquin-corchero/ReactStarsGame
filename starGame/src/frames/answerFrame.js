import React, { Component } from 'react';

class AnswerFrame extends Component{
  render(){
    let selectedNumbers = this.props.selectedNumbers.map((i) => {
      return(
          <span key={i} className="number" onClick={this.props.unSelectNumber.bind(null, i)}>
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
  }
};

export default AnswerFrame;
