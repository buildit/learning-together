import axios from "axios";
import moment from "moment";
import { getToken } from "./components/auth/utils";
const token = getToken();

export async function signIn(username, callback) {
  const url = "https://bettertogether.buildit.systems/api/users/authenticate";
  return new Promise((resolve, reject) => {
    const data = { Username: username };
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
  const url = "https://bettertogether.buildit.systems/api/users/register";
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
  const date = start
    ? `filter?startDate=${start}&endDate=2025-04-11T00:00:00`
    : "";
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
  const url = `https://bettertogether.buildit.systems/api/users/${id}`;
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
      url: `https://bettertogether.buildit.systems/api/users/${id}`,
      method: "put",
      data,
      headers: {
        Authorization: "Bearer " + token
      }
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
// Make a request for a user with a given token
export const createWorkshop = data => {
  return axios
    .request({
      url: "https://bettertogether.buildit.systems/api/workshops/create",
      method: "post",
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

export const coverGenerator = id => {
  return `${process.env.PUBLIC_URL}/images/cover/cover_${id}.jpg`;
};

export function uploadImage(data, callback) {
  const url = "https://bettertogether.buildit.systems/api/upload/image";
  axios
    .post(url, data)
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
      url: "https://bettertogether.buildit.systems/api/disciplines",
      method: "get"
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
    url: "https://bettertogether.buildit.systems/api/disciplines/categories",
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
  const url = "https://bettertogether.buildit.systems/api/roles";
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
    .then(function(response) {
      // handle success
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const fetchWorkshops = () => {
  return axios
    .request({
      url: "https://bettertogether.buildit.systems/api/workshops",
      method: "get"
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
      url: `https://bettertogether.buildit.systems/api/workshops/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token
      }
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

export const getEventsByRoom = start => {
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
    url: `https://api.robinpowered.com/v1.0/spaces/28020/events?before=${dayAfter}&after=${newStart}`,
    method: "GET",
    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
};

export const deleteEvent = id => {
  return axios.request({
    url: `https://api.robinpowered.com/v1.0/events/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
};

export const bookRoom = (start, end, title, room) => {
  console.log("room selected is", room);
  const utcStartTime =
    moment
      .utc(start)
      .set({ second: 0, millisecond: 0 })
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .split(".")[0] + "Z";
  const utcEndTime =
    moment
      .utc(end)
      .set({ second: 0, millisecond: 0 })
      .format("YYYY-MM-DDTHH:mm:ss.SSS")
      .split(".")[0] + "Z";

  return axios.request({
    url: `https://api.robinpowered.com/v1.0/spaces/${room}/events`,
    method: "POST",
    data: {
      title: `${title}`,
      start: {
        date_time: `${utcStartTime}`,
        time_zone: "America/New_York"
      },
      end: {
        date_time: `${utcEndTime}`,
        time_zone: "America/New_York"
      }
    },
    //data,
    headers: {
      Authorization: `Access-Token ${process.env.REACT_APP_ROBIN_TOKEN}`
    }
  });
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
            //to: "2019-05-18T18:30:00Z",
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
      // handle success
      console.log("response", response);

      const result = response.data.data.map(room => {
        if (room.busy.length === 0) {
          console.log("empty", room.space.name);
          //return availableRooms.push(room.space.name);
          return availableRooms.push({
            room: room.space.name,
            id: room.space.id
          });
        } else {
          console.log("rooms have events");
          let conflict = false;
          const schedule = room.busy.map(event => {
            console.log(`${room.space.name}`, event);
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

            console.log(
              "is my start time before the event end",
              moment(startTime).isBefore(moment(eventEnd))
            );

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
              console.log("end conflict");
              conflict = true;
              return;
            } else if (
              moment(startTime).isSameOrBefore(moment(eventStart)) &&
              moment(endTime).isSameOrAfter(moment(eventEnd))
            ) {
              console.log("conflict");
              conflict = true;
              return;
            } else {
              console.log("no conflict");
            }
          });

          if (conflict === false) {
            availableRooms.push({ room: room.space.name, id: room.space.id });
          }
        } //closing else
      });
      console.log("avalable", availableRooms);
      return availableRooms;
    });
};
