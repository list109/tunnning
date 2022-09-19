import React from "react";
import { Icons } from "../Icons/Icons";
import "./Track.css";
import { Draggable } from "react-beautiful-dnd";

export function Track({
  track,
  isRemoval,
  onMovement,
  onPlayButton,
  playingTrackID = null,
  index,
}) {
  const { name, artists, album, id } = track;
  const isRepeated = playingTrackID === id;
  const handleMoveTrack = () => onMovement(track);
  const handlePlayButton = () => onPlayButton(track, isRepeated);
  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`Track ${snapshot.isDragging ? "draggable" : ""} `}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="Track-information">
            <h3 className="Track-information-title">{name}</h3>
            <p className="Track-information-artist">
              {artists[0]?.name} | {album?.name}
            </p>
          </div>
          <button
            type="button"
            className="Track-button Track-play"
            onClick={handlePlayButton}
          >
            {isRepeated ? Icons.get("pause") : Icons.get("play")}
          </button>
          <button
            type="button"
            className="Track-button Track-action"
            onClick={handleMoveTrack}
          >
            {isRemoval ? "-" : "+"}
          </button>
          <button
            type="button"
            className="Track-button Track-handle"
            {...provided.dragHandleProps}
          >
            {Icons.get("handle", 20)}
          </button>
        </div>
      )}
    </Draggable>
  );
}
