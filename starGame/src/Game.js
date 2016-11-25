import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <div id="Game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame />
          <ButtonFrame/>
          <AnswerFrame/>
        </div>
        <NumbersFrame />
      </div>
    );
  }
}

class StarsFrame extends Component{
  render(){
    let numberOfStars = Math.floor(Math.random() * 9) + 1;
    let stars = [];
    for(let i= 0; i < numberOfStars; i ++)
    {
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
    )
  }
}

class ButtonFrame extends Component{
  render(){
    return(
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    )
  }
}

class AnswerFrame extends Component{
  render(){
    return(
      <div id="answer-frame">
        <div className="well">
        ...
        </div>
      </div>
    )
  }
}

class NumbersFrame extends Component{
  render(){
    let numbers = [];
    for(let i = 1; i <= 9; i++)
    {
      numbers.push(<div className="number" key={i}>{i}</div>);
    }
    return(
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    )
  }
}

export default Game;
