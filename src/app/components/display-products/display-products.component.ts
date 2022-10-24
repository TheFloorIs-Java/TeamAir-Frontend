import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];

  // backgroundColor: string="white";
  // color: string="black";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => {this.allProducts = resp; console.log(resp)},
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

  reload(){
    this.productService.getProducts().subscribe(
      (resp) => {this.allProducts = resp; console.log(resp)},
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }
  // changeStyle(){
  //   if(this.backgroundColor=="white"){
  //   this.backgroundColor="black";
  //   this.color="white";
  //   }else{
  //     this.backgroundColor="white";
  //     this.color="black";
  //   }
  // }
}
