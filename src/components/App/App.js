import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import './App.css'

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar></SearchBar>
          <div className="App-playlist">
            <SearchResults></SearchResults>
            <Playlist></Playlist>
          </div>
        </div>
      </div>
    )
  }
}
