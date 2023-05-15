import { Shop } from "./Shop.interface";

export interface Product {
    idPorduct:   number;
    nameProduct: string;
    codigo:      string;
    descripcion: string;
    urlImage?:    string;
    image?:       string;
    price:       number;
    stock:       number;
    shopId:      number;
    shop?: Shop
}
