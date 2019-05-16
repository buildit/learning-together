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
  return axios
    .request({
      url: `https://bettertogether.buildit.systems/api/users/${id}`,
      method: "get"
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error);
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
  //userInterests needs to be updated on server
  const data = {
    firstName,
    lastName,
    username,
    password,
    roleId,
    locationId,
    imageUrl
  };
  console.log("data", data, "id", id);
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
      console.log(response);
      return callback(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
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
  const url = `https://bettertogether.buildit.systems//api/search?search=${input}&maxResults=5`;
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
        //console.log("response", response);
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
    /*data: {
      title: "Better Together event",
      start: {
        date_time: "2019-05-17T19:00:00Z",//scheduled for 3:ooPM
        time_zone: "America/New_York"
      },
      end: {
        date_time: "2019-05-17T19:30:00Z",
        time_zone: "America/New_York"
      }
    },*/
    //data,
    headers: {
      Authorization:
        //"Access-Token 4UcWNmwXJ668NltxUaBDYD03roBPCKNyfWDZmZA3ePYgM0utsfD1iDyjsE06FRwRMZfPYiONnk4OZhoRcISUzf3CDFztIbPIXvEj8nzF0JfJmYsFOwDP81oDYQmyIjCF"
        "Access-Token XPaUdkqoWhWqLk1yRr9LYRX4dpdcsE5wHtWaikLPhMzZIuNoN8MdOntNVpP5KaFtCgSYF8c67dgCE70Ke1jUsXQbr9wbuySnHHajndThrVEuoUBD79Fuo60UvV573T0t"
    }
  });
};

export const deleteEvent = id => {
  return axios.request({
    url: `https://api.robinpowered.com/v1.0/events/${id}`,
    method: "DELETE",
    headers: {
      Authorization:
        //"Access-Token 4UcWNmwXJ668NltxUaBDYD03roBPCKNyfWDZmZA3ePYgM0utsfD1iDyjsE06FRwRMZfPYiONnk4OZhoRcISUzf3CDFztIbPIXvEj8nzF0JfJmYsFOwDP81oDYQmyIjCF"
        "Access-Token XPaUdkqoWhWqLk1yRr9LYRX4dpdcsE5wHtWaikLPhMzZIuNoN8MdOntNVpP5KaFtCgSYF8c67dgCE70Ke1jUsXQbr9wbuySnHHajndThrVEuoUBD79Fuo60UvV573T0t"
    }
  });
};

export const bookRoom = () => {
  return axios.request({
    url: `https://api.robinpowered.com/v1.0/spaces/28020/events`,
    method: "POST",
    data: {
      title: "Better Together event",
      start: {
        date_time: "2019-05-17T19:00:00Z", //scheduled for 3:ooPM
        time_zone: "America/New_York"
      },
      end: {
        date_time: "2019-05-17T19:30:00Z",
        time_zone: "America/New_York"
      }
    },
    //data,
    headers: {
      Authorization:
        //"Access-Token 4UcWNmwXJ668NltxUaBDYD03roBPCKNyfWDZmZA3ePYgM0utsfD1iDyjsE06FRwRMZfPYiONnk4OZhoRcISUzf3CDFztIbPIXvEj8nzF0JfJmYsFOwDP81oDYQmyIjCF"
        "Access-Token XPaUdkqoWhWqLk1yRr9LYRX4dpdcsE5wHtWaikLPhMzZIuNoN8MdOntNVpP5KaFtCgSYF8c67dgCE70Ke1jUsXQbr9wbuySnHHajndThrVEuoUBD79Fuo60UvV573T0t"
    }
  });
};

