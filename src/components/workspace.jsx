import React, { Component } from "react";
import Window from "./window";
import defaultText from "./constants";
import Menu from "./menu";

class Workspace extends Component {
  state = {
    windows: [
      {
        type: "editor",
        id: "0",
        isOnTop: true,
        title: "Editor",
        trayed: false
      },
      {
        type: "viewer",
        id: "1",
        isOnTop: false,
        title: "Viewer",
        trayed: false
      }
    ],
    menu: {
      style: { height: 40 }
    },
    currentText: defaultText
  };

  handleTextInput = event => {
    this.setState({
      currentText: event.target.value
    });
  };

  makeWindowTop = id => {
    this.setState({
      windows: this.state.windows.map(e => {
        e.isOnTop = id === e.id ? true : false;
        return e;
      })
    });
  };

  toggleTrayWindow = id => {
    this.makeWindowTop(id);
    let newWindows = [...this.state.windows];
    newWindows[id].trayed = !newWindows[id].trayed;
    this.setState({
      windows: newWindows
    });
  };

  renderWindows = () => {
    return (
      this.state.windows
        // .filter(e => !e.trayed)
        .map(e => {
          return (
            <Window
              limits={this.state.menu.style}
              type={e.type}
              onInput={this.handleTextInput}
              key={e.id}
              id={e.id}
              value={this.state.currentText}
              onTop={e.isOnTop}
              makeWindowTop={this.makeWindowTop}
              trayed={e.trayed}
              initialParameters={{
                left: (e.id * document.documentElement.clientWidth) / 2 + 5,
                top: 25,
                width: document.documentElement.clientWidth / 2 - 20,
                height: document.documentElement.clientHeight - 100
              }}
            />
          );
        })
    );
  };
  render() {
    return (
      <div className="workspace">
        {this.renderWindows()}
        <Menu
          trayToggle={this.toggleTrayWindow}
          windows={this.state.windows}
          style={this.state.menu.style}
          addNew={this.props.addNew}
          swapWorkspace={this.props.swapWorkspace}
          workspaces={this.props.workspaces}
        />
      </div>
    );
  }
}

export default Workspace;
