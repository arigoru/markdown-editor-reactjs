import React, { Component } from "react";

class WindowResizer extends Component {
  state = {};
  render() {
    return (
      <div onMouseDown={this.props.onMouseDown} className="window-resizer" />
    );
  }
}

export default WindowResizer;
