import React, { Component } from "react";
import Stats from "../stats";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      side: "top",
      position: 50,
    };
  }

  componentDidMount = () => {
    // const sides = ["left", "right", "top", "bottom"];
    // const side = Math.floor(Math.random() * 4);
    // this.setState({
    //   side: sides[side],
    // });
    // this.setState({ position: Math.floor(Math.random() * 100) });

    this.displayObj();
  };

  displayObj = () => {
    for (let i = 0; i <= 300; i++) {
      if (this.state.side === "top") {
        document.getElementById("redObj").style.top = `${0}px`;

        this.timeout();
      }
      i++;
    }
  };

  timeout = () => {
    // setTimeout(function () /{
    let l = document.getElementById("redObj").style.top;
    console.log(l);
    //   document.getElementById("redObj").style.bottom = `${defaultVal}px`;
    //   document.getElementById("redObj").style.left = `${this.state.position}px`;
    document.getElementById("redObj").style.top = `${l + 52}px`;
    //   defaultVal = defaultVal + 1;
    // document.getElementById("redObj").style.left = `${
    //   this.state.position + 1
    // }px`;
    // }, 100);
  };

  render() {
    return (
      <div>
        <h2>Dodge Game</h2>
        <Stats />
        <div className="game">
          <div id="redObj" className="redObj"></div>
          <div className="obj"></div>
        </div>
      </div>
    );
  }
}

export default Game;
