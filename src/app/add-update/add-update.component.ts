import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { AddUpdateServiceService } from '../services/add-update-service.service';
import { ProductService } from '../services/product.service';
import { ReviewServiceService } from '../services/review-service.service';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {

  constructor(private addupdateS : AddUpdateServiceService, 
    private pService : ProductService,
    private reviewService: ReviewServiceService) { }
  addProduct: boolean = true;
  
  //2-way data binded items for add menu
  addName : string ="";
  addQuantity : number =0;
  addDescription :string="";
  addPrice : number = 0;
  addImage :string ="";

  //error and success messages
  message :string ="";
  message2 :string="";
  message3 :string="";

  //List of products 
  productList : Array<Product> =[];


//2-way data binded items for update menu
  updateQuantity : number =0;
  updateDescription :string="";
  updatePrice : number = 0.00;
  updateImage :string ="";
  updateId: number=0;
  updateReviews : Array<Review>=[];

//checks if anything has been selected from update dropdown menu
selected:any;
//helps with filtering for the update dropdown menu
filtered :any;
//shows the product list of item selected
currentProduct : boolean =false;

selected2: any;
filtered2: any;
productsToDelete: boolean=false;
showReviews : boolean =false;
reviewList: Array<Review> =[];

selectedReview: any;
filterReview: any;
reviewId : number=-1;

  ngOnInit(): void {
    this.pService.getProducts().subscribe(data=>this.productList=data);
  }

 
/**
 * Adds new product with some input validation 
 */
addNewProduct(){
  this.message="";
  if(this.addName==""){
    this.message+="Item Name is required! ";
  }else if(this.productNameExists(this.addName)){
    this.message+="Item Name must be unique! ";
  }else if(this.addQuantity<=0){
    this.message+="Item Quantity must be greater than 0! ";
  }else if(this.addPrice<=0){
    this.message+="Item Price must be greater than 0! ";
  }else{
    if(this.addDescription===""){
      this.addDescription ="This is a product you can buy."
    }
    if(this.addImage===""){
      this.addImage ="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/2560px-Question_Mark.svg.png";
    }
    this.addupdateS.addNewProduct(this.addName,this.addQuantity,this.addDescription, this.addPrice,this.addImage);
    this.message=this.addName + " added!";
    this.addName="";
    this.addQuantity=0;
    this.addDescription="";
    this.addImage ="";
    this.addPrice=0;
    this.pService.getProducts().subscribe(data=>this.productList=data);
  }
}

/**
 * Checks if the name of the product exists in our current product array
 * @param name name of the product
 * @returns true if exists, false if it is unique
 */
productNameExists(name: string) : boolean{
for(let i =0; i< this.productList.length; i++){
  if(name==this.productList[i].name){
    return true;
  }
}return false;
}

/**
 * Updates the product and adds a message if an item is selected
 *  and the new price and quantity are greater than 0
 */
updateProduct(){
  this.message2="";
  if (this.selected!=undefined && this.updatePrice>=.01 && this.updateQuantity>0){
  this.addupdateS.editProduct(this.selected,this.updateId,this.updateQuantity, this.updateDescription,this.updatePrice, this.updateImage);
  this.message2=this.selected + " updated!";
  this.currentProduct=false;
  }
}


/**
 *Gets the selected item from the dropdown when it changes and 
 * updates the values in the input boxes
 */
getProductSelected(){
  this.message2="";
  this.filtered = this.productList.filter(t=>t =this.selected);
  for(let i=0; i< this.productList.length; i++){
      if(this.productList[i].name==this.selected){
        this.updateQuantity =this.productList[i].quantity;
        this.updateDescription =this.productList[i].description;
        this.updatePrice = this.productList[i].price;
        this.updateImage = this.productList[i].image;
        this.updateId=this.productList[i].id;
        this.updateReviews=this.productList[i].reviews;
      }
  }
  this.currentProduct=true; 
}
/**
 *Gets the selected product from the dropdown when it changes and
 * updates the Review list to be deleted
 */
getProductSelected2(){
  this.message3="";
  this.filtered2 = this.productList.filter(t=>t =this.selected2);
  for(let i=0; i< this.productList.length; i++){
    if(this.productList[i].name==this.selected2){
      this.reviewList=this.productList[i].reviews;
    }
}
  this.showReviews=true;
}
/**
 *Gets the selected reiviews from the dropdown 
 */
getReviewSelected(){
  this.message3="";
  this.filterReview=this.reviewList.filter(t=>t=this.selectedReview);
  for(let i =0 ; i< this.reviewList.length; i++){
    let str = this.reviewList[i].rating+"-"+this.reviewList[i].message;
    if(str.replace(/\s+/g, ' ').trim()==this.selectedReview.replace(/\s+/g, ' ').trim()){
      console.log(this.reviewList[i].id)
      this.reviewId=this.reviewList[i].id;
    }
  }
}

/**
 * Deletes a review when selected from the dropdown
 */
deleteReview(){
  this.message3="";
  if(this.reviewId!=-1 && this.getReviewSelected!=undefined){
    this.reviewService.deleteReview(this.reviewId);
    this.message3="Review Deleted";
    this.showReviews=false;
    this.reviewId=-1;
    this.pService.getProducts().subscribe(data=>this.productList=data);
    this.pService.getProducts().subscribe(data=>this.productList=data);
  }else{
    this.message3="Please select a review to delete"
  }
}
}
