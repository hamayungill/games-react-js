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
    console.log("high score ==> ", this.state.highScore);
    console.log("score ==> ", this.state.score);
    if (this.state.highScore < this.state.score) {
      this.setState({
        time: 0,
        score: 0,
        highScore: this.state.score,
        redObjDisply: false,
      });
    } else {
      this.setState({
        time: 0,
        score: 0,
        redObjDisply: false,
      });
    }

    document.getElementById("greyObj").style.left = "135px";
    document.getElementById("greyObj").style.top = "150px";

    this.displayRedObj();
  }

  greyObjHandler() {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          let leftInPx = document.getElementById("greyObj").style.left;
          let left = leftInPx.replace("px", "");
          document.getElementById("greyObj").style.left =
            parseInt(left) - 2 + "px";
          break;
        case 38:
          let topInPx = document.getElementById("greyObj").style.top;
          let top = topInPx.replace("px", "");
          document.getElementById("greyObj").style.top =
            parseInt(top) - 2 + "px";
          break;
        case 39:
          let rightInPx = document.getElementById("greyObj").style.left;
          let right = rightInPx.replace("px", "");
          document.getElementById("greyObj").style.left =
            parseInt(right) + 2 + "px";
          break;
        case 40:
          let bottomInPx = document.getElementById("greyObj").style.top;
          let bottom = bottomInPx.replace("px", "");
          document.getElementById("greyObj").style.top =
            parseInt(bottom) + 2 + "px";
          break;
      }
    });
  }

  displayRedObj() {
    // set 0 to previous side
    this.setState({
      redObjDisply: true,
    });
    document.getElementById("redObj").style[this.state.side] = 0 + "px";

    // sides array
    let sides = ["top", "left", "right", "bottom"];

    // get side and position
    let side = sides[Math.floor(Math.random() * sides.length)];
    let pos = Math.floor(Math.random() * (270 - 30 + 1) + 30);
    this.setState({
      side,
    });
    // setting initiall position
    if (side === "top") {
      document.getElementById("redObj").style.top = "0px";
      document.getElementById("redObj").style.left = `${pos}px`;
    } else if (side === "bottom") {
      document.getElementById("redObj").style.bottom = "0px";
      document.getElementById("redObj").style.right = `${pos}px`;
    } else if (side === "left") {
      document.getElementById("redObj").style.left = "0px";
      document.getElementById("redObj").style.top = `${pos}px`;
    } else if (side === "right") {
      document.getElementById("redObj").style.right = "0px";
      document.getElementById("redObj").style.bottom = `${pos}px`;
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
        let valInPx = document.getElementById("redObj").style[side];
        let val = valInPx.replace("px", "");
        document.getElementById("redObj").style[side] =
          parseInt(val) + this.state.speed + "px";
        if (parseInt(val) >= 330) {
          this.setState({
            redObjDisply: false,
          });
          this.displayRedObj();
          clearInterval(interval);
        }
      }
    }, 700);
  }

  // is colling both div
  isColliding() {
    let div1 = document.getElementById("redObj").getBoundingClientRect();
    let div2 = document.getElementById("greyObj").getBoundingClientRect();

    let div1Top = div1.top;
    let div1Left = div1.left;
    let div1Bottom = div1.bottom;
    let div1Right = div1.right;

    let div2Top = div2.top;
    let div2Left = div2.left;
    let div2Bottom = div2.bottom;
    let div2Right = div2.right;

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
            <div id="redObj" className="redObj"></div>
          )}
          <div
            id="greyObj"
            className="greyObj"
            style={{ left: "135px", top: "150px" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Game;
