export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}

export const graphAPICallback = (data) => {
  console.log(data)
}

export const callMSGraph = (endpoint, accessToken, graphAPICallback) => {
  console.log('got to MSGraph')
  const headers = new Headers()
  var bearer = "Bearer " + accessToken
  headers.append("Authorization", bearer)
  const options = {
    method: "GET",
    headers
  }
  fetch(endpoint, options)
    .then(response => {
      console.log('graph response', response)
      graphAPICallback(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}