import axios from "axios";
import config from './services/config'
const apiBase = "https://bettertogether.buildit.systems"

let getHeader = function () {
  return {
    'Authorization': `Bearer ${sessionStorage.getItem('msal.idtoken')}`,
    'Content-Type': 'application/json'
  }
  // window.msal.acquireTokenSilent(config.scopes)
  //   .then(response => {
  //     console.log(response)
  //     return {
  //       'Authorization': `Bearer ${response.accessToken}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .catch(err => {
  //     // could also check if err instance of InteractionRequiredAuthError if you can import the class.
  //     if (err.name === "InteractionRequiredAuthError") {
  //       //redirect
  //     }
  //   });
}

export function signIn(username, callback) {
  const url =
    `${apiBase}/api/users/authenticate`;
  return new Promise((resolve, reject) => {
    const data = { Username: username }
    const headers = getHeader()
    axios
      .request({
        url,
        method: "post",
        data,
        headers
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
    `${apiBase}/api/users/register`;
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
    `${apiBase}/api/disciplines/categories`;
  return axios
    .get(url, { headers: getHeader() })
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
    url: `${apiBase}/api/workshops/${category}`,
    method: "get",
    headers: getHeader()
  });
};

export const getWorkshopListDate = start => {
  const date = start ? `filter?startDate=${start}&endDate=2025-04-11T00:00:00` : "";
  const headers = getHeader()
  return axios.request({
    url: `${apiBase}/api/workshops/${date}`,
    method: "get",
    headers
  });
};


export const getWorkshop = (id, callback) => {
  const url = `${apiBase}/api/workshops/${id}`;
  axios
    .get(url, { headers: getHeader() })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const enrollWorkshop = (id, callback) => {
  const url = `${apiBase}/api/workshops/${id}/enroll`;
  axios
    .request({
      url,
      method: "put",
      headers: getHeader()
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const unenrollWorkshop = (id, callback) => {
  const url = `${apiBase}/api/workshops/${id}/enroll`;
  axios
    .request({
      url,
      method: "delete",
      headers: getHeader()
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getUser = (id, callback) => {
  const url = `${apiBase}/api/users/${id}`
  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        method: "get",
        headers: getHeader()
      })
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
        `${apiBase}/api/users/${id}`,
      method: "put",
      data,
      headers: getHeader()
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
        `${apiBase}/api/workshops/create`,
      method: "post",
      data,
      headers: getHeader()
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
    `${apiBase}/api/upload/image`;
  axios
    .post(url, data, { headers: getHeader() })
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
      `${apiBase}/api/disciplines`,
    method: "get",
    headers: getHeader()
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
      `${apiBase}/api/disciplines/categories`,
    method: "get",
    headers: getHeader()
  });
};

export const getLocationList = callback => {
  const url = `${apiBase}/api/locations`;
  axios
    .get(url, { headers: getHeader() })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getRolesList = callback => {
  const url =
    `${apiBase}/api/roles`;
  axios
    .get(url, { headers: getHeader() })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getSearchResults = (input, callback) => {
  const url = `${apiBase}/api/search?search=${input}&maxResults=5`;
  axios
    .get(url, { headers: getHeader() })
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
      url: `${apiBase}/api/workshops/${id}`,
      method: "put",
      data,
      headers: getHeader()
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
        `${apiBase}/api/workshops`,
      method: "get",
      headers: getHeader()
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
        `${apiBase}/api/workshops/${id}`,
      method: "delete",
      headers: getHeader()
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error);
    });
};

export const sendEmail = (message, saveToSentItems, callback) => {
  return axios
    .request({
      url: `https://outlook.office.com/api/v2.0/me/sendmail`,
      method: "post",
      data: { message, SavetoSentItems: saveToSentItems },
      headers: getHeader()
    })
    .then(response => {
      callback(response)
    })
    .catch(error => {
      callback(error)
    })
}

