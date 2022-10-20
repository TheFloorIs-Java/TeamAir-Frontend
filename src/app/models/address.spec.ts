import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
     expect(new Address("string", "string","string","string", "string",
     "string","string","string")).toBeTruthy();
  });
});
