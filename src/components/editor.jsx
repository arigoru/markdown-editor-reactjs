import React, { Component } from "react";

class Editor extends Component {
  render() {
    return (
      <textarea
        onChange={event => this.props.onInput(event)}
        className="window-content"
        id="editor"
        value={this.props.value}
        onMouseDown={this.props.onMouseDown}
      />
    );
  }
}

export default Editor;
