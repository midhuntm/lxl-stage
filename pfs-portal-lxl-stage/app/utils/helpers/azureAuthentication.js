import { userAgentApplication } from './userAgentApplication';
import getUserDetails from './graphService';

export const getUserProfile = async config => {
  try {
    const accessToken = await userAgentApplication(config).acquireTokenSilent({
      scopes: config.scopes,
    });

    if (accessToken) {
      // TEMPORARY: Display the token in the error flash
      var user = await getUserDetails(accessToken);
      //await handleSubmit(user.email || user.userPrincipalName);
      //console.log("after succesfull login",data);
      return user;
    }
  } catch (err) {
    console.log('error from getUserProfile', err);
  }
};

export const logOut = () => {
  userAgentApplication().logout();
};
