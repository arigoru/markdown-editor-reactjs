import React, { Component } from "react";
import Window from "./window";
import defaultText from "./constants";

class Workspace extends Component {
  state = {
    windows: [
      { type: "editor", id: "0", isOnTop: true },
      { type: "viewer", id: "1", isOnTop: false }
    ],
    currentText: defaultText
  };

  handleTextInput = event => {
    this.setState({
      currentText: event.target.value
    });
  };

  handleWindowClick = event => {
    console.log("window was clicked");
  };
  makeWindowTop = id => {
    this.setState({
      windows: this.state.windows.map(e => {
        e.isOnTop = id === e.id ? true : false;
        return e;
      })
    });
  };

  renderWindows = () => {
    return this.state.windows.map(e => {
      return (
        <Window
          type={e.type}
          onInput={this.handleTextInput}
          key={e.id}
          id={e.id}
          value={this.state.currentText}
          onTop={e.isOnTop}
          onMouseDown={this.handleWindowClick}
          makeWindowTop={this.makeWindowTop}
        />
      );
    });
  };
  render() {
    return <div className="workspace">{this.renderWindows()}</div>;
  }
}

export default Workspace;
