import axios from "axios";
import moment from "moment";

const apiBase = "https://bettertogether.buildit.systems";

let getHeader = function() {
  let token = sessionStorage.getItem("msal.idtoken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export async function signIn(username, callback) {
  const url = `${apiBase}/api/users/authenticate`;
  return new Promise((resolve, reject) => {
    const data = { Username: username };
    axios
      .request({
        url,
        method: "post",
        data,
        headers: getHeader()
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
  const url = `${apiBase}/api/users/register`;
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
  const url = `${apiBase}/api/disciplines/categories`;
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
  const date = start
    ? `filter?startDate=${start}&endDate=2025-04-11T00:00:00`
    : "";
  return axios.request({
    url: `${apiBase}/api/workshops/${date}`,
    method: "get",
    headers: getHeader()
  });
};

export const getWorkshopListPast = category => {
  const start = moment().format();
  const date = `filter?categoryId=${category}&startDate=2018-01-01T00:00:00&endDate=${start}`;
  return axios.request({
    url: `${apiBase}/api/workshops/${date}`,
    method: "get",
    headers: getHeader()
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
  const url = `${apiBase}/api/users/${id}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers: getHeader() })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  });
};

export const editUser = (
  {
    firstName,
    lastName,
    username,
    password,
    roleId,
    locationId,
    imageUrl,
    userInterests
  },
  id,
  callback
) => {
  const data = {
    firstName,
    lastName,
    username,
    password,
    roleId,
    locationId,
    imageUrl,
    userInterests
  };
  return axios
    .request({
      url: `${apiBase}/api/users/${id}`,
      method: "put",
      data,
      headers: getHeader()
    })
    .then(function(response) {
      // handle success
      return callback(response);
    })
    .catch(function(error) {
      // handle error
      callback(error);
    });
};

export const createWorkshop = async data => {
  try {
    return await axios.request({
      url: `${apiBase}/api/workshops/create`,
      method: "post",
      data,
      headers: getHeader()
    });
  } catch (error) {
    //HANDLE ERROR
    console.log(error);
  }
};

export const coverGenerator = id => {
  return `${process.env.PUBLIC_URL}/images/cover/cover_${id}.jpg`;
};

export function uploadImage(data, callback) {
  const url = `${apiBase}/api/upload/image`;
  axios
    .post(url, data, { headers: getHeader() })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
}

export const getDisciplineList = callback => {
  return axios
    .request({
      url: `${apiBase}/api/disciplines`,
      method: "get",
      headers: getHeader()
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};

export const getCategoryList = () => {
  return axios.request({
    url: `${apiBase}/api/disciplines/categories`,
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
  const url = `${apiBase}/api/roles`;
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

export const updateWorkshop = async (id, data) => {
  try {
    return axios
      .request({
        url: `${apiBase}/api/workshops/${id}`,
        method: "put",
        data,
        headers: getHeader()
      })
      .then(function(response) {
        // handle success
        return response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchWorkshops = () => {
  return axios
    .request({
      url: `${apiBase}/api/workshops`,
      method: "get",
      headers: getHeader()
    })
    .then(function(response) {
      // handle success
      if (response.data && response.status === 200) {
        return response.data;
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const cancelWorkshop = (id, callback) => {
  return axios
    .request({
      url: `${apiBase}/api/workshops/${id}`,
      method: "delete",
      headers: getHeader()
    })
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      callback(error);
    });
};

export const viewEvent = id => {
  return axios.request({
    url: `https://api.robinpowered.com/v1.0/events/${id}`,
    method: "GET",
    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
};

export const getEventsByRoom = (start, roomId) => {
  const newStart =
    moment(start)
      .set({ second: 1, millisecond: 0 })
      .local()
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .split(".")[0] + "Z";

  const dayAfter =
    moment(start)
      .add(1, "day")
      .toISOString()
      .split(".")[0] + "Z";

  return axios.request({
    url: `https://api.robinpowered.com/v1.0/spaces/${roomId}/events?before=${dayAfter}&after=${newStart}`,
    method: "GET",
    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
};

export const deleteEvent = async id => {
  try {
    return axios.request({
      url: `https://api.robinpowered.com/v1.0/events/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/*export const bookRoom = (start, end, title, room) => {
  const IsoStartTime = moment(start).format();
  const IsoEndTime = moment(end).format();

  return axios.request({
    url: `https://api.robinpowered.com/v1.0/spaces/${room}/events`,
    method: "POST",
    data: {
      title: `${title}`,
      start: {
        date_time: `${IsoStartTime}`,
        time_zone: "America/New_York"
      },
      end: {
        date_time: `${IsoEndTime}`,
        time_zone: "America/New_York"
      }
    },

    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
};*/

export const bookRoom = async (start, end, title, room) => {
  try {
    const IsoStartTime = moment(start).format();
    const IsoEndTime = moment(end).format();

    return await axios.request({
      url: `https://api.robinpowered.com/v1.0/spaces/${room}/events`,
      method: "POST",
      data: {
        title: `${title}`,
        start: {
          date_time: `${IsoStartTime}`,
          time_zone: "America/New_York"
        },
        end: {
          date_time: `${IsoEndTime}`,
          time_zone: "America/New_York"
        }
      },

      headers: {
        Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
      }
    });
  } catch (error) {
    console.log(error);
    //HANDLE ERROR
  }
};

export const findRoom = (start, end) => {
  const startTime =
    moment(start)
      .set({ second: 1, millisecond: 0 })
      .local()
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .split(".")[0] + "Z";

  const dayAfter =
    moment(start)
      .add(1, "day")
      .toISOString()
      .split(".")[0] + "Z";

  const endTime =
    moment(end)
      .set({ second: 0, millisecond: 0 })
      .local()
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .split(".")[0] + "Z";

  const newStart =
    moment(start)
      .set({ h: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString()
      .split(".")[0] + "Z";

  return axios
    .request({
      url: `https://api.robinpowered.com/v1.0/free-busy/spaces`,
      method: "POST",
      data: {
        scope: { space_ids: [28020], location_ids: [6330] },
        view_options: {
          bounds: {
            from: `${newStart}`,

            to: `${dayAfter}`,
            time_zone: "America/New_York"
          },
          prioritization_type: "specific_time"
        }
      },
      headers: {
        Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
      }
    })
    .then(function(response) {
      const availableRooms = [];

      response.data.data.forEach(room => {
        if (room.busy.length === 0) {
          return availableRooms.push({
            room: room.space.name,
            id: room.space.id
          });
        } else {
          let conflict = false;

          room.busy.forEach(event => {
            const eventStart =
              moment(event.from)
                .local()
                .format("YYYY-MM-DDTHH:mm:ss.SSS")
                .split(".")[0] + "Z";

            const eventEnd =
              moment(event.to)
                .set({ second: 0, millisecond: 0 })
                .local()
                .format("YYYY-MM-DDTHH:mm:ss.SSS")
                .split(".")[0] + "Z";

            if (
              moment(startTime).isAfter(moment(eventStart)) &&
              moment(startTime).isBefore(moment(eventEnd))
            ) {
              conflict = true;
              return;
            } else if (
              moment(endTime).isAfter(eventStart) &&
              moment(endTime).isBefore(eventEnd)
            ) {
              conflict = true;
              return;
            } else if (
              moment(startTime).isSameOrBefore(moment(eventStart)) &&
              moment(endTime).isSameOrAfter(moment(eventEnd))
            ) {
              conflict = true;
              return;
            }
            return;
          });

          if (conflict === false) {
            availableRooms.push({ room: room.space.name, id: room.space.id });
          }
        } //closing else
        return;
      });

      return availableRooms;
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
      callback(response);
    })
    .catch(error => {
      callback(error);
    });
};
