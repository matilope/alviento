import React, { useEffect, useState } from 'react';
import './Inicio.css';
import AlvientoApi from 'api/Api';


function Inicio() {

  const api = new AlvientoApi();

  /* Animacion desvanecimiento inicio */

  useEffect(() => {
    const ingreso = document.querySelector(".clientes");
    const inicio = document.querySelector(".inicio");
    const login = document.querySelector(".style-login");
    ingreso?.addEventListener('click', () => {
      setTimeout(() => {
        inicio?.classList.add("desvanece");
      }, 1000);
      setTimeout(() => {
        inicio?.classList.add("desaparece");
      }, 2000);
      setTimeout(() => {
        login?.classList.add("apareceAnimacion");
      }, 2000);
      setTimeout(() => {
        login?.classList.add("aparece");
      }, 3000);
    });
  });

  /* Chequear si esta logueado */
  interface userInterface {
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
      <>
        <main className='inicio'>
          <div className="container">
            <div className="row justify-content">
              <div className="col-4">
                <h1>¡Bienvenidos a Alvientos!</h1>
                <button className="fotografos">Ingreso fotografos</button>
                <button className="clientes">Ingreso clientes</button>
              </div>
              <div className="col-8 centrado">
                <picture>
                  <source srcSet={`${require('assets/images/camara-fotografica-mini.png')}`} media="(max-width:1320px)" />
                  <img src={`${require('assets/images/camara-fotografica.png')}`} alt="Presentacion camara fotografica" />
                </picture>
                <div className="socials">
                  <a href="https://instagram.com" target="_blank"></a>
                  <a href="https://twitter.com" target="_blank"></a>
                  <a href="https://facebook.com" target="_blank"></a>
                </div>
              </div>
            </div>
            <div className="flecha">
              <img src={`${require('assets/images/flecha-top.png')}`} alt="Flecha indicadora para subir al principio de la página" />
            </div>
          </div>
        </main>
        <section id="clientes">
          <h2>Lo mejor de alvientos</h2>
          <p>Acá podrás buscarte en eventos blablabla y bajarte la foto que más te guste!</p>
          <button>Ingreso clientes</button>
          <img src={`${require('assets/images/inicio/musica.png')}`} alt="" />
          <img src={`${require('assets/images/inicio/play.png')}`} alt="" />
          <img src={`${require('assets/images/inicio/logo.png')}`} alt="" />
        </section>
        <section>
          <h2>¿ Quiénes somos ?</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ipsa quo quaerat? Tempore saepe est hic qui veritatis aperiam ducimus optio, consectetur alias suscipit eaque voluptatem sed dignissimos maiores sequi.</p>
        </section>
        <section>
          <h2>¿ Que ofrecemos ?</h2>
          <p>Te ofrecemos el mejor servicio, velocidad, blablablá invento invento chamuyo</p>
          <button></button>
        </section>
        <section>
          <button>Ingreso fotografos</button>
          <h2>Sumate!</h2>
        </section>
      </>
    );
  } else {

    return (
      <h1>Bienvenidos</h1>
    );

  }

}

export default Inicio;