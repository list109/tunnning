import React from "react";
import { Track } from "../Track/Track";
import "./TrackList.css";
import { Droppable } from "react-beautiful-dnd";

const getMessage = ({ snapshot, tracksLength }) => {
  const { isDraggingOver, draggingFromThisWith } = snapshot;

  if (
    isDraggingOver &&
    tracksLength <= 1 &&
    (draggingFromThisWith || tracksLength < 1)
  )
    return <div className="TrackList-message dragging">+</div>;

  if (tracksLength < 1)
    return (
      <div className="TrackList-message">
        <p>Drag'n'drop or add some tracks</p>
      </div>
    );
};

export function TrackList({
  tracks,
  isRemoval,
  onAdd,
  onRemove,
  onPlayButton,
  playingTrackID,
  droppableId,
  isDropDisabled = false,
}) {
  return (
    <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => (
        <div
          className={`TrackList${
            snapshot.isDraggingOver ? " draggingOver" : ""
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tracks.map((track, index) => (
            <Track
              key={track.id}
              track={track}
              isRemoval={isRemoval}
              onMovement={isRemoval ? onRemove : onAdd}
              onPlayButton={onPlayButton}
              playingTrackID={playingTrackID}
              index={index}
            />
          ))}
          {tracks.length >= 1 && provided.placeholder}
          {getMessage({ snapshot, tracksLength: tracks.length })}
        </div>
      )}
    </Droppable>
  );
}
