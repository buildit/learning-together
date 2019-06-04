import * as Msal from 'msal'
import { callMSGraph, graphConfig, graphAPICallback } from './graph.service'

export default class AuthService2 {
  constructor() {
    const authOptions = {
      clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
      tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
      authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
      redirectUri: process.env.REACT_APP_URL
    }
    const msalConfig = {
      auth: authOptions
    }
    this.app = new Msal.UserAgentApplication(msalConfig)
    this.app.handleRedirectCallback(this.authCallback);
  }

  login = () => {
    console.log('got to login')
    const loginRequest = {
      scopes: ['user.read']
    }
    this.app.loginRedirect(loginRequest)
    // .then(res => console.log('access response', res))
    // .then(loginResponse => {
    //   return this.app.acquireTokenSilent(loginRequest)
    // })
    // .then(accessTokenRes => {
    //   console.log('accesssToken: ', accessTokenRes.accessToken)
    // })
    // .catch(error => {
    //   console.log('access error', error)
    // })
  }

  authCallback = (error, response) => {
    if (error) {
      console.log('error', error)
    } else {
      console.log('authcallback response', response)
      this.getAccessToken()
    }
  }

  logout = () => {
    this.app.logout()
  }

  getAccount = () => this.app.getAccount()

  getToken = () => {
    return sessionStorage.getItem('msal.idtoken')
  }

  getAccessToken = () => {
    console.log('got to getAccessToken')
    const tokenRequest = {
      scopes: ['user.read', 'calendars.read']
    }
    this.app.acquireTokenSilent(tokenRequest)
      .then(tokenResponse => {
        console.log('tokenResponse', tokenResponse.accessToken)
        callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback)
      })
      .catch(err => {
        if (err.name === "InteractionRequiredAuthError") {
          return this.app.acquireTokenSilent(tokenRequest)
            .then(response => {
              //get access token from response
              console.log('response.accessToken', response.accessToken)
              callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback)
            })
            .catch(err => {
              //handle error
              console.log('err', err)
            })
        }
      })
  }
}