import React, { createContext, useState, useEffect } from 'react';
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedResources } from '../auth/authConfig';
import { callApiWithToken } from "../auth/fetch";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalAuthenticationTemplate, useAccount } from "@azure/msal-react";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [products, setProducts] = useState();

    useEffect(() => {
        if (account && inProgress === "none" && !products) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiHello.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                    .then(response => setProducts(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiHello.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                                .then(response => setProducts(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);


    return (
        <ProductsContext.Provider value={{ products }} >
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;