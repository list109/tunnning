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
            <Playlist name={playlistName} tracks={playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}
