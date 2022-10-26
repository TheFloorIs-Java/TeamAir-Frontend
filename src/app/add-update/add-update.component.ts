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
  addDescription :string="This is a product you can buy.";
  addPrice : number = 0;
  addImage :string ="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/2560px-Question_Mark.svg.png";

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

//checks if anything has been selected from delete dropdown menu
selected2: any;
//helps with filtering for the delete dropdown menu
filtered2: any;
//shows the product list of item selected
productsToDelete: boolean=false;

//2-way data binded items for delete product visualization
productIdToDelete: number = -1;
deleteProductShow : boolean=false;
deleteDescription : string="";
deleteImage: string ="";
deleteReview : Array<Review>=[];
deletePrice : number=0;
deleteQuantity : number=0;

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
    this.pService.getProducts().subscribe(data=>this.productList=data);
    this.pService.getProducts().subscribe(data=>this.productList=data);
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
  this.pService.getProducts().subscribe(data=>this.productList=data);
  this.pService.getProducts().subscribe(data=>this.productList=data);
  this.pService.getProducts().subscribe(data=>this.productList=data);
  }else{
    this.message2="Please select a product"
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
 * updates what the deleted product views
 */
getProductSelected2(){
  this.message3="";
  this.filtered2 = this.productList.filter(t=>t =this.selected2);
  for(let i=0; i< this.productList.length; i++){
    if(this.productList[i].name==this.selected2){
      this.productIdToDelete=this.productList[i].id;
      this.deleteImage=this.productList[i].image;
      this.deletePrice=this.productList[i].price;
      this.deleteQuantity=this.productList[i].quantity;
      this.deleteDescription=this.productList[i].description;
      this.deleteReview=this.productList[i].reviews;
    }
    this.deleteProductShow=true;
  }
}
/**
 * Deletes the product if the product was selected and updates the list
 */
deleteProduct(){
  if(this.productIdToDelete!=-1 && this.selected2!=undefined){
    this.addupdateS.deleteProduct(this.productIdToDelete);
    this.productIdToDelete=-1;
    this.deleteProductShow=false;
    this.pService.getProducts().subscribe(data=>this.productList=data);
    this.pService.getProducts().subscribe(data=>this.productList=data);
    this.pService.getProducts().subscribe(data=>this.productList=data);
    this.message3=this.selected2+" deleted!";
  }else{
    this.message3="Please select a product";
  }
}





}