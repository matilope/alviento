export interface Form_Data {
  client_id: string,
  photographer_email: string,
  photographer_desc: string,
  photographer_name: string,
  album_id: string,
  unit_price: number,
  images_resolution: string
  event_location: string
  date: string,
  camera: string
  discount: number,
  currency: string,
  taxes_percentage: number
  minimum_to_buy: number,
  additional_photographers: string
}

export interface Files_Data {
  target: {
    files: FileList
  }
}

export interface FileList {
  [key: string]: {
    lastModified: number,
    lastModifiedDate: Date,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string
  }
}