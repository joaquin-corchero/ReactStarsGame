import React from 'react';

const ButtonFrame = (props) => {
    let button;
    let correct = props.correct;
    switch (correct) {
      case true:
      button = (
        <button className="btn btn-success btn-lg"
          onClick={props.acceptAnswer}>
          <span className="glyphicon glyphicon-ok"></span>
        </button>
      );
      break;
      case false:
      button = (
        <button className="btn btn-danger btn-lg">
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      );
      break;
    default:
      let disabled = (props.selectedNumbers.length === 0);
      button = (
        <button className="btn btn-primary btn-lg"
           disabled={disabled}
           onClick={props.checkAnswer}>
          =
        </button>
      );
  };

  return(
    <div id="button-frame">
      {button}
      <br/><br/>
      <button className="btn btn-warning btn-xs"
        onClick={props.redraw}
        disabled={props.redraws === 0}>
        <span className="glyphicon glyphicon-refresh"></span>
        &nbsp;
        {props.redraws}
      </button>
    </div>
  );
};

export default ButtonFrame;
