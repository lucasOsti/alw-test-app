import React, { useState, useEffect } from "react";
import "@ibexa/assets-library-widget/build/main.css";
import AssetsLibraryWidget from "@ibexa/assets-library-widget";

const AlwWrapper = ({ clientId, clientSecret, instanceUrl, rootLocationId, startingLocationId, windowMode, multiple, language, onConfirm, onCancel }) => {
    const [accessToken, setAccessToken] = useState(null);
    const getAccessToken = async () => {
        const accessTokenResponse = await fetch(`${instanceUrl}/token`, {
            method: "POST",
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
            }),
            headers: {
                Accept: "application/vnd.ibexa.api.ContentInfo+json",
                "Content-Type": "application/json",
            },
        });
        const jsonAccessToken = await accessTokenResponse.json();
    
        setAccessToken(jsonAccessToken.access_token);
      }
    
      useEffect(() => {
        getAccessToken()
      }, [])

    return (
        <>
            {accessToken 
                ? 
                    <AssetsLibraryWidget
                        rootLocationId={rootLocationId}
                        startingLocationId={startingLocationId}
                        accessToken={accessToken}
                        windowMode={windowMode}
                        language={language}
                        multiple={multiple}
                        instanceUrl={instanceUrl}
                        onConfirm={(data) => onConfirm(data)}
                        onCancel={() => onCancel()}
                    />
                : 
                    <div>loader</div>
            }
        </>
    );
}

export default AlwWrapper;