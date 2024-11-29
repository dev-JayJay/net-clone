import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const IsRun = useRef(false);
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IsRun.current) return;
    IsRun.current = true;
    
    const keycloakInstance = new Keycloak({
      url: 'http://localhost:8080/',
      realm: 'myrealm',
      clientId: 'myclient',
      redirectUri: 'http://localhost:3000/', 
    });

    keycloakInstance.init({
      onLoad: 'login-required', 
      checkLoginIframe: false,  
      enableLogging: true,      
    }).then(authenticated => {
      setKeycloak(keycloakInstance);
      setAuthenticated(authenticated);
      setLoading(false);
      console.log(`Authenticated: ${authenticated}`);
    }).catch(err => {
      setLoading(false);
      console.error('Keycloak initialization failed', err);
    });
  }, []);

  const logout = () => {
    if (keycloak) {
      console.log('Logging out...');
      keycloak.logout().then(() => {
        console.log('Logout successful');
        setAuthenticated(false);
      }).catch((err) => {
        console.error('Logout failed:', err);
      });
    } else {
      console.error('Keycloak instance is not initialized.');
    }
  };

  const getToken = () => {
    return keycloak ? keycloak.token : null;
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <KeycloakContext.Provider value={{ authenticated, keycloak, logout, getToken }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
