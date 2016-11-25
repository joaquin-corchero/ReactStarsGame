import React, { Component } from 'react';
import './game.css';
import StarsFrame from './frames/starsFrame';
import ButtonFrame from './frames/buttonFrame';
import AnswerFrame from './frames/answerFrame';
import NumbersFrame from './frames/numbersFrame';
import DoneFrame from './frames/doneFrame';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfStars : this.randomNumber(),
      selectedNumbers: [],
      correct: null,
      usedNumbers: [],
      redraws: 5,
      doneStatus: null
    };
    // This binding is necessary to make `this` work in the callback
    this.selectNumber = this.selectNumber.bind(this);
    this.unSelectNumber = this.unSelectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.resetGame = this.resetGame.bind(this);
  };

  resetGame() {
    this.setState({
      numberOfStars : this.randomNumber(),
      selectedNumbers: [],
      correct: null,
      usedNumbers: [],
      redraws: 5,
      doneStatus: null
    });
  };

  randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
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
      numberOfStars : this.randomNumber()
    }, () => {
      this.updateDoneStatus()
    });
  };

  redraw(){
    if(this.state.redraws > 0) {
      this.setState({
        selectedNumbers : [],
        correct: null,
        numberOfStars : this.randomNumber(),
        redraws: this.state.redraws -1
      }, () => {
        this.updateDoneStatus()
      });
    }
  };

  updateDoneStatus(){
    if(this.state.usedNumbers.length === 9) {
      console.log('Done');
      this.setState({doneStatus: "Done, Nice!!!"});
      return;
    }

    if(this.state.redraws === 0 && !this.possibleSolutions()){
      console.log('game over');
      this.setState({doneStatus: "Game Over!!!"});
      return;
    }
  };

  possibleSolutions() {
    let numberOfStars = this.state.numberOfStars,
      possibleNumbers = [],
      usedNumbers = this.state.usedNumbers;

    for(let i =1; i <= 9; i++){
      if(usedNumbers.indexOf(i) < 0){
        possibleNumbers.push(i);
      }
    }

    return this.possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

  render() {
    let selectedNumbers = this.state.selectedNumbers;
    let numberOfStars = this.state.numberOfStars;
    let usedNumbers = this.state.usedNumbers;
    let bottomFrame;
    if(this.state.doneStatus){
      bottomFrame = (
        <DoneFrame doneStatus={this.state.doneStatus}
          resetGame={this.resetGame}/>
      );
    }else {
      bottomFrame = (
        <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
      );
    }
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

        {bottomFrame}
      </div>
    );
  }
};

export default Game;
