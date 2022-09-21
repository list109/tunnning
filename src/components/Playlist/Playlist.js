import React from "react";
import { Icons } from "../Icons/Icons";
import "./Playlist.css";

export function Playlist({ id, name, length, onRename, isRenaming }) {
  const headerRef = React.createRef();
  const buttonRef = React.createRef();

  const onClick = () => {
    console.log("onClick");

    const { current: header } = headerRef;

    if (isRenaming) {
      header.contentEditable = false;
      return;
    }

    const isContentEditable = header.contentEditable === "true" ? false : true;

    header.contentEditable = isContentEditable;

    if (isContentEditable) {
      header.focus();
      const selection = getSelection();
      selection.removeAllRanges();
      selection.collapse(header.firstChild, header.firstChild.length);
    }
  };

  const handleBlur = ({ currentTarget: header, relatedTarget: rel }) => {
    console.log("handleBlur");

    const { current: button } = buttonRef;

    // the button has been used
    // (since a blur is fired before a click the contentEditable state doesn't change to leave  processing to the onClick event handler)
    // or
    // the key Enter has been used
    if (button.contains(rel) || header.contentEditable === "false") {
      if (name === header.textContent) return;

      onRename({ id, name: header.textContent, prevName: name });

      return;
    }

    header.contentEditable = false;
    header.textContent = name;
  };

  const handleKeyPress = ({ currentTarget: header, key }) => {
    if (key === "Enter" && header.contentEditable) {
      console.log("handleKeyPress Enter");
      header.contentEditable = false;
    }
  };

  return (
    <div className={`Playlist${isRenaming ? " renaming" : ""}`}>
      <div className="Playlist-information">
        <div className="Playlist-title">
          <button
            type="button"
            className="Playlist-button Playlist-edit"
            onClick={onClick}
            ref={buttonRef}
          >
            {isRenaming ? Icons.get("loading", 32) : Icons.get("edit", 26)}
          </button>
          <h3
            contentEditable={false}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            ref={headerRef}
          >
            {name}
          </h3>
        </div>
        <p>{length} tracks</p>
      </div>
      {/* <button type="buttom" className="Playlist-button Playlist-replace">
        +
      </button> */}
    </div>
  );
}
