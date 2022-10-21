import { Review } from "./review";

export class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    reviews : Array<Review>=[];

    constructor (id: number, name: string, quantity: number, description: string, price: number, image: string, reviews : Array<Review>) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
        
    }
}
