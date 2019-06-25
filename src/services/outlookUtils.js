import jstz from 'jstz'
import { addEvent, sendEmail } from './graph.service'
import config from './config'

function getTimezoneName() {
  return jstz.determine().name()
}

export async function addCalEvent(event, outlookCalCallback) {
  try {
    const accessToken = await window.msal.acquireTokenSilent(config.scopes)
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
    let response = await addEvent(accessToken, body)
    return response
  }
  catch (err) {
    outlookCalCallback(err)
  }
}

export async function createAndSendEmail({ subject, content, recipients }, outlookMailCallback) {
  try {
    const message = { Message: {} }
    const recipientsArray = []
    const accessToken = await window.msal.acquireTokenSilent(config.scopes)
    message.Message.Subject = subject
    message.Message.Body = {
      "ContentType": "Text",
      "Content": content.toString()
    }
    recipients.forEach(recipient => {
      const emailObj = { 'EmailAddress': { 'Address': recipient.username } }
      recipientsArray.push(emailObj)
    })
    message.Message.ToRecipients = recipientsArray
    message.Message.Attachments = [
      {
        "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
        "Name": "classInfo.txt",
        "ContentBytes": "bWFjIGFuZCBjaGVlc2UgdG9kYXk="
      }
    ]
    const saveToSentItems = true
    return sendEmail({ accessToken, message, saveToSentItems })
  }
  catch (err) {
    console.log('err', err)
    // outlookMailCallback(err)
  }
}


