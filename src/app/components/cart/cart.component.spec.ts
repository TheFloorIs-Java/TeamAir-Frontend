import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { Product } from 'src/app/models/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      // providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should empty the cart', () => {
    component.cartCounts = 5;
    component.emptyCart();
    expect(component.cartCounts).toBe(0);
  });
  it('should remove an item from cart', () => {
    component.totalPrice = 105;
    component.cartCounts = 3;
    component.products = [
      {
        product: {
          id: 1,
          name: 'Coat',
          quantity: 3,
          price: 40,
          description: 'A nice winter coat',
          image: 'blah',
          reviews: [],
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: 'Sunglasses',
          quantity: 2,
          price: 25,
          description: 'A cool sunglass',
          image: 'blah',
          reviews: [],
        },
        quantity: 1,
      },
    ];
    component.removeItemsFromService(1);
    expect(component.cartCounts).toBe(1);
    expect(component.totalPrice).toBe(25);
  });
});
