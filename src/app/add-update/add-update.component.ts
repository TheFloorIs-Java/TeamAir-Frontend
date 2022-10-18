import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AddUpdateServiceService } from '../services/add-update-service.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {

  constructor(private addupdateS : AddUpdateServiceService, private pService : ProductService) { }
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

  //List of products 
  productList : Array<Product> =[];


//2-way data binded items for update menu
  updateQuantity : number =0;
  updateDescription :string="";
  updatePrice : number = 0.00;
  updateImage :string ="";
  updateId: number=0;

  //checks if anything has been selected from update dropdown menu
  selected:any;
  //helps with filtering for the update dropdown menu
  filtered :any;
//shows the product list of item selected
currentProduct : boolean =false;

  ngOnInit(): void {
    this.pService.getProducts().subscribe(data=>this.productList=data);
  }

 
//adds new product with some input validation 
addNewProduct(){
  this.message="";
  if(this.addName==""){
    this.message+="Item Name is required! ";
  }else if(this.addQuantity<=0){
    this.message+="Item Quantity must be greater than 0! ";
  }else if(this.addPrice<=0){
    this.message+="Item Quantity must be greater than 0! ";
  }else{
    if(this.addDescription===""){
      this.addDescription ="This is a product you can buy."
    }
    if(this.addImage===""){
      this.addImage ="https://static.vecteezy.com/system/resources/previews/001/195/306/original/bubbles-speech-cool-png.png";
    }
    this.addupdateS.addNewProduct(this.addName,this.addQuantity,this.addDescription, this.addPrice,this.addImage);
    this.message=this.addName + " added!";
  }
}

//updates the product and adds a message
updateProduct(){
  this.message2="";
  console.log(this.selected)
  if (this.selected!=undefined){
  this.addupdateS.editProduct(this.selected,this.updateId,this.updateQuantity, this.updateDescription,this.updatePrice, this.updateImage);
  this.message2=this.selected + " updated!";
  }
}

//gets the selected item from the dropdown when it changes and updates the values
// in the input boxes
getProductSelected(){
  this.filtered = this.productList.filter(t=>t =this.selected);
  for(let i=0; i< this.productList.length; i++){
      if(this.productList[i].name==this.selected){
        this.updateQuantity =this.productList[i].quantity;
        this.updateDescription =this.productList[i].description;
        this.updatePrice = this.productList[i].price;
        this.updateImage = this.productList[i].image;
        this.updateId=this.productList[i].id;
      }
  }
  this.currentProduct=true; 
}
}
