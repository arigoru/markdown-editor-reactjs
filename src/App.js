import React, { Component } from "react";
import "./App.css";
import "./components/workspace";
// import marked from "marked";
// import $ from "jquery";
import Workspace from "./components/workspace";
import Menu from "./components/menu";

class App extends Component {
  state = {
    workspaces: [{ id: 0 }],
    style: { width: "100vw" }
  };
  render() {
    return (
      <div style={this.state.style} className="App">
        {this.state.workspaces.map(e => (
          <Workspace />
        ))}
        <Menu style={this.state.style} />
      </div>
    );
  }
}

export default App;
