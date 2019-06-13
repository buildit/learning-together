
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

export async function addEvent(accessToken, body) {
  const client = getAuthenticatedClient(accessToken)
  const response = await client
    .api('/me/events')
    .post(body)

  return response
}

export async function sendEmail({ accessToken, message, saveToSentItems }) {
  const client = getAuthenticatedClient(accessToken)
  const response = await client
    .api('/me/sendmail')
    .post(message, saveToSentItems)
  return response
}