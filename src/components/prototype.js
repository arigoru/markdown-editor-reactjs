const defaultText = `#header
    ##subheader
    https://somelink.com
    \`inline code\`
    \`\`\`
    codeblock
    \`\`\`
    - list item 1
    - list item 2
    blockquote here
    image here
    bolded text`;

function parsingExample() {
  document.getElementById("content").innerHTML = marked(
    "# Marked in the browser\n\nRendered by **marked**."
  );
}

function documentReady() {
  $(".window").mousedown(handleWindowMouseDown);
}
function handleWindowMouseDown(event) {
  resetWindowsZIndex($(this));
  $(this).css("z-index", 2);
}
function resetWindowsZIndex(excludeWindow) {
  $(".window")
    .not(excludeWindow)
    .css("z-index", 1);
}

$(documentReady);

attachWindowControls(document.getElementById("preview-window"));
attachWindowControls(document.getElementById("editor-window"));

function attachWindowControls(targetWindow) {
  // dragging based on https://www.w3schools.com/howto/howto_js_draggable.asp
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  document.getElementById(targetWindow.id + "-top").onmousedown = dragMouseDown;

  function dragMouseDown(event) {
    event = event || window.event;
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    // set the element's new position:
    targetWindow.style.top = targetWindow.offsetTop - pos2 + "px";
    targetWindow.style.left = targetWindow.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
