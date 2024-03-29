import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';

describe('ProductCardComponent', () => {

  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.productInfo = {
      id: 1,
      name: "Coat",
      quantity: 3,
      price: 60,
      description: "A nice coat",
      image: "string",
      reviews: []
    }

    fixture.detectChanges();
     
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display quantity error message if no error', () => {
    expect(component.quantityerror).toBe(false)
  });

  it('should not display cart error message if no error', () => {
    expect(component.cartquantityerror).toBe(false)
  });

  it('should not add a quantity more than current stock', () => {
    component.quantity = 5;
    component.addToCart({
      id: 1,
      name: "Coat",
      quantity: 3,
      price: 60,
      description: "A nice coat",
      image: "string",
      reviews: []
    })
    expect(component.quantityerror).toBe(true)
  });

  it('should not add a quantity to cart that supercedes quantity in stock', () => {
    component.quantity = 2;
    component.products = [
      {
        product: {
          id: 1,
          name: '',
          quantity: 0,
          price: 0,
          description: '',
          image: '',
          reviews: []
        },
        quantity: 2,
      },
    ];
    component.addToCart({
      id: 1,
      name: "Coat",
      quantity: 3,
      price: 60,
      description: "A nice coat",
      image: "string",
      reviews: []
    })
    expect(component.cartquantityerror).toBe(true)
  });

  it('should add new entry to cart', () => {
    component.quantity = 1;
    component.addToCart({
      id: 1,
      name: "Coat",
      quantity: 3,
      price: 60,
      description: "A nice coat",
      image: "string",
      reviews: []
    })
    expect(component.products[0]).toEqual({
      product: {
        id: 1,
        name: "Coat",
        quantity: 3,
        price: 60,
        description: "A nice coat",
        image: "string",
        reviews: []
      },
      quantity: 1,
    })
  });

  it('should add to existing entry in cart', () => {
    component.quantity = 2;
    component.products = [
      {
        product: {
          id: 1,
          name: "Coat",
          quantity: 3,
          price: 60,
          description: "A nice coat",
          image: "string",
          reviews: []
        },
        quantity: 1,
      },
    ];
    component.addToCart({
      id: 1,
      name: "Coat",
      quantity: 3,
      price: 60,
      description: "A nice coat",
      image: "string",
      reviews: []
    })
    expect(component.products[0]).toEqual({
      product: {
        id: 1,
        name: "Coat",
        quantity: 3,
        price: 60,
        description: "A nice coat",
        image: "string",
        reviews: []
      },
      quantity: 3,
    })
  });

  it('should not add review if message is empty', () => {
    component.newMessage="";
    component.addReview();
    expect(component.productInfo.reviews.length).toBe(0);
  });

  it('should add review', () => {
    component.newMessage="hi";
    component.newRating=2;
    component.addReview();
    expect(component.newMessage).toBe("");
    expect(component.newRating).toBe(1);
  });

  it('should sort High to low', () => {
    let reviews =[
     {id:2, rating: 1 , message:"hi"},
       {id:1, rating: 2 , message:"hoop"}
    ]
    expect(component.sortingHighToLow(reviews)).toEqual([
      {id:1, rating: 2 , message:"hoop"},
      {id:2, rating: 1 , message:"hi"}]
     );
  });

  it('should sort Low to High', () => {
    let reviews =[
     {id:2, rating: 2 , message:"hi"},
       {id:1, rating: 1 , message:"hoop"}
    ]
    expect(component.sortingLowToHigh(reviews)).toEqual([
      {id:1, rating: 1 , message:"hoop"},
      {id:2, rating: 2 , message:"hi"}]
     );
  });

  it('should get average rating', () => {
    component.getAverage
    let reviews =[
      {id:2, rating: 9 , message:"hi"},
        {id:1, rating: 1 , message:"hoop"}
    ]
    expect(component.getAverage(reviews)).toEqual(5)
  });


});
