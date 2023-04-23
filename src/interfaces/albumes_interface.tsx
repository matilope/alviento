export interface Albumes_Data {
  additional_photographers: string,
  albumName: string,
  album_id: string,
  camera: string,
  currency: string,
  date: string,
  discount: string,
  event_location: string,
  images: Array<arrayImages>,
  images_resolution: string,
  minimum_to_buy: string,
  photographer_id: string,
  pk: string,
  sk: string,
  taxes_percentage: string,
  unit_price: string
}

export interface arrayImages {
  [index: number]: { paid: boolean; resolution: string; selected_for_download: boolean, url: string };
}