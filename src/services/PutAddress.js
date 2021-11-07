import axios from 'axios'

const PutAddress = (event) => {
  return new Promise((resolve, reject) => {
    axios.post(' https://bpfk8gl3n0.execute-api.us-east-2.amazonaws.com/dev/addcustomeraddress', event)
      .then(function (res) {
        resolve(true)
      }).catch(function (err) {
        reject(err)
      })
  });
}
export default PutAddress;