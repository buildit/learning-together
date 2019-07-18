const config = {
  msalConfig: {
    auth: {
      clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8'
    }
  },
  appId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
  authority: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  scopes: [
    "User.Read",
    "Calendars.ReadWrite",
    "Mail.ReadWrite",
    "Mail.Send",
    "Mail.Send.Shared"
  ]

}
export default config

