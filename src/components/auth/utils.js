import { AuthenticationContext, adalFetch } from 'react-adal';
export const adalConfig = {
  tenant: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
  clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
  endpoints: {
    api: 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a/oauth2/v2.0/authorize'
  },
  postLogoutRedirectUri: window.location.origin,
  redirectUri: 'http://localhost:3000',
  cacheLocation: 'sessionStorage'
};
export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};