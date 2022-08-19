import React, { useState, useEffect } from "react";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalAuthenticationTemplate, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { IdTokenClaims } from "./auth/ui";
import Button from "react-bootstrap/Button";
import { loginRequest, protectedResources } from './auth/authConfig';
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./auth/graph";
import { Store } from './pages/Store/index';
import { Cart } from './pages/Cart/index';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Hello } from "./pages/Hello";
import { callApiWithToken } from "../src/auth/fetch";
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';

const HelloContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [helloData, setHelloData] = useState();

    useEffect(() => {
        if (account && inProgress === "none" && !helloData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiHello.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                    .then(response => setHelloData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiHello.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                                .then(response => setHelloData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);

    return (
        <>
            {helloData ? <HomeView helloData={helloData} /> : null}
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
    const authRequest = {
        ...loginRequest
    };
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Store} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </Router>
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
                <ProductsContextProvider>
                    <CartContextProvider>
                        <PageLayout>
                            <Pages />
                        </PageLayout>
                     </CartContextProvider>
                </ProductsContextProvider>
         </MsalProvider>
        </Router>
    );
}