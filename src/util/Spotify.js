const CLIENT_ID = '565c78e61f5441e8bdf1635690798d4e'
const REDIRECT_URI = 'http://localhost:3000'
const SCOPE = 'playlist-modify-public'

export const Spotify = {
  urls: {
    authorize: `https://accounts.spotify.com/authorize`,
    api: 'https://api.spotify.com/v1'
  },

  getUrl(endpoint) {
    const { authorize, api } = this.urls
    return endpoint === 'authorize' ? authorize : `${api}/${endpoint}`
  },

  token: '',
  stateLength: 16,

  async searchTrack(term) {
    const token = this.getAccessToken()
    if (!token) return []

    const url = new URL(this.getUrl('search'))
    url.searchParams.set('q', term)
    url.searchParams.set('type', 'track')

    const options = {
      headers: this.getRequestHeaders()
    }

    const { tracks } = await this.fetchJson(url, options)

    return tracks.items
  },

  async savePlaylist({ name, trackURIs }) {
    const token = this.getAccessToken()
    if (!token) return

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

    const { id } = await this.fetchJson(this.getUrl('me'), options)

    return id
  },

  async createPlaylist(name, userId) {
    const url = `${this.getUrl('users')}/${userId}/playlists`
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
    const url = `${this.getUrl('playlists')}/${playlistId}/tracks?uris=${trackURIs.join(',')}`
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
      throw new SpotifyError({
        status: 'Network error',
        message: err.message,
        object: err
      })
    }

    const { status, statusText } = response

    if (!response.ok) {
      let message = `${statusText && statusText + '. '}The response status is not ok`
      let jsonResponse = {}
      try {
        jsonResponse = await response.json()
      } catch (err) {
        throw new SpotifyError({ status, message, object: response })
      }
      throw new SpotifyError({
        message: (jsonResponse.error && jsonResponse.error.message) || message,
        status: (jsonResponse.error && jsonResponse.error.status) || status,
        object: jsonResponse
      })
    }

    try {
      const jsonResponse = await response.json()
      return jsonResponse
    } catch (err) {
      console.log(err.message)
      throw new SpotifyError({
        status: 'Incorrects response from the server',
        message: 'Could not convert the response data'
      })
    }
  },

  getAccessToken() {
    const storedToken = localStorage.getItem('token')
    const storedExpiration = localStorage.getItem('expiration')

    if (storedToken && Date.now() < storedExpiration) return storedToken

    const { access_token: token, expires_in: expiration, state } = this.getHashParams()
    const storedState = localStorage.getItem('state')

    if (state && state !== storedState) {
      console.log('state mismatch error')
      return
    }

    if (token && expiration) {
      localStorage.removeItem('state')
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', parseInt(expiration, 10) * 1000 + Date.now())

      window.history.replaceState({}, '', window.location.origin)
      return token
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

    let url = this.getUrl('authorize') + '?'

    url += `client_id=${CLIENT_ID}&`
    url += 'response_type=token&'
    url += `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&`
    url += `state=${state}&`
    url += `scope=${SCOPE}&`

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
    return { Authorization: `Bearer ${this.getAccessToken()}` }
  }
}

class SpotifyError extends Error {
  constructor({ status, message, object }) {
    super(message)
    this.status = status
    this.object = object
  }
}
