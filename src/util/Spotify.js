const CLIENT_ID = '565c78e61f5441e8bdf1635690798d4e'
const REDIRECT_URI = 'http://localhost:3000'
const SCOPE = 'playlist-modify-public'

export const Spotify = {
  url: {
    authorize: `https://accounts.spotify.com/authorize`,
    token: 'https://accounts.spotify.com/api/token',
    search: 'https://api.spotify.com/v1/search',
    me: 'https://api.spotify.com/v1/me',
    users: 'https://api.spotify.com/v1/users',
    playlists: 'https://api.spotify.com/v1/playlists'
  },
  token: '',
  stateLength: 16,

  async searchTrack(term) {
    const token = this.getAccessToken()
    if (!token) return []

    const url = new URL(this.url.search)
    url.searchParams.set('q', term)
    url.searchParams.set('type', 'track')

    const options = {
      headers: this.getRequestHeaders()
    }

    localStorage.removeItem('state')

    const { tracks } = await this.fetchJson(url, options)

    return tracks.items
  },

  async savePlaylist({ name, trackURIs }) {
    const token = this.getAccessToken()
    const isParamsVerified = token && name && Array.isArray(trackURIs) && trackURIs.length

    if (isParamsVerified === false) return

    const userId = await this.getUserId()
    const playlistResponse = await this.createPlaylist(name, userId)
    const { id: playlistId } = playlistResponse

    const tracksResponse = await this.saveTracks({ playlistId, trackURIs })
    return tracksResponse
  },

  async getUserId() {
    const options = {
      headers: this.getRequestHeaders()
    }

    const { id } = await this.fetchJson(this.url.me, options)

    return id
  },

  async createPlaylist(name, userId) {
    const url = `${this.url.users}/${userId}/playlists`
    const options = {
      method: 'POST',
      headers: this.getRequestHeaders(),
      body: JSON.stringify({
        name
      })
    }

    return this.fetchJson(url, options)
  },

  async saveTracks({ playlistId, trackURIs }) {
    const url = `${this.url.playlists}/${playlistId}/tracks?uris=${trackURIs.join(',')}`
    const options = {
      method: 'POST',
      headers: this.getRequestHeaders()
    }
    return this.fetchJson(url, options)
  },

  async fetchJson(url, options) {
    let response

    try {
      response = await fetch(url, options)
    } catch (err) {
      console.log('Network error')
      throw new SpotifyError({ message: err.message })
    }

    if (!response.ok) {
      let message = `${response.status}:${response.statusText} the response status is not ok`
      let jsonResponse = {}

      try {
        jsonResponse = await response.json()
      } catch (err) {
        throw new SpotifyError({ message })
      }
      throw new SpotifyError({
        message: jsonResponse.error.message || message,
        status: jsonResponse.error.status || '',
        object: jsonResponse
      })
    }

    try {
      const jsonResponse = await response.json()
      return jsonResponse
    } catch (err) {
      console.log(err.message)
      throw new SpotifyError({ message: 'Could not convert the response data' })
    }
  },

  getAccessToken() {
    if (this.token) return this.token

    const { access_token: token, expires_in: expTime, state } = this.getHashParams()

    if (token && expTime && state) {
      this.token = token
      this.state = state
      setTimeout(() => (this.token = null), expTime * 1000 - 1000)

      window.history.replaceState({}, '', window.location.origin)
      return this.token
    }

    this.redirectToAuthorization()
  },

  getHashParams() {
    const hash = window.location.hash.slice(1)
    const params = {}
    const regex = /([^&=;]+)=?([^&;]*)/g

    let matches
    while ((matches = regex.exec(hash))) {
      params[matches[1]] = decodeURIComponent(matches[2])
    }

    return params
  },

  redirectToAuthorization() {
    const state = this.generateRandomState(this.stateLenght)
    localStorage.setItem('state', state)

    let url = this.url.authorize + '?'

    url += `client_id=${CLIENT_ID}&`
    url += 'response_type=token&'
    url += `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&`
    url += `state=${state}&`
    url += `scope=${encodeURIComponent(SCOPE)}&`

    window.location = url
  },

  generateRandomState(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * possible.length)
      randomString += possible[index]
    }

    return randomString
  },

  getRequestHeaders() {
    return { Authorization: `Bearer ${this.token}` }
  }
}

class SpotifyError extends Error {
  constructor({ message, status, object }) {
    super(message)
    this.status = status
    this.object = object
  }
}
