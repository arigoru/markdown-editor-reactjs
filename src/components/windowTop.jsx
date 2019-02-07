import React, { Component } from "react";

class WindowTop extends Component {
  state = {};
  render() {
    return <div onMouseDown={this.props.onMouseDown} className="window-top" />;
  }
}

export default WindowTop;
