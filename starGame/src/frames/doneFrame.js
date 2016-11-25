import React from 'react';

const DoneFrame = (props) => {
  return(
    <div className="well text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-default" onClick={props.resetGame}>
        Play again
      </button>
    </div>
  );
};

export default DoneFrame;
