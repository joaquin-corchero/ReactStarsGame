import React from 'react';

const StarsFrame = (props) => {
  let stars = [];
  for(let i= 0; i < props.numberOfStars; i ++) {
    stars.push(
      <span className="glyphicon glyphicon-star" key={i}></span>
    );
  }

  return(
    <div id="stars-frame">
      <div className="well">
        {stars}
      </div>
    </div>
  );
};

export default StarsFrame;
