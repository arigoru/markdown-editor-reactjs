import React, { Component } from "react";
import "./App.css";
import "./components/workspace";
// import marked from "marked";
// import $ from "jquery";
import Workspace from "./components/workspace";

class App extends Component {
  state = {
    workspaces: [{ id: 0 }],
    style: { width: "100vw", transform: `translateX(-0vw)` }
  };
  swapToWorkspace = id => {
    let newStyle = { ...this.state.style };
    newStyle.transform = `translateX(-${id * 100}vw)`;
    this.setState({
      style: newStyle
    });
  };
  addNewWorkspace = () => {
    this.setState({
      workspaces: [
        ...this.state.workspaces,
        { id: this.state.workspaces.length }
      ],
      style: {
        width: (100 * (this.state.workspaces.length + 1))
          .toString()
          .concat("vw"),
        transform: `translateX(-${this.state.workspaces.length * 100}vw)`
      }
    });
  };

  render() {
    return (
      <div style={this.state.style} className="App">
        {this.state.workspaces.map(e => (
          <Workspace
            swapWorkspace={this.swapToWorkspace}
            workspaces={this.state.workspaces}
            addNew={this.addNewWorkspace}
            key={e.id}
          />
        ))}
        {/* <Menu style={this.state.style} /> */}
      </div>
    );
  }
}

export default App;
