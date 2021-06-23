import React from 'react';
import {DateTime} from 'luxon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';


const useStyles = makeStyles( theme => ({
  dateTime: {
    fontSize: '18px',
    marginRight: '3px',
    marginTop: '10px',
    color: theme.colors.mainAccentColor
  },
  memberContainer: {
    display: 'grid',
    gridTemplateColumns: '100px auto'
  }
}));

export default function EventList({events}){

  const classes = useStyles();
  const history = useHistory()

  const openEvent = eventId => {
    history.push(`/event/${eventId}`);
  }

  return (
    <React.Fragment>
    <h3>Events:</h3>
        { events && events.map( event => {
          const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
          const evtTime = DateTime.fromFormat(event.time, format)

          return <div key={event.id} onClick={()=> openEvent(event.id)}>
            <p>{event.team1} VS {event.team2}
              &nbsp; : &nbsp; 
              <CalendarTodayIcon className={classes.dateTime}/>{evtTime.toSQLDate()} 
              <AlarmIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
            </p>
          </div>
        })}
      </React.Fragment>
  )
}