import axios from 'axios'
export async function signIn(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/authenticate'
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        callback(response)
      })
      .catch(error => {
        return error
      })
  })
}

export function signUp(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/register'
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        callback(response)
      })
      .catch(error => {
        callback(error)
      })
  })
}


// Make a request for a user with a given token
export function createWorkshop(data) {
  const token = localStorage.getItem('BTToken')
  axios.request({
    url: 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/create',
    method: 'post',
    data,
    headers: {
      'Authorization':
        'Bearer ' + token
    }
  })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export function uploadImage(data, callback) {
  console.log(data)
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/avatar'
  axios.put(url, data)
    .then(response => {
      callback(response)
    })
    .catch(error => {
      callback(error)
    })
}
