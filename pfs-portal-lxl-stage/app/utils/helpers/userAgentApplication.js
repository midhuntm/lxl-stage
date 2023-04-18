import { UserAgentApplication } from 'msal';

export const getUri = config => {
  console.log(config);
  switch (process.env.NODE_ENV) {
    case 'production':
      return config.prodUri;

    case 'test':
      return config.qaUri;

    case 'development':
      return config.devUri;

    default:
      return config.redirectUri;
  }
};

export const userAgentApplication = config =>
  new UserAgentApplication({
    auth: {
      clientId: config.appId,
      redirectUri: getUri(config),
      postLogoutRedirectUri: getUri(config),
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  });
