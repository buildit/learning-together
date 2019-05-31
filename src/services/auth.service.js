import * as Msal from 'msal'

export default class AuthService {
  constructor() {
    // let PROD_REDIRECT_URI = process.env.REACT_APP_URL
    // let redirectUri = window.location.origin
    // let redirectUri = process.env.REACT_APP_URL

    const authOptions = {
      clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
      tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
      authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
      // authority: 'https://login.microsoftonline.com/organizations/v2.0',
      redirectUri: process.env.REACT_APP_URL
    }
    const msalConfig = {
      auth: authOptions
    }
    this.app = new Msal.UserAgentApplication(msalConfig)
    this.app.handleRedirectCallback(this.authCallback);
  }

  login = () => {
    const loginRequest = {
      scopes: ['user.read']
    }
    this.app.loginRedirect(loginRequest)
  }

  authCallback = (error, response) => {
    console.log('authCallback response', error, response)
  }

  logout = () => {
    console.log('logged out')
    this.app.logout()
  }

  getAccount = () => this.app.getAccount()

  getToken = () => {
    const tokenRequest = {
      scopes: ['user.read']
    }
    return this.app.acquireTokenSilent(tokenRequest)
      .then(
        (tokenResponse) => {
          console.log('tokenResponse', tokenResponse)
        }
      )
      .catch((err) => console.log(err))
  }

}