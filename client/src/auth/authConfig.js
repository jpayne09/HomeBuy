
export const msalConfig = {
    auth: {
        clientId: "e390f8a7-320d-4b1f-87ec-a2b65095b0d5",
        authority: "https://login.microsoftonline.com/c22265e7-900b-49c0-ac66-cf43cbb73b9f/", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: "http://localhost:51689",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"],
    },
    apiHello: {
        endpoint: "http://localhost:51689/api/home",
        scopes: ["api://dc98aa92-2d5c-4eb5-9f20-fab6b3901a40/access_as_user"], // e.g. api://xxxxxx/access_as_user
    },
}
// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};