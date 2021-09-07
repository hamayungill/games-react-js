import React, { Component } from "react";
import Stats from "../stats";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      score: 0,
      highScore: 0,
      side: "top",
      speed: 60,
      redObjDisply: true,
      redTop: null,
      redBottom: null,
      redLeft: null,
      redRight: null,
      greyTop: 150,
      greyBottom: null,
      greyLeft: 135,
      greyRight: null,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: this.state.time + 1,
        score: this.state.score + 10,
      });
    }, 1000);
    this.displayRedObj();
    this.greyObjHandler();
  }

  restart() {
    if (this.state.highScore < this.state.score) {
      this.setState({
        time: 0,
        score: 0,
        highScore: this.state.score,
        redObjDisply: false,
        greyLeft: 135,
        greyTop: 150,
      });
    } else {
      this.setState({
        time: 0,
        score: 0,
        redObjDisply: false,
        greyLeft: 135,
        greyTop: 150,
      });
    }

    this.displayRedObj();
  }

  greyObjHandler() {
    let parentThis = this;

    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          parentThis.setState({
            greyLeft: parentThis.state.greyLeft - 2,
          });
          break;
        case 38:
          parentThis.setState({
            greyTop: parentThis.state.greyTop - 2,
          });
          break;
        case 39:
          parentThis.setState({
            greyLeft: parentThis.state.greyLeft + 2,
          });
          break;
        case 40:
          parentThis.setState({
            greyTop: parentThis.state.greyTop + 2,
          });
          break;
      }
    });
  }

  displayRedObj() {
    // set 0 to previous side
    this.setState({
      redObjDisply: true,
    });
    if (this.state.side === "top") {
      this.setState({ redTop: 0 });
    } else if (this.state.side === "right") {
      this.setState({ redRight: 0 });
    } else if (this.state.side === "left") {
      this.setState({ redLeft: 0 });
    } else if (this.state.side === "bottom") {
      this.setState({ redBottom: 0 });
    } else {
    }

    // sides array
    let sides = ["top", "left", "right", "bottom"];

    // get side and position
    let side = sides[Math.floor(Math.random() * sides.length)];
    let pos = Math.floor(Math.random() * (270 - 30 + 1) + 30);

    // setting initiall position
    if (side === "top") {
      this.setState({
        redTop: 0,
        redLeft: pos,
      });
    } else if (side === "bottom") {
      this.setState({
        redBottom: 0,
        redRight: pos,
      });
    } else if (side === "left") {
      this.setState({
        redLeft: 0,
        redTop: pos,
      });
    } else if (side === "right") {
      this.setState({
        redRight: 0,
        redBottom: pos,
      });
    } else {
    }
    this.moveRedobj(side);
  }

  // moving red object
  moveRedobj(side) {
    // moving
    let interval = setInterval(() => {
      // check end condition

      if (this.isColliding()) {
        this.restart();
        clearInterval(interval);
      } else {
        if (side === "top") {
          this.setState({
            redTop: this.state.redTop + this.state.speed,
          });
          this.displayAnotherRed(this.state.redTop, interval);
        } else if (side === "right") {
          this.setState({
            redRight: this.state.redRight + this.state.speed,
          });
          this.displayAnotherRed(this.state.redRight, interval);
        } else if (side === "left") {
          this.setState({
            redLeft: this.state.redLeft + this.state.speed,
          });
          this.displayAnotherRed(this.state.redLeft, interval);
        } else if (side === "bottom") {
          this.setState({
            redBottom: this.state.redBottom + this.state.speed,
          });
          this.displayAnotherRed(this.state.redBottom, interval);
        } else {
        }
      }
    }, 1000);
  }

  displayAnotherRed(val, interval) {
    if (parseInt(val) >= 330) {
      this.setState({
        redObjDisply: false,
      });
      this.displayRedObj();
      clearInterval(interval);
    }
  }

  // is colling both div
  isColliding() {
    let div1 = document.getElementById("redObj").getBoundingClientRect();
    let div2 = document.getElementById("greyObj").getBoundingClientRect();
    const {
      top: div1Top,
      left: div1Left,
      bottom: div1Bottom,
      right: div1Right,
    } = div1;

    const {
      top: div2Top,
      left: div2Left,
      bottom: div2Bottom,
      right: div2Right,
    } = div2;

    let verticalMatch = false;
    let horizontalMatch = false;

    // condition which i cant understand
    if (
      (div2Top > div1Top && div2Top < div1Bottom) ||
      (div2Bottom > div1Top && div2Bottom < div1Bottom)
    ) {
      verticalMatch = true;
    } else {
      verticalMatch = false;
    }

    if (
      (div2Right > div1Left && div2Right < div1Right) ||
      (div2Left < div1Right && div2Left > div1Left)
    ) {
      horizontalMatch = true;
    } else {
      horizontalMatch = false;
    }

    let collides = false;

    if (horizontalMatch && verticalMatch) {
      collides = true;
    } else {
      collides = false;
    }

    return collides;
  }

  render() {
    const { redBottom, redLeft, redRight, redTop, greyLeft, greyTop } =
      this.state;
    return (
      <div>
        <h2>Dodge Game</h2>
        <Stats
          time={this.state.time}
          score={this.state.score}
          highScore={this.state.highScore}
        />

        <div className="game">
          {this.state.redObjDisply && (
            <div
              id="redObj"
              className="redObj"
              style={{
                bottom: redBottom + "px",
                top: redTop + "px",
                left: redLeft + "px",
                right: redRight + "px",
              }}
            ></div>
          )}
          <div
            id="greyObj"
            className="greyObj"
            style={{ left: greyLeft + "px", top: greyTop + "px" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Game;
