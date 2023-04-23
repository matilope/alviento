import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Hub } from 'aws-amplify';

import AlvientoApi from 'api/Api';

const logo = require('assets/images/logo.png');
const usuario = require('assets/images/usuario.png');

Amplify.configure(awsconfig);


function Header() {

  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          window.location.reload();
          break;
        case 'signUp':
          window.location.reload();
          break;
        case 'signOut':
          window.location.reload();
          break;
      }
    });
  }, [])

  const api = new AlvientoApi();

  /* Chequear si esta logueado */

  interface user {
    auth: string
  }
  /* Chequear tipado de user */
  const [user, setUser]: any = useState();

  useEffect(() => {
    (async () => {
      const response = await api.getAuth();
      setUser(response);
    })();
  }, []);

  if (user === undefined) {
    return (
      <header>
        <div>
          <a href="/">
            <div style={{ background: `url(${logo}) no-repeat` }}></div>
          </a>
          <h1>Alvientos</h1>
          <ul>
            <li style={{ background: `url(${usuario}) no-repeat` }}>
              <ul>
                <li>No tiene acceso a esta seccion</li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
    );
  } else {
    return (
      <>
        <header>
          <div>
            <a href="/">
              <div style={{ background: `url(${logo}) no-repeat` }}></div>
            </a>
            <h1>Alvientos</h1>
            <Authenticator className="extra-options">
              {({ signOut, user }) => (
                <ul>
                  <li style={{ background: `url(${usuario}) no-repeat` }}>
                    <ul>
                      <li><Link to="/albumes">Albumes</Link></li>
                      <li><Link to="/Perfil">Perfil</Link></li>
                      <li onClick={signOut}>Cerrar sesión</li>
                    </ul>
                  </li>
                </ul>
              )}
            </Authenticator>
          </div>
        </header>
      </>
    );
  };
}

export default Header;