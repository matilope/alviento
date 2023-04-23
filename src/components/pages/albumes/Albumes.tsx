import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'App.css';
import './Albumes.css';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import '@aws-amplify/ui-react/styles.css';
import AlvientoApi from 'api/Api';
import { Albumes_Data } from 'interfaces/albumes_interface';


export default function Albumes() {

  const api = new AlvientoApi();

  const [albumes, setAlbumes] = useState<Albumes_Data>();

  useEffect(() => {
    (async () => {
      const response = await api.get('/get-albums');
      setAlbumes(response);
    })();
  }, []);

  let resultado;
  if (Array.isArray(albumes)) {
    resultado = albumes.map((e) => {
      return e;
    });
  }

  if (!resultado) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '40vh' }}
        >
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </Grid>
      </>
    )
  }


  return (
    <>
      <section id='gallery' className='album bg-light'>
        <div className="container py-5">
          <div className='text-center uppercase pb-4'>
            <h2>Albumes</h2>
            <p>Lorem</p>
          </div>
          <div className="row g-3 justify-content-center">
            {resultado?.map((item: any, index: number) => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                  <div className="card shadow">
                    <img src={item.images[0]?.url} className="card-img-top corrector-imagen" width={100} height={225} alt={`Portrait image of ${item.albumName} album`}></img>
                    <div className="card-body">
                      <h5 className="card-title">{item.albumName}</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <Link to={`/galeria/${item.sk.split('#')[1]}`} className="btn btn-primary" >View album</Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};