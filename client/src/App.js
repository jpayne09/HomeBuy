import React, { useState } from "react";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { IdTokenClaims } from "./auth/ui";
import Button from "react-bootstrap/Button";
import { loginRequest } from './auth/authConfig';
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./auth/graph";
import HomeView from "./view/HomeView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Hello } from "./pages/Hello";

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ?
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};


const IdTokenContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { accounts } = useMsal();
    const [idTokenClaims, setIdTokenClaims] = useState(null);

    function GetIdTokenClaims() {
        setIdTokenClaims(accounts[0].idTokenClaims)
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {idTokenClaims ?
                <IdTokenClaims idTokenClaims={idTokenClaims} />
                :
                <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
            }
        </>
    );
};

/**
 * Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
 * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
 * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const MainContent = () => {

    return (
        <div className="App">
            <PageLayout>
                <AuthenticatedTemplate>
                    <ProfileContent />
                    <IdTokenContent />
                    <HomeView  />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
                </UnauthenticatedTemplate>
            </PageLayout>
        </div>
    );
};

const Pages = () => {
    return (
        <Switch>
            <Route path="/hello">
                <Hello />
            </Route>
        </Switch>
    )
}

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be 
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication 
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the 
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export default function App({ msalInstance }) {
    return (
        <Router>
            <MsalProvider instance={msalInstance}>
                <PageLayout>
                    <Pages />
                </PageLayout>
         </MsalProvider>
        </Router>
    );
}