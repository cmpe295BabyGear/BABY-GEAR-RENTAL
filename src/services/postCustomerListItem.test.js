import mockAxios from "axios";
import PostCustomerListItem from './PostCustomerListItem';

jest.mock('axios');

describe('PostCustomerListItem API Call()', () => {
  it('calls axios PostCustomerListItem post method`', async() => {
    mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Item added to cart" }
    })
  );
  PostCustomerListItem({customer_id: 43, item_id: 10, quantity: 1});
  expect(await mockAxios.post).toBeCalled();
  });
});
