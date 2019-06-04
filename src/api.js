import axios from "axios";
const token = sessionStorage.getItem('msal.idtoken')
console.log('TOKEN', token)
export async function signIn(username, callback) {
  const url =
    "https://bettertogether.buildit.systems/api/users/authenticate";
  return new Promise((resolve, reject) => {
    const data = { Username: username }
    axios
      .request({
        url,
        method: "post",
        data,
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
  });
}

export function signUp(data, callback) {
  const url =
    "https://bettertogether.buildit.systems/api/users/register";
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
    "https://bettertogether.buildit.systems/api/disciplines/categories";
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
    url: `https://bettertogether.buildit.systems/api/workshops/${category}`,
    method: "get"
  });
};

export const getWorkshopListDate = start => {
  const date = start ? `filter?startDate=${start}&endDate=2025-04-11T00:00:00` : "";
  return axios.request({
    url: `https://bettertogether.buildit.systems/api/workshops/${date}`,
    method: "get"
  });
};


export const getWorkshop = (id, callback) => {
  const url = `https://bettertogether.buildit.systems/api/workshops/${id}`;
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
  const url = `https://bettertogether.buildit.systems/api/workshops/${id}/enroll`;
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
  const url = `https://bettertogether.buildit.systems/api/workshops/${id}/enroll`;
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

export const getUser = (id, callback) => {
  const url = `https://bettertogether.buildit.systems/api/users/${id}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  });

};

export const editUser = ({ firstName, lastName, username, password, roleId, locationId, imageUrl, userInterests }, id, callback) => {
  const data = { firstName, lastName, username, password, roleId, locationId, imageUrl, userInterests }
  return axios
    .request({
      url:
        `https://bettertogether.buildit.systems/api/users/${id}`,
      method: "put",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function (response) {
      // handle success
      return callback(response);
    })
    .catch(function (error) {
      // handle error
      callback(error);
    });
}
// Make a request for a user with a given token
export const createWorkshop = data => {
  return axios
    .request({
      url:
        "https://bettertogether.buildit.systems/api/workshops/create",
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

export const coverGenerator = id => {
  return `${process.env.PUBLIC_URL}/images/cover/cover_${id}.jpg`;
};

export function uploadImage(data, callback) {
  const url =
    "https://bettertogether.buildit.systems/api/upload/image";
  axios
    .post(url, data)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
}

export const getDisciplineList = (callback) => {
  return axios.request({
    url:
      "https://bettertogether.buildit.systems/api/disciplines",
    method: "get"
  })
    .then(response => {
      callback(response)
    })
    .catch(error => {
      callback(error)
    });
};

export const getCategoryList = () => {
  return axios.request({
    url:
      "https://bettertogether.buildit.systems/api/disciplines/categories",
    method: "get"
  });
};

export const getLocationList = callback => {
  const url = `https://bettertogether.buildit.systems/api/locations`;
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
    "https://bettertogether.buildit.systems/api/roles";
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
  const url = `https://bettertogether.buildit.systems/api/search?search=${input}&maxResults=5`;
  axios
    .get(url)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const updateWorkshop = (id, data) => {
  return axios
    .request({
      url: `https://bettertogether.buildit.systems/api/workshops/${id}`,
      method: "put",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

export const fetchWorkshops = () => {
  return axios
    .request({
      url:
        "https://bettertogether.buildit.systems/api/workshops",
      method: "get"
    })
    .then(function (response) {
      // handle success
      if (response.data && response.status === 200) {
        //console.log("response", response);
        return response.data;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

export const cancelWorkshop = (id, callback) => {
  return axios
    .request({
      url:
        `https://bettertogether.buildit.systems/api/workshops/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error);
    });
};

