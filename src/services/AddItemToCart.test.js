import mockAxios from "axios";
import AddItemToCart from './AddItemToCart';

jest.mock('axios');

describe('AddItemToCart API Call()', () => {
  it('calls axios AddItemToCart put method`', async() => {
    mockAxios.put.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Item added to cart" }
    })
  );
  AddItemToCart(10);
  expect(await mockAxios.put).toBeCalled();
  });
});
