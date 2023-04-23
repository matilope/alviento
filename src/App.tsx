import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import api_config from "./aws-api-endpoints";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import '@aws-amplify/ui-react/styles.css';
import AlvientoApi from 'api/Api';
import './App.css';

const Header = lazy(() => import('./components/partials/Header'));
const Inicio = lazy(() => import('./components/pages/inicio/Inicio'));
const Albumes = lazy(() => import('./components/pages/albumes/Albumes'));
const Perfil = lazy(() => import('./components/pages/perfil/Perfil'));
const Formulario_perfil = lazy(() => import('./components/pages/formulario_perfil/formulario_perfil'));
const Pagos = lazy(() => import('./components/pages/pagos/Pagos'));
const Footer = lazy(() => import("./components/partials/Footer"));
const Galeria = lazy(() => import("./components/pages/galeria/Galeria"));
const Form = lazy(() => import("./components/admin/Form"));
const Error = lazy(() => import("./components/pages/error/Error"));


export function Animacion() {
  const logo = require('assets/images/animacion.gif');
  return (
    <div style={{height:'100vh', width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={logo} alt="Logo Alviento" />
    </div>
  )
}

Amplify.configure(awsconfig);
Amplify.configure(api_config);

function App() {
  const api = new AlvientoApi();
  const [form, setForm]: any = useState();
  const [h1, setH1]: any = useState()

  /* Insertando en el formulario el Hola Alvientos y tambien hacer que no desaparezca al ir a create account y aparezca cada vez que se pueda llegar a mostrar el formulario, un lio pero esta solucionado */
  function Enunciado() {
    let forms = document.querySelectorAll('form');
    let h1s = document.createElement("h1");
    let button = document.querySelectorAll("button[type='button']");
    h1s.textContent = "¡Hola Alvientos!";
    h1s.style.color = "#571A45";
    h1s.style.textAlign = "center";
    h1s.style.margin = "0px 0px 20px 0px";
    setH1(h1s);
    forms[1]?.appendChild(h1s);
    setForm(forms);
    for (let i = 0; i < button.length; i++) {
      button[i]?.addEventListener('click', () => {
        let forms = document.querySelectorAll('form');
        let h1s = document.createElement("h1");
        h1s.textContent = "¡Hola Alvientos!";
        h1s.style.color = "#571A45";
        h1s.style.textAlign = "center";
        h1s.style.margin = "0px 0px 20px 0px";
        setH1(h1s);
        forms[1]?.appendChild(h1s);
        setForm(forms);
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      Enunciado();
    }, 100);
  }, []);


  /* Chequear si esta logueado */

  const [user, setUser]: any = useState();

  useEffect(() => {
    (async () => {
      const response = await api.getAuth();
      setUser(response);
    })();
  }, []);

  if (user === undefined || !user) {
    return (
      <Suspense fallback={<Animacion />}>
        <Router>
          <Header />
          <Routes>
            <Route path='*' element={<Inicio />} />
          </Routes>
        </Router>
        <Authenticator className="style-login" socialProviders={['facebook', 'google']}>
          {() => (
            <>
            </>
          )}
        </Authenticator>
      </ Suspense>
    );
  }


  return (
    <Suspense fallback={<Animacion />}>
      <Router>
        <Header />
        <main className="style-main">
          <>
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/albumes' element={<Albumes />} />
              <Route path='/galeria/:id' element={<Galeria />} />
              <Route path='/perfil' element={<Perfil />} />
              <Route path='/pagos/:id' element={<Pagos />} />
              <Route path='/form' element={<Form />} />
              <Route path='/formulario_perfil' element={<Formulario_perfil />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>
        </main>
        <Footer />
      </Router>
    </ Suspense>
  );

}


export default App;