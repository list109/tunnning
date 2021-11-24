import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Player } from '../Player/Player'
import { Playlists } from '../Playlists/Playlists'
import { Spotify } from '../../util/Spotify'
import './App.css'

export class App extends React.Component {
  playlistName = 'New Playlist'

  state = {
    searchTerm: '',
    searchResults: [],
    playlistName: this.playlistName,
    playlistTracks: [],

    userPlaylists: [],
    isLoading: false,

    //have to keep these player state values on the top to sync with other components
    playingTrack: '',
    paused: true,

    isSaving: false
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
    this.setState({ isSaving: true })
    Spotify.savePlaylist({ name, trackURIs })
      .then(response => {
        console.log('the playlist has been saved successfully')
        this.setState({
          playlistName: this.playlistName,
          playlistTracks: []
        })
      })
      .catch(({ message }) => console.log(message))
      .finally(() => this.setState({ isSaving: false }))
  }

  trackPlayButton = (track, isRepeated) => {
    const pauseUpdate = { paused: !this.state.paused }
    const playingTrackUpdate = { playingTrack: Object.assign({}, track), paused: false }
    const state = isRepeated ? pauseUpdate : playingTrackUpdate
    this.setState(state)
  }

  undoPlaylist = () => {
    const { searchResults, playlistTracks } = this.state

    this.setState({
      playlistName: this.playlistName,
      searchResults: [...searchResults, ...playlistTracks],
      playlistTracks: []
    })
  }

  loadUserPlaylists = () => {
    if (this.state.isLoading) return
    console.log('onLoad')
    this.setState({ isLoading: true, userPlaylists: [] })

    Spotify.getPlaylists()
      .then(playlists => {
        this.setState({
          userPlaylists: playlists.length
            ? playlists
            : ["You hasn't created any playlist on your account yet"]
        })
        console.log(playlists)
      })
      .catch(err => {
        console.log(err)
        this.setState({ userPlaylists: ['Error has occured'] })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
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
    const {
      searchResults,
      playlistName,
      playlistTracks,
      searchTerm,
      paused,
      playingTrack,
      userPlaylists,
      isSaving
    } = this.state
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
          <div className="App-bars">
            <SearchResults
              results={searchResults}
              onAdd={this.addTrack}
              onPlayButton={this.trackPlayButton}
              playingTrackID={playingTrackID}
            />
            <Playlists
              playlistName={playlistName}
              defaultName={this.playlistName}
              playlistTracks={playlistTracks}
              userPlaylists={userPlaylists}
              onRemoveTrack={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onKeyDown={this.getEnterDownHandler(this.savePlaylist)}
              onPlayButton={this.trackPlayButton}
              onLoadPlaylists={this.loadUserPlaylists}
              onUndoPlaylist={this.undoPlaylist}
              onRemovePlaylist={this.removePlaylist}
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
