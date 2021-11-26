import mockAxios from "axios";
import CheckoutCart from './CheckoutCart';

jest.mock('axios');

describe('CheckoutCart API Call()', () => {
  it('calls axios CheckoutCart get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Checkout Successful" }
    })
  );
  CheckoutCart(43, [{item_id: 1}]);
  expect(await mockAxios.get).toBeCalled();
  });
});
