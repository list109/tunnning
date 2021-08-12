import React from 'react'
import './SearchBar.css'

export class SearchBar extends React.Component {
  state = {
    term: ''
  }

  search = () => this.props.onSearch(this.state.term)

  handleTermChange = ({ target }) => this.setState({ term: target.value })

  render() {
    return (
      <div className="SearchBar">
        <input
          value={this.state.term}
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    )
  }
}
