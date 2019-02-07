import React, { Component } from "react";
import WindowTop from "./windowTop";
import WindowResizer from "./windowResizer";
import Editor from "./editor";
import Viewer from "./viewer";
import $ from "jquery";

class Window extends Component {
  constructor(props) {
    super();
    this.state = {
      style: { left: 0, top: 0 },
      isDragged: false,
      rel: null
    };
  }

  // based on https://stackoverflow.com/a/20927899
  componentDidUpdate(props, state) {
    if (this.state.isDragged && !state.isDragged) {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    } else if (!this.state.isDragged && state.isDragged) {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseDown = event => {
    this.props.makeWindowTop(this.props.id);
    if (event.button !== 0) return;
    var pos = { left: this.state.style.left, top: this.state.style.top };
    this.setState({
      isDragged: true,
      rel: {
        x: event.pageX - pos.left,
        y: event.pageY - pos.top
      }
    });
    event.stopPropagation();
    event.preventDefault();
  };

  onMouseUp = event => {
    this.setState({ isDragged: false });
    event.stopPropagation();
    event.preventDefault();
  };

  onMouseMove = event => {
    if (!this.state.isDragged) return;
    this.setState({
      style: {
        left: event.pageX - this.state.rel.x,
        top: event.pageY - this.state.rel.y
      }
    });
    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    return (
      <div
        style={this.state.style}
        className={getWindowClasses(this.props.type, this.props.onTop)}
      >
        <WindowTop onMouseDown={this.onMouseDown} />
        {this.props.type === "editor" ? (
          <Editor
            onMouseDown={() => this.props.makeWindowTop(this.props.id)}
            value={this.props.value}
            onInput={this.props.onInput}
          />
        ) : (
          <Viewer
            onMouseDown={() => this.props.makeWindowTop(this.props.id)}
            value={this.props.value}
          />
        )}
        <WindowResizer />
      </div>
    );
  }
}

const getWindowClasses = (type, onTop) => {
  let classes = type === "editor" ? "editor window" : "viewer window";
  if (onTop) classes += " ontop";
  return classes;
};

export default Window;
