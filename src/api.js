import axios from 'axios'
export async function signIn(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/authenticate'
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

export async function loadCategories() {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/disciplines/categories'
  return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
}
export const getWorkshopList = () => {
  return axios.request({
    url: 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops',
    method: 'get'
  })
}

export const getWorkshop = (id) => {
  return axios.request({
    url: `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${id}`,
    method: 'get'
  })
}

// Make a request for a user with a given token
export const createWorkshop = (data) => {
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

export const coverGenerator = (id) => {
  return `${process.env.PUBLIC_URL}/images/cover/cover_${id}.jpg`
}
export function uploadImage(data, callback) {
  const url = 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/upload/image'
  axios.post(url, data)
    .then(response => {
      callback(response)
    })
    .catch(error => {
      callback(error)
    })
}

export const getCategoryList = () => {
  return axios.request({
    url: 'http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/disciplines/categories',
    method: 'get'
  })
}
