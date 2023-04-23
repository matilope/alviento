import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import './Galeria.css'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import AlvientoApi from 'api/Api';
import { Galeria_Data, Profile_Data } from 'interfaces/galeria_interface';

export default function Galeria() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const api = new AlvientoApi();
  const { id } = useParams();
  const [images_data, setImages] = useState<Galeria_Data>();
  const [profile_data, setProfile] = useState<Profile_Data>();


  useEffect(() => {
    (async () => {
      const response_images = await api.get(`/get-images?album_id=${id}`);
      setImages(response_images);
      const response_profile = await api.get(`/get-photographer-profile?album_id=${id}`);
      setProfile(response_profile);
    })();
  }, [id]);

  async function SelectImage(isSelected: any, album: any, url: any) {
    const myInit = {
      headers: {
        Authorization: await api.getAuth(),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        album_id: album,
        image_url: url
      }
    }
    // Llamar a la API /select-image
    if (isSelected) {
      let timerInterval: any;
      Swal.fire({
        title: 'Se ha añadido esta imagen para su descarga',
        html: 'Este mensaje se cierra solo',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      });

      return await api.post(`/select-image`, myInit);
      // Llamar a API POST /select-image
    }
    else {
      let timerInterval: any;
      Swal.fire({
        title: 'Se ha deseleccionado esta imagen de la descarga',
        html: 'Este mensaje se cierra solo',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      });

      return await api.delete(`/select-image`, myInit);
      // setImageSelected(selected_Images);
      // Llamar a API DELETE /select-image
    }
  }

  function srcset(image: any, size: any, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  function LightboxMagic() {

    useEffect(() => {
      const link = document.createElement("link");

      link.href = "http://localhost:3000/lightbox.min.css";

      link.rel = "stylesheet";

      document.head.appendChild(link);

      const jquery = document.createElement("script");

      jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";

      document.body.appendChild(jquery);

      const lightbox = document.createElement("script");

      lightbox.src = "http://localhost:3000/lightbox.min.js";

      document.body.appendChild(lightbox);

      // que el el div (con position relative) envuelva a la imagen, y el checbox tenga esto left: 98%; position: absolute; top: 97%;
      /* ASI DEBERIA QUEDAR para que el input quede pegado
      <div style="position: relative;">
      <img class="lb-image" src="https://xxxxx-images.s3.sa-east-1.amazonaws.com/img3.jpg" alt="" style="width: 1503px; height: 849px;">
      <input type="checkbox" style="left: 98%;position: absolute;top: 97%;">
      </div>
      */

    }, []);

  }

  LightboxMagic();

  if (!images_data && !profile_data) {
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
      <Container className='container-fixes'>
        <div className="row">
          <div className="col-md-7 switch">
            <ImageList
              sx={{ height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {[images_data]?.map((item: any, index: number) => (
                <ImageListItem className="height-fix" key={index} cols={2} rows={2} >
                  <a href={item.url} data-lightbox="roadtrip">
                    <img className="img-fancy" alt={item.albumName} {...srcset(item.images[0].url, 121, 2, 2)} loading="lazy" />
                  </a>
                  <Checkbox defaultChecked={item.images.selected_for_download} onChange={event => { SelectImage(event.target.checked, item.sk.split('#')[1], item?.url) }}  {...label} size="small" color="default" className='check-position' />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <div className="col-md-5 bg-light">
            <div className='center mt-3 mb-3'>
              <figure className='text-center'><img className="rounded-circle shadow-lg" width={140} height={140} alt="..." /></figure>
              <div className="mt-3 text-center">
                <h2>{profile_data?.name}</h2>
                <h3 className='h6 text-secondary'>Fotógrafo</h3>
                <p>{profile_data?.description}</p>
                <Link className='btn btn-primary' to={`/pagos/${images_data?.sk.split('#')[1]}`}>Descargar imagenes en HD</Link>
              </div>
            </div>
          </div>
        </div>
      </Container >
    </>
  );
}