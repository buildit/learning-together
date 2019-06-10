// import * as Msal from 'msal'
// import { callMSGraph, graphConfig, graphAPICallback } from './graph.service'

// export default class AuthService {
//   constructor() {
//     const authOptions = {
//       clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
//       tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
//       authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
//       redirectUri: process.env.REACT_APP_URL,
//       navigateToLoginRequestUrl: false
//     }
//     const msalConfig = {
//       auth: authOptions
//     }
//     this.app = new Msal.UserAgentApplication(msalConfig)
//     this.app.handleRedirectCallback(this.authCallback);
//   }

//   login = () => {
//     console.log('got to login')
//     const loginRequest = {
//       scopes: ['user.read']
//     }
//     this.app.loginRedirect(loginRequest)
//   }

//   authCallback = (error, response) => {
//     console.log('authCallback response', error, response)
//   }

//   logout = () => {
//     this.app.logout()
//   }

//   getAccount = () => this.app.getAccount()

//   getToken = () => {
//     return sessionStorage.getItem('msal.idtoken')
//   }

//   getAccessToken = () => {
//     console.log('got to getAccesstoken')

//     if (this.app.getAccount()) {
//       const tokenRequest = {
//         scopes: ['user.read']
//       }
//       this.app.acquireTokenPopup(tokenRequest)
//         .then(tokenResponse => {
//           console.log('tokenResponse', tokenResponse.accessToken)
//           callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback)
//         })
//         .catch(err => {
//           if (err.name === "InteractionRequiredAuthError") {
//             return this.app.acquireTokenPopup(tokenRequest)
//               .then(response => {
//                 //get access token from response
//                 console.log('response.accessToken', response.accessToken)
//                 callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback)
//               })
//               .catch(err => {
//                 //handle error
//                 console.log('err', err)
//               })
//           }
//         })
//     } else {
//       this.login()
//     }
//   }
// }