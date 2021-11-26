import mockAxios from "axios";
import GetCustomerAddresses from './GetCustomerAddresses';

jest.mock('axios');

describe('GetCustomerAddresses API Call()', () => {
  it('calls axios GetCustomerAddresses get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Customer addresses received successfully" }
    })
  );
  GetCustomerAddresses({customer_id: 43});
  expect(await mockAxios.get).toBeCalled();
  });
});
