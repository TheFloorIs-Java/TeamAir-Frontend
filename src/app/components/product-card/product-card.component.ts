import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from 'src/app/services/product.service';
import { ReviewServiceService } from 'src/app/services/review-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  //booleans that determine error messages on page
  quantityerror: boolean = false;
  cartquantityerror: boolean = false;

  //2-way data binded value for quantity added
  quantity: number = 0;

  cartCount!: number;

  //Represents the current cart
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;



  @Input() productInfo!: Product;


  @Output()
  reloadReviews: EventEmitter<any> = new EventEmitter<any>();

  currentReviewList: Array<number>=[];
  newRating :number=1;
  newMessage : string="";
  addReviewButton : boolean=false;
  reviewColor: string = "Reviews";

  highToLowClicked: boolean=false;
  lowToHighClicked: boolean=false;


  constructor(private productService: ProductService, private reviewService : ReviewServiceService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );

  }

  /**
   * Adds product to cart
   * @param product Product to be added to cart
   */

  addToCart(product: Product): void {

    //addto cart will only run under three conditions...

    //check if the quantity to be added is non negative
    if (this.quantity > 0) {
      //check if the quantity to be added is not larger than the current stock
      if (this.quantity <= this.productInfo.quantity) {
        this.quantityerror = false;
        this.cartquantityerror = false;
        let inCart = false;

        //This code checks to see if there is an entry for the current product by product id in the cart
        //If there is a current entry for the product, it will add to the current entry rather than make a new entry
        this.products.forEach(
          (element) => {
            console.log(element.quantity + this.quantity > this.productInfo.quantity);
            //checks to see if the current item is in the cart or not
            if (element.product.id == product.id) {
              inCart = true;
              //checks to see if the quantity to be added will be more than current stock
              if (!(element.quantity + this.quantity > this.productInfo.quantity)) {
                element.quantity = element.quantity + this.quantity;
                let cart = {
                  cartCount: this.cartCount + this.quantity,
                  products: this.products,
                  totalPrice: this.totalPrice + product.price * this.quantity
                };
                this.productService.setCart(cart);
                return;
              } else {
                //return error
                this.cartquantityerror = true;
              }

            };
          }
        );

        //This code uses inCart to determine whether or not the product we are looking at is currently in the cart
        //If inCart is false, there is not an entry with our product in the cart, so this code runs to create a new entry by using push
        if (inCart == false) {
          let newProduct = {
            product: product,
            quantity: this.quantity
          };
          this.products.push(newProduct);
          let cart = {
            cartCount: this.cartCount + this.quantity,
            products: this.products,
            totalPrice: this.totalPrice + product.price * this.quantity
          }
          this.productService.setCart(cart);
        }
      } else {
        //displays an error message
        this.quantityerror = true;
      }

    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addReview() {
    if (this.newMessage != "") {
      this.reviewService.addNewReview(this.productInfo.id, this.newRating, this.newMessage);
      this.newMessage = "";
      this.newRating = 1;
    }
    this.reloadReviews.emit();
    this.reloadReviews.emit();

  }
  viewReviews() {
    this.addReviewButton = !this.addReviewButton;
  }

  getAverage(reviews: Array<Review>): number {
    let avg = 0;
    for (let i = 0; i < reviews.length; i++) {
      avg += reviews[i].rating
    }
    if (reviews.length > 0) {
      avg = avg / reviews.length;
    }
    return avg;
  }

  changeColorOfReview(avg: number): string {
    if (avg <= 10 && avg >= 8) {
      return "Reviews";
    } else if (avg <= 7 && avg >= 5) {
      return "Reviews2";
    } else {
      return "Reviews3";
    }
  }

compareLowToHigh(a:Review,  b:Review): number{
  if(a.rating<b.rating){
    return -1;
  }else if(a.rating>b.rating){
    return 1;
  }
return 0;
}
compareHighToLow(a:Review,  b:Review): number{
  if(a.rating<b.rating){
    return 1;
  }else if(a.rating>b.rating){
    return -1;
  }
return 0;
}
sortingLowToHigh(reviews : Array<Review>):Array<Review>{
  reviews.sort(this.compareLowToHigh);
  console.log(reviews);
  return reviews;
}
sortingHighToLow(reviews : Array<Review>):Array<Review>{
  reviews.sort(this.compareHighToLow);
  console.log(reviews);
  return reviews;
}


}
