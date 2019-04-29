import axios from "axios";
export async function signIn(data, callback) {
  const url =
    "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/authenticate";
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  });
}

export function signUp(data, callback) {
  const url =
    "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/register";
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  });
}

export async function loadCategories() {
  const url =
    "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/disciplines/categories";
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}
export const getWorkshopList = id => {
  const category = id ? `filter?categoryId=${id}` : "";
  return axios.request({
    url: `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${category}`,
    method: "get"
  });
};

export const getWorkshop = (id, callback) => {
  const url = `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${id}`;
  axios
    .get(url)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const enrollWorkshop = (id, callback) => {
  const token = localStorage.getItem("BTToken");
  const url = `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${id}/enroll`;
  axios
    .request({
      url,
      method: "put",
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const unenrollWorkshop = (id, callback) => {
  const token = localStorage.getItem("BTToken");
  const url = `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${id}/enroll`;
  axios
    .request({
      url,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getUser = id => {
  return axios.request({
    url: `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/users/${id}`,
    method: "get"
  });
};

// Make a request for a user with a given token
export const createWorkshop = data => {
  const token = localStorage.getItem("BTToken");
  return axios
    .request({
      url:
        "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/create",
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function(response) {
      // handle success
      console.log(response);
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const coverGenerator = id => {
  return `${process.env.PUBLIC_URL}/images/cover/cover_${id}.jpg`;
};

export function uploadImage(data, callback) {
  const url =
    "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/upload/image";
  axios
    .post(url, data)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
}

export const getCategoryList = () => {
  return axios.request({
    url:
      "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/disciplines/categories",
    method: "get"
  });
};

export const getLocationList = callback => {
  const url = `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/locations`;
  axios
    .get(url)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getRolesList = callback => {
  const url =
    "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/roles";
  axios
    .get(url)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getSearchResults = (input, callback) => {
  const url = `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com//api/search?search=${input}&maxResults=5`;
  axios
    .get(url)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

// Make a request for a user with a given token
export const updateWorkshop = (id, data) => {
  const token = localStorage.getItem("BTToken");
  return axios
    .request({
      url: `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/api/workshops/${id}`,
      method: "put",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};
