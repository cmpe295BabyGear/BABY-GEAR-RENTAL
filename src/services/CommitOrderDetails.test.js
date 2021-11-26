import mockAxios from "axios";
import CommitOrderDetails from './CommitOrderDetails';

jest.mock('axios');

describe('CommitOrderDetails API Call()', () => {
  it('calls axios CommitOrderDetails post method`', async() => {
    mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Orders posted successfully" }
    })
  );
  CommitOrderDetails({cust_id: 43});
  expect(await mockAxios.post).toBeCalled();
  });
});
