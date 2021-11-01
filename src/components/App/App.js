import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import { Player } from '../Player/Player'
import { Spotify } from '../../util/Spotify'
import './App.css'

export class App extends React.Component {
  playlistName = 'New Playlist'

  state = {
    searchTerm: '',
    searchResults: [],
    playlistName: this.playlistName,
    playlistTracks: [],

    playingTrack: '',
    paused: true
  }

  handleTermChange = value => {
    this.setState({ searchTerm: value })
  }

  getEnterDownHandler = callback => {
    return keyValue => keyValue === 'Enter' && callback()
  }

  search = () => {
    Spotify.searchTrack(this.state.searchTerm)
      .then(tracks => {
        this.setState({
          searchResults: [...tracks]
        })
      })
      .catch(err => console.log(err.message))
  }

  addTrack = track => {
    const { playlistTracks, searchResults } = this.state

    this.setState({
      searchResults: searchResults.filter(({ id }) => track.id !== id),
      playlistTracks: [...playlistTracks, track]
    })
  }

  removeTrack = track => {
    const { searchResults, playlistTracks } = this.state

    this.setState({
      searchResults: [...searchResults, track],
      playlistTracks: playlistTracks.filter(({ id }) => id !== track.id)
    })
  }

  updatePlaylistName = value => this.setState({ playlistName: value })

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(({ uri }) => uri)
    const { playlistName: name } = this.state

    const isVerified = name && trackURIs.length > 0
    if (isVerified === false) {
      console.log("need a playlist's name or one or more tracks")
      return
    }

    Spotify.savePlaylist({ name, trackURIs })
      .then(response => {
        console.log('the playlist has been saved successfully')
        this.setState({
          playlistName: this.playlistName,
          playlistTracks: []
        })
      })
      .catch(({ message }) => console.log(message))
  }

  trackPlayButton = (track, isRepeated) => {
    const pauseUpdate = { paused: !this.state.paused }
    const playingTrackUpdate = { playingTrack: Object.assign({}, track), paused: false }
    const state = isRepeated ? pauseUpdate : playingTrackUpdate
    this.setState(state)
  }

  playerPlayButton = () => this.setState({ paused: !this.state.paused })

  playerNextButton = () => {
    const { searchResults, playlistTracks, playingTrack } = this.state
    const lists = { searchResults, playlistTracks }
    const listNames = Object.keys(lists)

    let index

    for (const name of listNames) {
      index = lists[name].findIndex(({ id }) => id === playingTrack.id)

      if (index === -1) continue

      let nextTrack = lists[name][index + 1]

      if (nextTrack) {
        this.setState({ playingTrack: nextTrack })
        return
      }

      nextTrack =
        name === 'searchResults'
          ? playlistTracks[0] || searchResults[0]
          : searchResults[0] || playlistTracks[0]

      this.setState({ playingTrack: nextTrack })
      return
    }

    // if index is still equals -1 then a new track search has occured
    if (index === -1) {
      this.setState({ playingTrack: playlistTracks[0] || searchResults[0] || '' })
    }
  }

  playerPlayEnded = () => this.setState({ paused: true })

  render() {
    const { searchResults, playlistName, playlistTracks, searchTerm, paused, playingTrack } =
      this.state
    const playingTrackID = paused ? '' : playingTrack.id

    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={this.search}
            onChange={this.handleTermChange}
            onKeyDown={this.getEnterDownHandler(this.search)}
          />
          <div className="App-playlist">
            <SearchResults
              results={searchResults}
              onAdd={this.addTrack}
              onPlayButton={this.trackPlayButton}
              playingTrackID={playingTrackID}
            />
            <Playlist
              name={playlistName}
              tracks={playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onKeyDown={this.getEnterDownHandler(this.savePlaylist)}
              onPlayButton={this.trackPlayButton}
              playingTrackID={playingTrackID}
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
    )
  }
}
