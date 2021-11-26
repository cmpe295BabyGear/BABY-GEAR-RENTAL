import mockAxios from "axios";
import GetCartDetails from './GetCartDetails';

jest.mock('axios');

describe('GetCartDetails API Call()', () => {
  it('calls axios GetCartDetails get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Cart details received successfully" }
    })
  );
  GetCartDetails({customer_id: 43});
  expect(await mockAxios.get).toBeCalled();
  });
});
