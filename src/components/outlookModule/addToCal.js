import jstz from 'jstz'
import { addEvent } from '../../services/graph.service'
import config from '../../services/config'

function getTimezoneName() {
  return jstz.determine().name()
}

export async function addCalEvent(event) {
  try {
    const accessToken = await window.msal.acquireTokenSilent(config.scopes)
    console.log('accessToken', accessToken)
    const body = {
      subject: event.title,
      body: {
        contentType: "HTML",
        content: event.description
        //need to add webex info - currently has to be passed in via workshop component
      },
      start: {
        dateTime: event.startTime,
        timeZone: getTimezoneName()
      },
      end: {
        dateTime: event.endTime,
        timeZone: getTimezoneName()
      },
      location: {
        displayName: event.location
      }
    }
    const response = await addEvent(accessToken, body)
    console.log('cal response', response)
  }
  catch (err) {
    console.log('err', err)
  }
}



