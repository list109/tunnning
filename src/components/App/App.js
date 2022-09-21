import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Player } from "../Player/Player";
import { Playlists } from "../Playlists/Playlists";
import { Spotify } from "../../utils/Spotify";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

export class App extends React.Component {
  playlistName = "New Playlist";

  state = {
    searchTerm: "",
    searchResults: [],
    isSearching: false,

    playlistName: this.playlistName,
    playlistTracks: [],
    isSaving: false,

    userPlaylists: [],
    isLoading: false,

    //have to keep these player's state values on the top element to sync with other components
    playingTrack: "",
    paused: true,
  };

  handleTermChange = (value) => this.setState({ searchTerm: value });

  getEnterDownHandler = (callback) => {
    return (keyValue) => keyValue === "Enter" && callback();
  };

  search = () => {
    this.setState({ isSearching: true });

    Spotify.searchTrack(this.state.searchTerm)
      .then((tracks) => {
        this.setState({
          searchResults: [...tracks],
        });
      })
      .catch((err) => console.log("Spotify error", err.message))
      .finally(() => this.setState({ isSearching: false }));
  };

  addTrack = (track) => {
    const { playlistTracks, searchResults } = this.state;

    this.setState({
      searchResults: searchResults.filter(({ id }) => track.id !== id),
      playlistTracks: [...playlistTracks, track],
    });
  };

  removeTrack = (track) => {
    const { searchResults, playlistTracks } = this.state;

    this.setState({
      searchResults: [...searchResults, track],
      playlistTracks: playlistTracks.filter(({ id }) => id !== track.id),
    });
  };

  updatePlaylistName = (value) => this.setState({ playlistName: value });

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(
      ({ preview_url }) => preview_url
    );
    const { playlistName: name } = this.state;

    const isVerified = name && trackURIs.length > 0;
    if (isVerified === false) {
      console.log("need a playlist's name or at least one track");
      return;
    }

    this.setState({ isSaving: true });

