import React, { useState, useEffect } from 'react';
import 'App.css';
import './Pagos.css';

import AlvientoApi from 'api/Api';
import { useParams } from "react-router-dom";
import { Pagos_Data } from 'interfaces/pagos_interface';


export default function Pagos() {

  const api = new AlvientoApi();
  const { id } = useParams();
  const [pagos, setPagos] = useState<Pagos_Data>();

  useEffect(() => {
    (async () => {
      const response = await api.get(`/get-payment-data?album_id=${id}`);
      setPagos(response);
      console.log(response)
    })();
  }, [id]);

  return (
    <section className="page payment-page payment-form dark pagos-padding">
      <div className="container">
        <div className="block-heading">
          <h2>Payment</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
        </div>
        <form>
          <div className="products">
            <h3 className="title">Checkout</h3>
            <div className="item">
              <span className="price">{pagos?.images_count}</span>
              <p className="item-name">Cantidad de imagenes</p>
              <p className="item-description">Numero de imagenes seleccionadas para su descarga</p>
            </div>
            <div className="item">
              <span className="price">${pagos?.unit_price}</span>
              <p className="item-name">Precio por imagen</p>
              <p className="item-description">Valor de cada imagen</p>
            </div>
            <div className="item">
              <span className="price">{pagos?.currency}</span>
              <p className="item-name">Tipo de moneda</p>
              <p className="item-description">Moneda a utilizarse en la compra</p>
            </div>
            <div className="item">
              <span className="price">{pagos?.discount}</span>
              <p className="item-name">Descuento</p>
              <p className="item-description">Porcentaje o valor de descuento</p>
            </div>
            <div className="item">
              <span className="price">{pagos?.taxes_percentage}%</span>
              <p className="item-name">Porcentaje de impuesto</p>
              <p className="item-description">Impuesto establecido en la compra</p>
            </div>
            <div className="total">Total<span className="price">${pagos?.total}</span></div>
          </div>
          <div className="card-details">
            <h3 className="title">Credit Card Details</h3>
            <div className="row">
              <div className="form-group col-sm-7">
                <label htmlFor="card-holder">Card Holder</label>
                <input id="card-holder" type="text" className="form-control" placeholder="Card Holder" aria-label="Card Holder" />
              </div>
              <div className="form-group col-sm-5">
                <label htmlFor="">Expiration Date</label>
                <div className="input-group expiration-date">
                  <input type="text" className="form-control" placeholder="MM" aria-label="MM" />
                  <span className="date-separator ps-2">/</span>
                  <input type="text" className="form-control" placeholder="YY" aria-label="YY" />
                </div>
              </div>
              <div className="form-group pt-3 col-sm-8">
                <label htmlFor="card-number">Card Number</label>
                <input id="card-number" type="text" className="form-control" placeholder="Card Number" aria-label="Card Holder" />
              </div>
              <div className="form-group pt-3 col-sm-4">
                <label htmlFor="cvc">CVC</label>
                <input id="cvc" type="text" className="form-control" placeholder="CVC" aria-label="Card Holder" />
              </div>
              <div className="form-group col-sm-12">
                <button type="button" className="btn btn-primary btn-block px-4">Proceed</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
