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

  quantity: number = 0;
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  quantityerror: boolean = false;
  cartquantityerror: boolean = false;

  @Input() productInfo!: Product;


  @Output()
  reloadReviews : EventEmitter<any> =new EventEmitter<any>();

  currentReviewList: Array<number>=[];
  newRating :number=1;
  newMessage : string="";
   addReviewButton : boolean=false;
   reviewColor: string = "Reviews";
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
  
  addToCart(product: Product): void {

    //addto cart will only run under three conditions...
    // 1. The quantity added is greater than zero
    // 2. The quantity added is less than or equal to the current inventory of the product
    // 3. The quantity added does not make the product's quantity in the cart exceed the product's inventory

    if (this.quantity > 0) {
      if (this.quantity <= this.productInfo.quantity) {
        this.quantityerror = false;
        this.cartquantityerror = false;
        let inCart = false;

        //This code checks to see if there is an entry for the current product by product id in the cart
        //If there is a current entry for the product, it will add to the current entry rather than make a new entry
        this.products.forEach(
          (element) => {
            console.log(element.quantity + this.quantity > this.productInfo.quantity);
            if (element.product.id == product.id) {
              inCart = true;
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
        //Because inCart is false, there is not an entry with our product in the cart, so this code runs to create a new entry by using push
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
        this.quantityerror = true;
      }

    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addReview(){
    if(this.newMessage!=""){
      this.reviewService.addNewReview(this.productInfo.id,this.newRating, this.newMessage);
      this.newMessage="";
      this.newRating=1;
    }   
    this.reloadReviews.emit();
    this.reloadReviews.emit();
    
  }
viewReviews(){
  this.addReviewButton=!this.addReviewButton;
}

getAverage(reviews: Array<Review> ): number{
  let avg=0;
  for(let i =0; i< reviews.length; i++){
    avg+=reviews[i].rating
  }
  if(reviews.length>0){
    avg=avg/reviews.length;
  }
  return avg;
}

changeColorOfReview(avg : number): string{
  if(avg<=10 && avg>=8){
    return "Reviews";
  }else if (avg<=7 && avg>=5){
    return "Reviews2";
  }else{
    return "Reviews3";
  }
}

}
