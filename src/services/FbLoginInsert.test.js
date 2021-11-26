import mockAxios from "axios";
import FbLoginInsert from './FbLoginInsert';

jest.mock('axios');

describe('FbLoginInsert API Call()', () => {
  it('calls axios FbLoginInsert get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Fb login credentials inserted successfully" }
    })
  );
  FbLoginInsert(43, {email_id: 'test@gmail.com'});
  expect(await mockAxios.get).toBeCalled();
  });
});
