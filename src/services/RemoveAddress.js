import axios from 'axios'

const RemoveAddress = (addressId) => {
  return new Promise((resolve, reject) => {
    axios.delete('https://u1nc11pop8.execute-api.us-east-2.amazonaws.com/dev/deleteaddress?address_id=' + addressId)
      .then(function (res) {
        resolve(true)
      }).catch(function (err) {
        reject(err)
      })
  })
}
export default RemoveAddress