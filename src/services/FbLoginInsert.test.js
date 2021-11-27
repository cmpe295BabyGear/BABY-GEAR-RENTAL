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
  FbLoginInsert({email_id: 'test@gmail.com', last_name: 'test last name'});
  expect(await mockAxios.get).toBeCalled();
  });
});
