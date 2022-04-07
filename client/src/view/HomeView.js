import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from '../auth/authConfig';



const GetToken = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };


        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    }
    console.log(accessToken);
    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {accessToken ?
                <p>Access Token Acquired!</p>
                :
                <button variant="secondary" onClick={RequestAccessToken}>Request Access Token</button>
            }

        </>
    );
}

function HomeView() {
    const [homes, setHomes] = useState();
    const [accessToken, setAccessToken] = useState(null);
    const { instance, accounts, inProgress } = useMsal();

    //get data from api
    const url = 'http://localhost:51689/api/home';

    useEffect(() => {
        GetAToken();
    }, []);

    
    const callApiWithToken = async (accessToken, url) => {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(setHomes(response.data))
            .catch(error => console.log(error));

    }

    const GetAToken = () => {
            const request = {
                ...loginRequest,
                account: accounts[0]
            };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            }).catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    setAccessToken(response.accessToken);
                });
            });
    }
    console.log(accessToken);
    return (
        <div className='container bg-light shadow'>
            <p className='display-2' > I'm the container </p>
            <div className="row">
                
            </div>
        </div>
    );
}

export default HomeView;
