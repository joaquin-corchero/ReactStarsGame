import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      numberOfStars : Math.floor(Math.random() * 9) + 1,
      selectedNumbers: [],
      correct: null
    }
    // This binding is necessary to make `this` work in the callback
    this.selectNumber = this.selectNumber.bind(this);
    this.unSelectNumber = this.unSelectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  };

  selectNumber(numberClicked){
    if(this.state.selectedNumbers.indexOf(numberClicked) < 0){
      this.setState(prevState => ({
        selectedNumbers:  prevState.selectedNumbers.concat(numberClicked),
        correct: null
      }));
    }
  };

  unSelectNumber(numberClicked){
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = this.state.selectedNumbers.indexOf(numberClicked);
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({
        selectedNumbers:  selectedNumbers,
        correct: null
      });
  };

  sumOfSelectedNumbers(){
    return this.state.selectedNumbers.reduce((p,n) => {
        return p + n;
    }, 0);
  }

  checkAnswer(){
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({correct : correct});
  }

  render() {
    let selectedNumbers = this.state.selectedNumbers;
    let numberOfStars = this.state.numberOfStars;
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNumbers={selectedNumbers}
            correct={this.state.correct}
            checkAnswer={this.checkAnswer}
            />
          <AnswerFrame selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
        </div>
        <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
      </div>
    );
  }
}

class StarsFrame extends Component{
  render(){
    let stars = [];
    for(let i= 0; i < this.props.numberOfStars; i ++)
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
    let button;
    let correct = this.props.correct;
    switch (correct) {
      case true:
      button = (
        <button className="btn btn-success btn-lg">
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
        let disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg"
             disabled={disabled}
             onClick={this.props.checkAnswer}>
            =
          </button>
        );
    }
    return(
      <div id="button-frame">
        {button}
      </div>
    )
  }
}

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
}

class NumbersFrame extends Component{
  render(){
    let numbers = [];
    let selectedNumbers = this.props.selectedNumbers;
    let selectNumber = this.props.selectNumber;
    for(let i = 1; i <= 9; i++)
    {
      let className= "number selected-" + (selectedNumbers.indexOf(i) >= 0)
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
}

export default Game;
