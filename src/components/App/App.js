import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import { Spotify } from '../../util/Spotify'
import './App.css'

export class App extends React.Component {
  playlistName = 'New Playlist'

  state = {
    searchTerm: '',
    searchResults: [],
    playlistName: this.playlistName,
    playlistTracks: []
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
    const { playlistTracks } = this.state
    const isPresent = playlistTracks.find(({ id }) => id === track.id)

    if (isPresent) return

    this.setState({
      playlistTracks: [...playlistTracks, track]
    })
  }

  removeTrack = track => {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(({ id }) => id !== track.id)
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

  render() {
    const { searchResults, playlistName, playlistTracks, searchTerm } = this.state

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
            <SearchResults results={searchResults} onAdd={this.addTrack} />
            <Playlist
              name={playlistName}
              tracks={playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onKeyDown={this.getEnterDownHandler(this.savePlaylist)}
            />
          </div>
        </div>
      </div>
    )
  }
}
