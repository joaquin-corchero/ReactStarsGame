import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      numberOfStars : Math.floor(Math.random() * 9) + 1,
      selectedNumbers: []
    }
    // This binding is necessary to make `this` work in the callback
    this.selectNumber = this.selectNumber.bind(this);
    this.unSelectNumber = this.unSelectNumber.bind(this);
  };

  selectNumber(numberClicked){
    if(this.state.selectedNumbers.indexOf(numberClicked) >= 0){
      return;
    }

    this.setState(prevState => ({
      selectedNumbers:  prevState.selectedNumbers.concat(numberClicked)
    }));
  };

  unSelectNumber(numberClicked){
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = this.state.selectedNumbers.indexOf(numberClicked);
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({ selectedNumbers:  selectedNumbers });
  };

  render() {
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={this.state.numberOfStars} />
          <ButtonFrame/>
          <AnswerFrame selectedNumbers={this.state.selectedNumbers} unSelectNumber={this.unSelectNumber}/>
        </div>
        <NumbersFrame selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} />
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
    return(
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
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
