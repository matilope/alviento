import React, { useEffect } from 'react'
import './formulario_perfil.css';

export default function Formulario_perfil() {

  useEffect(() => {
    let input = document.querySelectorAll('.sucesor');
    let next = document.querySelectorAll('form>div button');
    let volver = document.querySelectorAll('.volver');
    let currentSlide = 1;

    // Slider Manual
    const manual = function (manual: number) {
      input.forEach((slide) => {
        slide.classList.remove('activo');
        next.forEach((n) => {
          n.classList.remove('activo');
        });
      });
      manual++;
      currentSlide = manual;
      if (manual < 0) {

      } else {
        input[manual].classList.add('activo');
        input[manual].classList.add('animacion');
      }
      if (manual == next.length || manual < 0) {

      } else {
        next[manual].classList.add('activo');
      }
    }

    next.forEach((n, i) => {
      n.addEventListener('click', () => {
        manual(i);
        currentSlide = i;
      });
    });

    for (let i = 0; i < volver.length; i++) {
      volver[i].addEventListener('click', () => {
        manual(i - 1);
        currentSlide = i;
      });
    }

  }); 

  const socials = require('assets/images/redes-sociales.png');

  return (
      <div className="principal">
        <div className="container">
          <div className="row">
            <div className="col-12 centrado">
              <h1 style={{marginTop: "1em"}}>¡ Bienvenid@s a nuestra comunidad !</h1>
              <form>
                <div className="sucesor activo"><label htmlFor="Nombre">Completa tu nombre</label><input type="text" name="nombre" id="nombre" placeholder='Nombre' />
                  <button type='button' className="activo">Siguiente</button>
                </div>
                <div className="sucesor"><label htmlFor="Apellido">Completa tu apellido</label><input type="text" name="apellido" id="apellido" placeholder='Apellido' />
                  <button type='button'>Siguiente</button>
                  <a className="volver">Volver</a>
                </div>
                <div className="sucesor"><label htmlFor="Descripcion">Completa tu descripcion</label><textarea name="descripcion" id="Descripcion" placeholder="Descripcion"></textarea>
                  <button type='button'>Siguiente</button>
                  <a className="volver">Volver</a>
                </div>
                <div className="sucesor"><label htmlFor="imagen">Elegí tu foto de perfil</label>
                  <label className="inputFile" htmlFor="imagen">Cargar Archivos</label>
                  <input type="file" name="imagen" id="imagen" />
                  <button type='button'>Siguiente</button>
                  <a className="volver">Volver</a>
                </div>
                <div className="sucesor"><label htmlFor="imagen2">Cargá las fotos que quieras compartir en tu perfil</label>
                  <label className="inputFile" htmlFor="imagen2">Cargar Archivos</label>
                  <input type="file" name="imagen2" id="imagen2" />
                  <button type='button'>Siguiente</button>
                  <a className="volver">Volver</a>
                </div>
                <div className="sucesor"><span>¿Esta seguro que quiere actualizar la información colocada?</span><input type="submit" value="Enviar" />
                  <a className="volver">Volver</a>
                </div>
              </form>
            </div>
            <div className="redes-sociales" style={{ background: `url(${socials}) no-repeat` }}>
              </div>
          </div>
        </div>
      </div>
  )
}
