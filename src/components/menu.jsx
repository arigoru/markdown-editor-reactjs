import React, { Component } from "react";

class Menu extends Component {
  state = {};

  renderWindowsButtons(windows) {
    return windows.map(e => (
      <button
        key={e.id}
        onClick={() => this.props.trayToggle(e.id)}
        className="btn btn-default button-menu-window"
      >
        {e.title}
      </button>
    ));
  }
  renderWorkspacesButtons(workspaces) {
    return workspaces.map(e => (
      <button
        key={e.id}
        onClick={() => this.props.swapWorkspace(e.id)}
        className="btn btn-default button-menu"
      >
        Workspace {e.id}
      </button>
    ));
  }

  render() {
    return (
      <nav style={this.props.style} className="workspace-menu">
        {this.renderWindowsButtons(this.props.windows)}
        {this.renderWorkspacesButtons(this.props.workspaces)}
        <button
          onClick={this.props.addNew}
          className="btn btn-default button-menu"
        >
          Add New Workspace
        </button>
        {/* <button className="btn btn-default button-menu">Options</button> */}
      </nav>
    );
  }
}

export default Menu;
