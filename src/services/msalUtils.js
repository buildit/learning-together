import config from './config'
import { signIn, tokenCheck } from '../api'

export function login() {
  window.msal.loginPopup(config.scopes)
    .then(response => {
      loginCallback(response)
    })
    .catch(err => {
      console.log(err)
    })
}

export function logout(userAgent) {
  window.msal.logout()
  localStorage.clear()
}

export function loginCallback() {
  signIn(window.msal.getUser().displayableId, signInCallback)
}

export function signInCallback(response) {
  if (response.status === 200) {
    localStorage.setItem('username', response.data.username)
    localStorage.setItem('userId', response.data.id)
    tokenCheck()
    window.location.reload()
  }
  else {
    console.log(response)
  }
}