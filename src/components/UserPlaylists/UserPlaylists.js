import React from 'react'
import { Playlist } from '../Playlist/Playlist'
import { Icons } from '../Icons/Icons'
import './UserPlaylists.css'

export class UserPlaylists extends React.Component {
  containerRef = React.createRef()

  render() {
    const { playlists, onLoad } = this.props
    const notLoaded = typeof playlists[0] === 'string'
    const message = <p className="UserPlaylists-message">{playlists[0]}</p>
    const content = notLoaded ? message : this.getPlaylistsTemplate(playlists)
    const icon = <i className="UserPlaylists-icon">{Icons.get('loading')}</i>

    return (
      <div className="UserPlaylists" ref={this.containerRef}>
        <h2>
          User's playlists
          <button className="UserPlaylists-button" onClick={onLoad}>
            {Icons.get('reload', 26)}
          </button>
        </h2>
        {playlists.length ? content : icon}
      </div>
    )
  }

  getPlaylistsTemplate(playlists) {
    return playlists.map(({ id, name, tracks }) => (
      <Playlist
        key={id}
        id={id}
        name={name}
        length={tracks.total || 0}
        onRename={this.props.onRenamePlaylist}
      />
    ))
  }

  changeClasses() {
    const { current: container } = this.containerRef
    const { playlists, isToggled } = this.props

    if (playlists.length < 1 && isToggled) {
      setTimeout(() => container.classList.add('loading'))
    }

    if (playlists.length) container.classList.remove('loading')

    container.classList[isToggled ? 'add' : 'remove']('toggled')
  }
    this.startLoading()
    this.changeClasses()
}
