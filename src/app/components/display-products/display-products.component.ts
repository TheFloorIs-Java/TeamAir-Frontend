import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];

  // backgroundColor: string="white";
  // color: string="black";

  constructor(private productService: ProductService) {}

  /**
   * This method gets the products after being initialized
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => {
        this.allProducts = resp;
        console.log(resp);
      },
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );
  }

  /**
   * This method gets the products to display on the page so that the content can be accessed from
   * the product-card component so that the reviews persist whenever the page is refreshed
   */
  reload() {
    this.productService.getProducts().subscribe(
      (resp) => {
        this.allProducts = resp;
        console.log(resp);
      },
      (err) => console.log(err),
      () => console.log('Products Retrieved')
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
