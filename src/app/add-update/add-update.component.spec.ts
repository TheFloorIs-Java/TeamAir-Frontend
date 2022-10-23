import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUpdateComponent } from './add-update.component';

describe('AddUpdateComponent', () => {
  let component: AddUpdateComponent;
  let fixture: ComponentFixture<AddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not display input boxes when an item is not chosen', () => {
    expect(component.currentProduct)
    .toBe(false)
  });
  it('should not have product in our product list without name',() =>{
    expect(component.productNameExists(""))
    .toBe(false)
  });
  it('should not add product without name',() =>{
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Name is required! ")
  });
  it('should not add product without quantity',() =>{
    component.addName="name"
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Quantity must be greater than 0! ")
  });
  it('should not add product with quantity less than or equal to 0',() =>{
    component.addName="name"
    component.addQuantity=0;
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Quantity must be greater than 0! ")
  });
  it('should not add product with price less than or equal to 0',() =>{
    component.addName="name"
    component.addQuantity=2;
    component.addPrice=0;
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Price must be greater than 0! ")
  });
  it('should not add product without price',() =>{
    component.addName="name"
    component.addQuantity=1;
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Price must be greater than 0! ")
  });
  it('should not add product that already exists',() =>{
    component.productList=[{id:1, name: "name", quantity:1, price:1, 
    description: "something", image: "image" , reviews:[]}];
    component.addName="name"
    component.addNewProduct()
    expect(component.message)
    .toBe("Item Name must be unique! ")
  });
  it('should be able to add a product',() =>{
    component.addName="name"
    component.addQuantity=2;
    component.addPrice=1;
    component.addNewProduct()
    expect(component.message)
    .toBe("name added!")
  });
  it('should not update a product if a product is not selected',() =>{
    component.selected=undefined;
    component.updateProduct()
    expect(component.message2)
    .toBe("")
  });
  it('should not update a product if new price is less than or equal to 0',() =>{
    component.selected=undefined;
    component.updatePrice=-1;
    component.updateProduct()
    expect(component.message2)
    .toBe("")
  });
  it('should not update a product if new quanity is less than or equal to 0',() =>{
    component.selected=undefined;
    component.updateQuantity=-1;
    component.updateProduct()
    expect(component.message2)
    .toBe("")
  });
  it('should be able to update a product',() =>{
    component.selected="name";
    component.updateQuantity=1;
    component.updatePrice=1;
    component.updateProduct()
    expect(component.message2)
    .toBe("name updated!")
  });
  it('should be able to delete a product',() =>{
    component.selected2="name";
    component.productIdToDelete=1;
    component.deleteProduct()
    expect(component.message3)
    .toBe("name deleted!")
  });
  it('should not delete a product when product is not selected',() =>{
    component.deleteProduct()
    expect(component.message3)
    .toBe("Please select a product")
  });

  
  
  

});
