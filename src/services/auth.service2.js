import * as Msal from 'msal'
import { callMSGraph, graphConfig, graphAPICallback } from './graph.service'

const authOptions = {
  clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
  tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  redirectUri: process.env.REACT_APP_URL
}

export const userAgent = new Msal.UserAgentApplication(authOptions.clientId, authOptions.authority, function (errorDes, token, error, tokenType, instance) {
  if (error) {
    console.log('error in userAgent', error + ": ", errorDes)
  } else {
    console.log("token type = " + tokenType)
  }
})
// userAgent.handleRedirectCallback(authCallback);


export const login = () => {
  console.log('got to login')
  const loginRequest = {
    scopes: ['user.read']
  }
  userAgent.loginRedirect(loginRequest)
  getAccessToken()
}



export const logout = () => {
  userAgent.logout()
}

export const getAccount = () => userAgent.getAccount()

export const getToken = () => {
  return sessionStorage.getItem('msal.idtoken')
}

export const getAccessToken = () => {
  console.log('got to getAccesstoken')
  const tokenRequest = {
    scopes: ['user.read']
  }
  userAgent.acquireTokenSilent(tokenRequest)
    .then(tokenResponse => {
      console.log('tokenResponse', tokenResponse.accessToken)
      callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback)
    })
    .catch(err => {
      if (err.name === "InteractionRequiredAuthError") {
        return userAgent.acquireTokenPopup(tokenRequest)
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
