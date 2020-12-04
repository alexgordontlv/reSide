import React from 'react';
import {auth} from '../../firebase/firebase'

const CalendarComponent = props => {
 

  let gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  let CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  let API_KEY = process.env.REACT_APP_CALENDAR_API_KEY
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  let SCOPES = "https://www.googleapis.com/auth/calendar.events"

 


  const handleClick = (event) => {
  
    event.preventDefault();
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calenadar!'))
      let timeString = "2020-12-12T10:00:00.000";
      let timeZone = "Asia/Jerusalem";
      let duration = '00:30:00';
    
      let startDate = new Date(timeString);
      let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
      let endDate = new Date(startDate.getTime() + msDuration);
      let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
      let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];

      const  token = auth.currentUser.getIdTokenResult()
      console.log(token)
      gapi.auth2.getAuthInstance().signIn()
      .then(function(data){
        console.log(data)
        let event = {
          'summary': 'ITS MY BIRTHDAY!!!!',
          'location': 'Tel-Aviv',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': isoStartDate,
            'timeZone': timeZone
          },
          'end': {
            'dateTime': isoEndDate,
            'timeZone': timeZone
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }
         gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        
        
        let request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

      })
    })
  }

  
  return(
    <div>
    <header className="App-header">
    <p>Click to add event to Google Calendar</p>
    <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
  </header>
    </div>
  )
}

export default CalendarComponent;
