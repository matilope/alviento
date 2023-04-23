import React, { useMemo, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuItem from '@mui/material/MenuItem';
import { useDropzone } from 'react-dropzone';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Form.css';
import AlvientoApi from 'api/Api';
import { Storage } from 'aws-amplify';
import Swal from 'sweetalert2';
import { Form_Data } from 'interfaces/form_interface';
import { FileList } from 'interfaces/form_interface';


type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  client_id: "",
  photographer_email: "",
  photographer_desc: "",
  photographer_name: "",
  album_id: "",
  unit_price: 1,
  images_resolution: "",
  event_location: "",
  date: "",
  camera: "",
  discount: 1,
  currency: "",
  taxes_percentage: 21,
  minimum_to_buy: 10,
  additional_photographers: ""
};

export default function Form() {

  const api = new AlvientoApi();

  const currencies = [
    {
      value: 'QHD',
      label: '3840x2160',
    },
    {
      value: 'FHD',
      label: '1920x1080'
    },
    {
      value: 'HD',
      label: '1280x720',
    },
    {
      value: 'SD',
      label: '640x480',
    },
  ];

  const [datos, setDatos] = useState<Form_Data>(inititalState);

  async function handleData({ target: { name, value } }: HandleInputChange) {
    setDatos({ ...datos, [name]: value });
  }

  const [fileselected, setFileSelected]: any = useState();

  async function OnChange({ target: { files } }: any) {
    let file = files[0];
    setFileSelected(file);
  }

  const [filesSelected, setFilesSelected]: any = useState();

  async function OnChangeMultiple({ target: { files } }: any) {
    console.log({ target: { files } })
    setFilesSelected(files);
  }

  async function EnviarDatos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const myInit = {
      headers: {
        Authorization: await api.getAuth()
      },
      body: {
        client_id: "860da87d-0c92-4087-8ee3-15297320db53",
        photographer_name: datos.photographer_name,
        photographer_email: datos.photographer_email,
        photographer_desc: datos.photographer_desc,
        album_id: datos.album_id,
        unit_price: datos.unit_price,
        images_resolution: datos.images_resolution,
        event_location: datos.event_location,
        date: datos.date,
        camera: datos.camera,
        discount: datos.discount,
        currency: datos.currency,
        taxes_percentage: "21",
        minimum_to_buy: datos.minimum_to_buy,
        additional_photographers: datos.additional_photographers
      }
    }
    try {
      await Storage.put(fileselected.name, fileselected, {
        contentType: "image/*", // contentType is optional
        level: "protected"
      });
    } catch (error) {
      console.log("Error uploading files: ", error);
    }
    for (let i = 0; i < filesSelected.length; i++) {
      try {
        await Storage.put(filesSelected[i].name, filesSelected[i], {
          contentType: "image/*", // contentType is optional
          level: "protected"
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Se ha subido la imagen numero ${i}/${filesSelected.length - 1}, espere a que se terminen de subir`,
          showConfirmButton: false,
          timer: 5000
        })
        if (i === (filesSelected.length - 1)) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sus imagenes se han subido correctamente',
            showConfirmButton: true
          })
        }
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Sus imagenes no se han subido, por favor refresque la pagina e intentelo de nuevo',
          showConfirmButton: true
        })
        console.log("Error uploading files: ", error);
      }
    }
    return await api.post(`/post-form?`, myInit);
  }


  const currenciess = [
    {
      value: 'percent',
      label: '%',
    },
    {
      value: 'per picture',
      label: '$'
    },
  ];
  

  return (
    <section className='container-lg py-5 ancho' >
      <h1 className="center mb-5">Formulario para fotógrafos Alviento</h1>
      <Box className='center shadow-lg padding-form'>
        <form onSubmit={(e) => EnviarDatos(e)} className="form-width">
          <div className="row my-3">
            <h2 className='h5 my-4'>Informacion del fotógrafo</h2>
            <div className="col-sm-6 mb-3">
              <TextField
                id="outlined-textarea"
                label="Name"
                multiline
                fullWidth
                name="photographer_name"
                onChange={(e) => handleData(e)} value={datos.photographer_name}
              />
            </div>
            <div className="col-sm-6">
              <TextField
                id="outlined-textarea"
                label="Email"
                multiline
                fullWidth
                name="photographer_email"
                onChange={(e) => handleData(e)} value={datos.photographer_email}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                fullWidth
                rows={4}
                name="photographer_desc"
                onChange={(e) => handleData(e)} value={datos.photographer_desc}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <TextField
                id="outlined-multiline-static"
                label="Additional photographers"
                multiline
                fullWidth
                rows={4}
                name="additional_photographers"
                onChange={(e) => handleData(e)} value={datos.additional_photographers}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <div className='center'>
                <input className="form-control inputfilemargin" id="photographer_picture" type="file" onChange={OnChange} name="photographer_picture" />
              </div>
            </div>
          </div>
          <div className='row my-3 justify-content-center'>
            <h2 className='h5 mb-5 mt-4 '>Informacion del evento</h2>
            <div className='col-12 col-sm-6 mb-4'>
              <TextField
                id="outlined-textarea"
                label="Album's name / Event"
                multiline
                fullWidth
                name="album_id"
                onChange={(e) => handleData(e)} value={datos.album_id}
              />
            </div>
            <div className='col-12 col-sm-6'>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-amount" required>Amount per picture</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={datos.unit_price}
                  onChange={(e) => handleData(e)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount per picture"
                  type='number'
                  name="unit_price"
                />
              </FormControl>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col mt-2">
              <TextField
                id="outlined-select-currency"
                select
                label="Select picture definition"
                value={datos.images_resolution}
                onChange={(e) => handleData(e)}
                helperText="Please select picture definition"
                fullWidth
                name="images_resolution"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row mt-3">
              <div className='col'>
                <div className='center'>
                  <input className="form-control inputfilemargin" id="images" type="file" multiple onChange={OnChangeMultiple} name="images" />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label className='h5 mb-4'>Lugar geográfico</label>
            <div className="col">
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }} className="googlemaps-search"
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  name="event_location"
                  onChange={(e) => handleData(e)} value={datos.event_location}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </div>
            <div className="col padding-date">
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="date"
                  onChange={(e) => handleData(e)} value={datos.date}
                />
              </Stack>
            </div>
          </div>
          <div className="row pb-4">
            <div className='col-sm-12 col-md-6 padding-cameratype'>
              <TextField
                id="outlined-required"
                label="Please enter camera type"
                fullWidth
                name="camera"
                onChange={(e) => handleData(e)} value={datos.camera}
              />
            </div>
            <div className="col-7 col-md-3">
              <TextField
                type="number"
                id="outlined-required"
                label="Discount amount"
                fullWidth
                name="discount"
                onChange={(e) => handleData(e)} value={datos.discount}
              />
            </div>
            <div className='col-5 col-md-3'>
              <TextField
                id="outlined-select-currency"
                select
                label="Discounts type"
                value={datos.currency}
                onChange={(e) => handleData(e)}
                helperText="Enter discounts type"
                fullWidth
                name="currency"
              >
                {currenciess.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-6">
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-amount">Taxes</InputLabel>
                <OutlinedInput
                  type="number"
                  id="outlined-adornment-amount"
                  value="21"
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  label="Taxes"
                  disabled
                  name="taxes_percentage"
                />
              </FormControl>
            </div>
            <div className="col-6">
              <TextField
                type="number"
                id="outlined-textarea"
                label="Minimum of pictures"
                fullWidth
                name="minimum_to_buy"
                onChange={(e) => handleData(e)} value={datos.minimum_to_buy}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <Button type="submit" variant="contained" className="button-form col-4">Enviar</Button>
          </div>
        </form>
      </Box>
    </section>
  );
}