    Spotify.savePlaylist({ name, trackURIs })
      .then((savedPlaylist) => {
        console.log("the playlist has been saved successfully");
        this.setState({
          playlistName: this.playlistName,
          playlistTracks: [],
          userPlaylists: [],
        });
      })
      .catch((err) => console.log("Spotify error", err.message))
      .finally(() => this.setState({ isSaving: false }));
  };

  undoPlaylist = () => {
    const { searchResults, playlistTracks } = this.state;

    this.setState({
      playlistName: this.playlistName,
      searchResults: [...searchResults, ...playlistTracks],
      playlistTracks: [],
    });
  };

  loadUserPlaylists = () => {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true, userPlaylists: [] });

    Spotify.getPlaylists()
      .then((playlists) => {
        this.setState({
          userPlaylists: playlists.length
            ? [...playlists]
            : ["You hasn't created any playlist on your account yet"],
        });
      })
      .catch((err) => {
        console.log("Spotify error", err.message);
        this.setState({ userPlaylists: ["Error has occured"] });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  renameUserPlaylist = ({ id, name, prevName = "Untitled" }) => {
    const isVerified = id && name;
    if (isVerified === false)
      console.log(
        "id and name are the arguments both required to rename a playlist"
      );

    const userPlaylists = [...this.state.userPlaylists];
    const targetPlaylist = userPlaylists.find((playlist) => playlist.id === id);

    if (targetPlaylist.isRenaming) return;

    targetPlaylist.isRenaming = true;

    this.setState({ userPlaylists: [...userPlaylists] });

    let successfulRequest = false;

    Spotify.renamePlaylist({ id, name, prevName })
      .then(() => {
        console.log("Playlist has been renamed");

        successfulRequest = true;
      })
      .catch((err) => {
        console.log("Spotify error", err.message);
      })
      .finally(() => {
        const userPlaylists = [...this.state.userPlaylists];
        const targetPlaylist = userPlaylists.find(
          (playlist) => playlist.id === id
        );

        //true indicates the playlist has been deleted during processing the request
        if (Boolean(targetPlaylist) === false) return;

        if (successfulRequest && targetPlaylist.isRenaming) {
          targetPlaylist.name = name;
        }

        targetPlaylist.isRenaming = false;

        this.setState({ userPlaylists: [...userPlaylists] });
      });
  };

  trackPlayButton = (track, isRepeated) => {
    const pauseUpdate = { paused: !this.state.paused };
    const playingTrackUpdate = {
      playingTrack: Object.assign({}, track),
      paused: false,
    };
    const state = isRepeated ? pauseUpdate : playingTrackUpdate;
    this.setState(state);
  };

  playerPlayButton = () => this.setState({ paused: !this.state.paused });

  playerNextButton = () => {
    const { searchResults, playlistTracks, playingTrack } = this.state;
    const lists = { searchResults, playlistTracks };
    const listNames = Object.keys(lists);

    let index;

    for (const name of listNames) {
      index = lists[name].findIndex(({ id }) => id === playingTrack.id);

      if (index === -1) continue;

      let nextTrack = lists[name][index + 1];

      if (nextTrack) {
        this.setState({ playingTrack: nextTrack });
        return;
      }

      nextTrack =
        name === "searchResults"
          ? playlistTracks[0] || searchResults[0]
          : searchResults[0] || playlistTracks[0];

      this.setState({ playingTrack: nextTrack });
      return;
    }

    // if index is still equals -1 then a new track search has occured
    if (index === -1) {
      this.setState({
        playingTrack: playlistTracks[0] || searchResults[0] || "",
      });
    }
  };

  playerPlayEnded = () => this.setState({ paused: true });

  onDragStart = (start) => console.log("onDragStart", start);
  onDragUpdate = (update) => {
    console.log("onDragUpdate", update);
  };
  onDragEnd = (ending) => {
    console.log("onDragEnd", ending);

    if (ending.destination === null) return;

    const { source, destination } = ending;
    const { droppableId: sourceId, index: sourceIndex } = source;
    const { droppableId: destId, index: destIndex } = destination;
    const draggable = this.state[sourceId][sourceIndex];

    if (sourceId !== destId) {
      const sourceState = Array.from(this.state[sourceId]);
      sourceState.splice(sourceIndex, 1);

      const destState = Array.from(this.state[destId]);
      destState.splice(destIndex, 0, draggable);

      this.setState({
        [sourceId]: sourceState,
        [destId]: destState,
      });

      return;
    }

    if (sourceIndex === destIndex) return;

    const sourceDroppable = Array.from(this.state[sourceId]);
    sourceDroppable.splice(sourceIndex, 1);
    sourceDroppable.splice(destIndex, 0, draggable);
    this.setState({ [sourceId]: sourceDroppable });
  };

  render() {
    const {
      searchResults,
      playlistName,
      playlistTracks,
      searchTerm,
      paused,
      playingTrack,
      userPlaylists,
      isSaving,
      isLoading,
      isSearching,
    } = this.state;
    const playingTrackID = paused ? "" : playingTrack.id;

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <div>
          <h1>
            Tu<span className="highlight">nnn</span>ing
          </h1>
          <div className="App">
            <SearchBar
              searchTerm={searchTerm}
              onSearch={this.search}
              onChange={this.handleTermChange}
              onKeyDown={this.getEnterDownHandler(this.search)}
            />
            <div className="App-bars">
              <SearchResults
                results={searchResults}
                onAdd={this.addTrack}
                onPlayButton={this.trackPlayButton}
                playingTrackID={playingTrackID}
                isSearching={isSearching}
              />
              <Playlists
                playlistName={playlistName}
                defaultName={this.playlistName}
                playlistTracks={playlistTracks}
                playingTrackID={playingTrackID}
                userPlaylists={userPlaylists}
                isSaving={isSaving}
                onRemoveTrack={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onKeyDown={this.getEnterDownHandler(this.savePlaylist)}
                onPlayButton={this.trackPlayButton}
                onLoadPlaylists={this.loadUserPlaylists}
                onUndoPlaylist={this.undoPlaylist}
                onRenamePlaylist={this.renameUserPlaylist}
                onSavePlaylist={this.savePlaylist}
                isLoading={isLoading}
              />
              {playingTrack && (
                <Player
                  paused={paused}
                  track={playingTrack}
                  onPlayButton={this.playerPlayButton}
                  onNextButton={this.playerNextButton}
                  onPlayEnded={this.playerPlayEnded}
                />
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
