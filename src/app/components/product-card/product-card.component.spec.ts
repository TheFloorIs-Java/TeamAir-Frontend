import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCardComponent } from './product-card.component';
import { compileComponentFromMetadata } from '@angular/compiler';


describe('ProductCardComponent', () => {
  let component : ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      declarations: [ ProductCardComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
     fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
   component.productInfo= {id:1, name: 'name', quantity:1, price:1, 
    description: 'something', image: 'image' , reviews:[]}
    fixture.detectChanges();
     
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });


});
