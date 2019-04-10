import axios from 'axios'
export async function signIn(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/authenticate'
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
        callback()
      })
      .catch(error => {
        reject(error)
        return error
      })
  })
}

export function signUp(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/register'
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        console.log(response)
        callback()
      })
      .catch(error => {
        return error
      })
  })
}