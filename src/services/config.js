module.exports = {
  appId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
  tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  redirectUri: process.env.REACT_APP_URL,
  scopes: [
    "user.read",
    "calendars.read"
  ]
}