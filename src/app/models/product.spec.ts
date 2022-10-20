import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
     expect(new Product(1,"string",1,"string",1,"string")).toBeTruthy();
  });
});
