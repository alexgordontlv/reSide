
  let gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  let CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  let API_KEY = process.env.REACT_APP_CALENDAR_API_KEY
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  let SCOPES = "https://www.googleapis.com/auth/calendar.events"

 


  export const addCalendarEvent = (startTime,address,clientName) => {
  
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3')
      let timeString = startTime;
      let timeZone = "Asia/Jerusalem";
      let duration = '00:30:00';
    
      let startDate = new Date(timeString);
      let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
      let endDate = new Date(startDate.getTime() + msDuration);
      let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
      let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];


      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        console.log(isoStartDate)
        console.log(isoEndDate)
        let event = {
          'summary': clientName,
          'location': address,
          'start': {
            'dateTime': isoStartDate,
            'timeZone': timeZone
          },
          'end': {
            'dateTime': isoEndDate,
            'timeZone': timeZone
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'popup', 'minutes': 20}
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
          //console.log('EVENTS: ', events)
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

  
