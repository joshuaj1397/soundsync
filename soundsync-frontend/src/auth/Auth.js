import auth0 from 'auth0-js'
import Environment from './environmentVariables'

export default class Auth {
  accessToken
  idToken
  expiresAt
  tokenRenewalTimeout

  auth0 = new auth0.WebAuth({
    domain: Environment.AUTH0_DOMAIN,
    clientID: Environment.AUTH0_CLIENT_ID,
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid',
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
    this.renewSession = this.renewSession.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt))
  }

  scheduleRenewal() {
    let expiresAt = this.expiresAt
    const timeout = expiresAt - Date.now()
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession()
      }, timeout)
    }
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
      }
    })
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.scheduleRenewal()
      } else if (err) {
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the Access Token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0
    clearTimeout(this.tokenRenewalTimeout)

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    this.auth0.logout({
      returnTo: window.location.origin,
    })
  }
}
