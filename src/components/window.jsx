import React, { Component } from "react";
import WindowTop from "./windowTop";
import WindowResizer from "./windowResizer";
import Editor from "./editor";
import Viewer from "./viewer";

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        left: this.props.initialParameters.left,
        top: this.props.initialParameters.top
      },
      size: {
        width: this.props.initialParameters.width,
        height: this.props.initialParameters.height
      },
      isDragged: false,
      isResized: false,
      rel: null,
      maximized: false,
      preMax: {
        position: { left: 0, top: 0 },
        size: { width: 500, height: 500 }
      }
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
    } else if (this.state.isResized && !state.isResized) {
      document.addEventListener("mousemove", this.onResizeMouseDrag);
      document.addEventListener("mouseup", this.onResizeMouseUp);
    } else if (!this.state.isResized && state.isResized) {
      document.removeEventListener("mousemove", this.onResizeMouseDrag);
      document.removeEventListener("mouseup", this.onResizeMouseUp);
    }
  }

  maximize() {
    console.log(this.props.limits);
    this.setState({
      preMax: {
        position: {
          left: this.state.position.left,
          top: this.state.position.top
        },
        size: { width: this.state.size.width, height: this.state.size.height }
      },
      position: { left: 0, top: 0 },
      size: {
        width: "100%",
        height: `calc(100% - ${this.props.limits.height}px)`
      }
    });
  }
  minimize() {
    this.setState({
      position: this.state.preMax.position,
      size: this.state.preMax.size
    });
  }

  onMaximize = event => {
    if (this.state.maximized) {
      this.minimize();
    } else {
      this.maximize();
    }

    this.setState({
      maximized: !this.state.maximized
    });
  };

  onResizeMouseDown = event => {
    if (this.state.maximized) return;
    this.props.makeWindowTop(this.props.id);
    if (event.button !== 0) return;
    this.setState({
      isResized: true,
      rel: {
        x: event.pageX,
        y: event.pageY,
        width: this.state.size.width,
        height: this.state.size.height
      }
    });
    event.stopPropagation();
    event.preventDefault();
  };
  onResizeMouseUp = event => {
    this.setState({ isResized: false });
    event.stopPropagation();
    event.preventDefault();
  };
  onResizeMouseDrag = event => {
    if (!this.state.isResized) return;
    this.setState({
      size: {
        width: event.pageX - this.state.rel.x + this.state.rel.width,
        height: event.pageY - this.state.rel.y + this.state.rel.height
      }
    });
  };

  onTopMouseDown = event => {
    this.props.makeWindowTop(this.props.id);
    if (event.button !== 0) return;
    if (this.state.maximized) return;
    if (event.currentTarget !== event.target) return;
    var pos = { left: this.state.position.left, top: this.state.position.top };
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
      position: {
        left: event.pageX - this.state.rel.x,
        top: event.pageY - this.state.rel.y
      }
    });
    event.stopPropagation();
    event.preventDefault();
  };
  getStyle = () => {
    let style = { ...this.state.position, ...this.state.size };
    return style;
  };
  render() {
    return (
      <div
        style={
          this.props.trayed
            ? { ...this.getStyle(), ...{ display: "none" } }
            : this.getStyle()
        }
        className={getWindowClasses(this.props.type, this.props.onTop)}
      >
        <WindowTop onMax={this.onMaximize} onMouseDown={this.onTopMouseDown} />
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
        <WindowResizer onMouseDown={this.onResizeMouseDown} />
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
