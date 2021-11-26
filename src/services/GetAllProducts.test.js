import mockAxios from "axios";
import GetAllProducts from './GetAllProducts';

jest.mock('axios');

describe('GetAllProducts API Call()', () => {
  it('calls axios GetAllProducts get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "All products received" }
    })
  );
  GetAllProducts();
  expect(await mockAxios.get).toBeCalled();
  });
});