export const getAuth = (start, end) => {
  const startTime =
    moment(start)
      .set({ second: 0, millisecond: 0 })
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

  console.log(start);
  console.log(end);

  const newStart =
    moment(start)
      .set({ h: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString()
      .split(".")[0] + "Z";

  console.log(dayAfter);
  console.log(newStart);
  //console.log(moment('2019-05-17T10:30:00-0400').local())

  return axios
    .request({
      url: `https://api.robinpowered.com/v1.0/free-busy/spaces`,
      //url: `https://api.robinpowered.com/v1.0/spaces/28020/events?after=2018-12-06T12:00:00Z&before=2019-12-06T12:00:00Z`,
      //url: `https://api.robinpowered.com/v1.0/spaces/28020/events?after=2019-05-08T12:00:00Z&before=${today}`,
      //url: `https://api.robinpowered.com/v1.0/spaces/28020/events?before=${dayAfter}&after=${newStart}`,
      method: "POST",
      data: {
        scope: { space_ids: [28020], location_ids: [6330] },
        view_options: {
          bounds: {
            from: `${newStart}`,
            //to: "2019-05-18T18:30:00Z",
            to: `${dayAfter}`,
            //recurrence: ["RRULE:FREQ=DAILY;INTERVAL=3;"],
            time_zone: "America/New_York"
          },
          prioritization_type: "specific_time"
          //merge_threshold: "PT30M",
          //included_submodels: ["space.space_amenities"]
        }
      },
      //data,
      headers: {
        Authorization:
          //"Access-Token 4UcWNmwXJ668NltxUaBDYD03roBPCKNyfWDZmZA3ePYgM0utsfD1iDyjsE06FRwRMZfPYiONnk4OZhoRcISUzf3CDFztIbPIXvEj8nzF0JfJmYsFOwDP81oDYQmyIjCF"
          "Access-Token XPaUdkqoWhWqLk1yRr9LYRX4dpdcsE5wHtWaikLPhMzZIuNoN8MdOntNVpP5KaFtCgSYF8c67dgCE70Ke1jUsXQbr9wbuySnHHajndThrVEuoUBD79Fuo60UvV573T0t"
      }
    })
    .then(function(response) {
      // handle success
      console.log("response", response);
      /* NEW BUSY FREE */
      const availableRooms = [];

      const result = response.data.data.map(room => {
        if (room.busy.length === 0) {
          console.log("empty", room.space.name);
          return availableRooms.push(room.space.name);
        } else if (room.busy.length > 0) {
          room.busy.map(roomEvents => {
            console.log("room", room.space.name);
            console.log("events", roomEvents); /** */

            const isConflict = roomEvents.events.map(event => {
              /** */
              console.log("event", event);

              event.map(dayEvent => {});

              const eventStart =
                moment(event.start.date_time)
                  .local()
                  .format("YYYY-MM-DDTHH:mm:ss.SSS")
                  .split(".")[0] + "Z";

              const eventEnd =
                moment(event.end.date_time)
                  .local()
                  .format("YYYY-MM-DDTHH:mm:ss.SSS")
                  .split(".")[0] + "Z";

              if (
                moment(startTime).isAfter(moment(eventStart)) &&
                moment(startTime).isBefore(moment(eventEnd))
              ) {
                console.log("start conflict");
                return;
              } else if (
                moment(endTime).isAfter(eventStart) &&
                moment(endTime).isBefore(eventEnd)
              ) {
                console.log("end conflict");
                return;
              } else if (
                moment(startTime).isSameOrBefore(moment(eventStart)) &&
                moment(endTime).isSameOrAfter(moment(eventEnd))
              ) {
                console.log("conflict");
                return;
              } else {
                console.log("pushing to available");
                return availableRooms.push(room.space.name);
              }
            });

            console.log("is conflict", isConflict);
          });
        }
        console.log(room);
      });

      console.log("without conflict rooms" + availableRooms);
      console.log("result", result);

      /*WORKING BY ROOM
      
      const result = response.data.data.map(event => {
      
        const localTimeStart =
          moment(event.start.date_time)
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS")
            .split(".")[0] + "Z";

        const localTimeEnd =
          moment(event.end.date_time)
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS")
            .split(".")[0] + "Z";

        console.log(startTime);
        console.log(localTimeStart);
        console.log(localTimeEnd);
        console.log(moment(startTime).isSame(moment(localTimeStart)));

        if (
          moment(startTime).isAfter(moment(localTimeStart)) &&
          moment(startTime).isBefore(moment(localTimeEnd))
        ) {
          console.log("start conflict");
        } else if (
          moment(endTime).isAfter(localTimeStart) &&
          moment(endTime).isBefore(localTimeEnd)
        ) {
          console.log("end conflict");
        } else if (
          moment(startTime).isSameOrBefore(moment(localTimeStart)) &&
          moment(endTime).isSameOrAfter(moment(localTimeEnd))
        ) {
          console.log("conflict");
        } else {
          console.log("no conflict");
        }
      });*/

      return response;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};
