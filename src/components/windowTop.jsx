import React, { Component } from "react";

class WindowTop extends Component {
  state = {};
  render() {
    return (
      <div
        onDoubleClick={this.props.onMax}
        onMouseDown={this.props.onMouseDown}
        className="window-top"
      >
        <button onClick={this.props.onMax} className="btn btn-default" />
      </div>
    );
  }
}

export default WindowTop;
