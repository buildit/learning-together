import { UserAgentApplication } from 'msal'

// Configuration object constructed.
const config = {
  auth: {
    clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
    authroity: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a/oauth2/v2.0/authorize',
    redirectUri: process.env.REACT_APP_URL, //defaults to application start page
    postLogoutRedirectUri: window.location.origin,
  }
}

// create UserAgentApplication instance
const userAgentApplication = new UserAgentApplication(config);

userAgentApplication.handleRedirectCallback(function (error, response) {
  // handle redirect response or error
  if (response) {
    console.log('response', response)
  } else {
    console.log('error', error)
  }
});

export const logout = () => {
  return userAgentApplication.logOut();
};


// import { AuthenticationContext, adalFetch } from 'react-adal';
// export const adalConfig = {
//   tenant: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
//   clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
//   endpoints: {
//     api: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a/oauth2/v2.0/authorize'
//   },
//   postLogoutRedirectUri: window.location.origin,
//   redirectUri: process.env.REACT_APP_URL,
//   cacheLocation: 'sessionStorage'
// };
// export const authContext = new AuthenticationContext(adalConfig);

// export const adalApiFetch = (fetch, url, options) =>
//   adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

// export const getToken = () => {
//   return authContext.getCachedToken(authContext.config.clientId);
// };

// export const logout = () => {
//   return authContext.logOut();
// };

// export const getUserInfo = (callback) => {
//   return authContext.getUser(callback);
// };