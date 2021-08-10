import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import './App.css'

export class App extends React.Component {
  state = {
    searchResults: [],
    playlistName: '',
    playlistTracks: []
  }

  addTrack = track => {
    const { playlistTracks } = this.state
    const isPresent = playlistTracks.find(({ id }) => id === track.id)

    if (isPresent) return

    this.setState({
      playlistTracks: [...playlistTracks, track]
    })
  }

  render() {
    const { searchResults, playlistName, playlistTracks } = this.state

    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults results={searchResults} onAdd={this.addTrack} />
            <Playlist name={playlistName} tracks={playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}
