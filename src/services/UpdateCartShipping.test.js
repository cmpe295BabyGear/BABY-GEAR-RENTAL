import mockAxios from "axios";
import UpdateCartShipping from './UpdateCartShipping';

jest.mock('axios');

describe('UpdateCartShipping API Call()', () => {
  it('calls axios UpdateCartShipping put method`', async() => {
    mockAxios.put.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Item added to cart" }
    })
  );
  UpdateCartShipping({customer_id: 43, shipping_option: 1});
  expect(await mockAxios.put).toBeCalled();
  });
});
