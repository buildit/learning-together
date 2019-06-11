import { sendEmail } from '../../services/graph.service'
import config from '../../services/config'

export async function createAndSendEmail({ subject, content, recipients }) {
  try {
    const message = { Message: {} }
    const recipientsArray = []
    const accessToken = await window.msal.acquireTokenSilent(config.scopes)
    console.log(content)
    message.Message.Subject = subject
    message.Message.Body = {
      "ContentType": "Text",
      "Content": content.toString()
    }
    recipients.forEach(recipient => {
      const emailObj = { 'EmailAddress': { 'Address': recipient.username } }
      recipientsArray.push(emailObj)
    })
    console.log(recipientsArray)
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
    console.log(err)
  }
}


