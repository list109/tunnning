import React from 'react'
import { Icons } from '../Icons/Icons'
import './Playlist.css'

export function Playlist({ id, name, length, onRename }) {
  const onClick = () => {
    const { current: header } = headerRef
    const isContentEditable = header.contentEditable === 'true' ? false : true

    header.contentEditable = isContentEditable

    if (isContentEditable) {
      header.focus()
      const selection = getSelection()
      selection.removeAllRanges()
      selection.collapse(header.firstChild, header.firstChild.length)
    }
  }

  const handleBlur = ({ currentTarget: header, relatedTarget: rel }) => {
    const { current: button } = buttonRef

    if (name === header.textContent) return

    onRename({ id, name: header.textContent, prevName: name })

    if (button.contains(rel)) return

    header.contentEditable = false
  }

  const handleKeyPress = ({ currentTarget: header, key }) => {
    if (key === 'Enter' && header.contentEditable) header.contentEditable = false
  }

  const headerRef = React.createRef()
  const buttonRef = React.createRef()

  return (
    <div className="Playlist">
      <div className="Playlist-information">
        <div className="Playlist-title">
          <h3
            contentEditable={false}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            ref={headerRef}
          >
            {name}
          </h3>
          <button
            type="button"
            className="Playlist-button Playlist-edit"
            onClick={onClick}
            ref={buttonRef}
          >
            {Icons.get('edit', 22)}
          </button>
        </div>
        <p>{length} tracks</p>
      </div>
      <button type="buttom" className="Playlist-button Playlist-replace">
        +
      </button>
    </div>
  )
}
