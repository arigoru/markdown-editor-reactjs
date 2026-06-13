import React, { Component } from "react";
import marked from "marked";
import hljs from "highlight.js";

class Viewer extends Component {
  createMarkup(markupText) {
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) =>
      `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
    marked.setOptions({
      renderer: renderer,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });

    return { __html: marked(markupText) };
  }

  render() {
    return (
      <div
        id="preview"
        className="window-content"
        dangerouslySetInnerHTML={this.createMarkup(this.props.value)}
        onMouseDown={this.props.onMouseDown}
      />
    );
  }
}

export default Viewer;
