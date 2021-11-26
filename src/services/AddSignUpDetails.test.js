import mockAxios from "axios";
import AddSignUpDetails from './AddSignUpDetails';

jest.mock('axios');

describe('AddSignUpDetails API Call()', () => {
  it('calls axios AddSignUpDetails put method`', async() => {
    mockAxios.put.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Sign Up Successful" }
    })
  );
  AddSignUpDetails({id: 43});
  expect(await mockAxios.put).toBeCalled();
  });
});
