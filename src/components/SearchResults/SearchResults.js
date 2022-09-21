import React from "react";
import { TrackList } from "../TrackList/TrackList";
import { Icons } from "../Icons/Icons.js";
import "./SearchResults.css";

export class SearchResults extends React.Component {
  containerRef = React.createRef();
  render() {
    const { results, onAdd, onPlayButton, playingTrackID, isSearching } =
      this.props;
    const icon = <i className="SearchResults-icon">{Icons.get("loading")}</i>;
    const trackList = (
      <TrackList
        tracks={results}
        isRemoval={false}
        onAdd={onAdd}
        onPlayButton={onPlayButton}
        playingTrackID={playingTrackID}
        droppableId="searchResults"
      />
    );

    return (
      <div className="SearchResults" ref={this.containerRef}>
        <h2 className="SearchResults-header">Results</h2>
        {isSearching ? icon : trackList}
      </div>
    );
  }

  componentDidUpdate() {
    const { isSearching } = this.props;
    const { current: container } = this.containerRef;
    if (isSearching) {
      setTimeout(() => container.classList.add("loading"));
    } else {
      container.classList.remove("loading");
    }
  }
}
