export function filterAttendees(userId, workshop) {
  let isAttending = false
  let attendees = workshop.workshopAttendees || []
  for (let i = 0; i < attendees.length; i++) {
    if (attendees[i].userId === userId) {
      isAttending = true
    }
  }
  return isAttending
}
