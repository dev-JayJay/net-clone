// src/keycloak.js
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const IsRun = useRef(false);
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    if (IsRun.current) return;
    IsRun.current = true;

    // http://localhost:8080/realms/myrealm/login-actions/authenticate?execution=87adb93d-eceb-464d-9c69-421503bfa418&client_id=myclient&tab_id=GVYUamN-SVQ&client_data=eyJydSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJydCI6ImNvZGUifQ
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
        redirectUri: window.location.href,                 
    }).then(authenticated => {
      setKeycloak(keycloakInstance);      
      setAuthenticated(authenticated);    
    }).catch((err)=> {
      console.error("Keycloak initialization failed", err);
    });
  }, []);

  const logout = () => {
    keycloak.logout();
  };

  const getToken = () => {
    return keycloak ? keycloak.token : null;
  };

  return (
    <KeycloakContext.Provider value={{ authenticated, keycloak, logout, getToken }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
