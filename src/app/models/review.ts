export class Review {
    id : number;
    rating: number;
    message : string;
    constructor(id:number, rating:number, message:string){
        this.id=id;
        this.rating=rating;
        this.message=message;
    }
}