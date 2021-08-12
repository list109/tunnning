import React from 'react'
import './SearchBar.css'

export class SearchBar extends React.Component {
  search = () => this.props.onSearch(this.state.term)
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    )
  }
}
