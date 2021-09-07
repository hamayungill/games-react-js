import React, { Component } from "react";

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { time, score, highScore } = this.props;
    return (
      <div className="stats-main">
        <div className="sub">
          <div>
            <h4>Time: </h4>
            <p>{time}</p>
          </div>
          <div>
            <div>
              <h4>Score: </h4>
              <p>{score}</p>
            </div>
          </div>
        </div>
        <div className="sub hscr">
          <div>
            <h4>High Score: </h4>
            <p>{highScore}</p>
          </div>
        </div>
      </div>
    );
  }
}
