export interface Galeria_Data {
    albumName: string,
    currency: string,
    current_checkout: { paid: boolean, price: string },
    discount: string,
    images: Array<arrayImages>,
    last_paymente: { amount: string, currency: string, images_paid: string, payment_date: string },
    paid: boolean,
    photographer_id: string,
    pk: string,
    sk: string,
    taxes_percentage: string,
    unit_price: string
}

export interface arrayImages {
    [index: number]: { paid: boolean; resolution: string; selected_for_download: boolean, url: string };
}

export interface Profile_Data {
    description: string,
    name: string,
    pk: string,
    sk: string
}