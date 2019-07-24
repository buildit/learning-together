import { signIn, tokenCheck } from '../api'

export function login() {
  const request = {
    scopes: [
      "User.Read",
      "Calendars.ReadWrite",
      "Mail.ReadWrite",
      "Mail.Send",
      "Mail.Send.Shared"
    ]
  }
  window.msal.loginPopup(request.scopes)
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

export function loginCallback(response) {
  signIn(window.msal.getUser().displayableId, signInCallback)
  //window.msal.getAccount().userName
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