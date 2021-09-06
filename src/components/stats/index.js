import React, { Component } from "react";

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      score: 0,
      highScore: 0,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ time: this.state.time + 1 });
      this.setState({ score: this.state.score + 10 });
    }, 1000);
  }
  render() {
    return (
      <div className="stats-main">
        <div className="sub">
          <div>
            <h4>Time: </h4>
            <p>{this.state.time}</p>
          </div>
          <div>
            <div>
              <h4>Score: </h4>
              <p>{this.state.score}</p>
            </div>
          </div>
        </div>
        <div className="sub hscr">
          <div>
            <h4>High Score: </h4>
            <p>{this.state.highScore}</p>
          </div>
        </div>
      </div>
    );
  }
}
