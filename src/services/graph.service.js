var graph = require('@microsoft/microsoft-graph-client')

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // use provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken)
    }
  })
  return client
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken)
  const user = await client.api('./me').get()
  return user;
}

export async function getEvents(accessToken) {
  const client = getAuthenticatedClient(accessToken)
  const events = await client
    .api('/me/events')
    .select('subject, start, end')
    .orderby('createdDateTime DESC')
    .get()

  return events
}









// export const graphConfig = {
//   graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
// }

// export const graphAPICallback = (data) => {
//   console.log(data)
// }

// export const callMSGraph = (endpoint, accessToken, graphAPICallback) => {
//   console.log('got to MSGraph')
//   const headers = new Headers()
//   var bearer = "Bearer " + accessToken
//   headers.append("Authorization", bearer)
//   const options = {
//     method: "GET",
//     headers
//   }
//   fetch(endpoint, options)
//     .then(response => {
//       console.log('graph response', response)
//       graphAPICallback(response)
//     })
//     .catch(err => {
//       console.log('err', err)
//     })
// }