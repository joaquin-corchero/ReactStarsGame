import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfStars : Math.floor(Math.random() * 9) + 1,
      selectedNumbers: [],
      correct: null,
      usedNumbers: [],
      redraws: 5
    };
    // This binding is necessary to make `this` work in the callback
    this.selectNumber = this.selectNumber.bind(this);
    this.unSelectNumber = this.unSelectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
  };

  selectNumber(numberClicked) {
    if(this.state.selectedNumbers.indexOf(numberClicked) < 0) {
      this.setState({
        selectedNumbers:  this.state.selectedNumbers.concat(numberClicked),
        correct: null
      });
    }
  };

  unSelectNumber(numberClicked) {
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = this.state.selectedNumbers.indexOf(numberClicked);
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({
        selectedNumbers:  selectedNumbers,
        correct: null
      });
  };

  checkAnswer() {
    let correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({correct : correct});
  };

  sumOfSelectedNumbers() {
    return this.state.selectedNumbers.reduce((p,n) => {
        return p + n;
    }, 0);
  };

  acceptAnswer() {
    let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers : [],
      usedNumbers : usedNumbers,
      correct: null,
      numberOfStars : Math.floor(Math.random() * 9) + 1,
    });
  };

  redraw(){
    if(this.state.redraws > 0) {
      this.setState({
        selectedNumbers : [],
        correct: null,
        numberOfStars : Math.floor(Math.random() * 9) + 1,
        redraws: this.state.redraws -1
      });
    }
  };

  render() {
    let selectedNumbers = this.state.selectedNumbers;
    let numberOfStars = this.state.numberOfStars;
    let usedNumbers = this.state.usedNumbers;
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNumbers={selectedNumbers}
            correct={this.state.correct}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={this.state.redraws}
            />
          <AnswerFrame selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
        </div>
        <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
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
        <button className="btn btn-success btn-lg"
          onClick={this.props.acceptAnswer}>
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
        <br/><br/>
        <button className="btn btn-warning btn-xs"
          onClick={this.props.redraw}
          disabled={this.props.redraws === 0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {this.props.redraws}
        </button>
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
}

export default Game;
