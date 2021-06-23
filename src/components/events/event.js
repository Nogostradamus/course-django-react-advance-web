import React, {useState, useEffect} from 'react';
import {DateTime} from 'luxon';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import { useFetchEvent } from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';
import User from  '../user/user';
import { Button } from '@material-ui/core';
import { placeBet, setResults } from '../../services/event-services';
import { NotificationManager} from 'react-notifications';
import { CssTextField } from '../layout/elements';


const useStyles = makeStyles( theme => ({
  container: {
    textAlign: 'center'
  },
  bets: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    marggin: '5px 0 0 0'
  },
  back: {
    float: 'left',
    clear: 'both'
  },
  accent: {
    color: theme.palette.primary.main,
    fontSize: '20px'
  },
  dateTime: {
    color: theme.palette.secondary.main,
    margin: '0 5px'
  },
  numberField: {
    width: '120px'
  }
}));

export default function Event(){

  const { authData } = useAuth();
  const { id } = useParams()
  const classes = useStyles();
  const [ data, loading, error ] = useFetchEvent(authData.token, id);
  const [ event, setEvent] = useState(null);
  const [ evtTime, setEvtTime] = useState(null);
  const [ isFuture, setIsFuture] = useState(null);
  const [ timeDiff, setTimeDiff] = useState(null);
  const [score1, setScore1 ] = useState(null);
  const [score2, setScore2 ] = useState(null);

  useEffect(()=>{
    setEvent(data);
    if(data?.time) {
      const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
      const eventTime = DateTime.fromFormat(data.time, format);
      setEvtTime(eventTime);
      const now = DateTime.now();
      setIsFuture(eventTime > now);
      setTimeDiff(eventTime.toRelative());
    }
  }, [data])

  const sendBet = async () => {
    const bet = await placeBet(authData.token, {score1, score2, 'event': event.id});
    if(bet) {
      if(bet.new){
        event.bets.push(bet.result)
      } else {
        const myBetIndex = event.bets.findIndex(el => el.user.id === bet.result.user.id);
        event.bets[myBetIndex] = bet.result;
      }
      NotificationManager.success(bet.message);
      setScore1('');
      setScore2('');
    }
  }
  const setScores = async () => {
    const eventData = await setResults(authData.token, {score1, score2, 'event': event.id});
    if(eventData) {
      setEvent(eventData);
      NotificationManager.success("Scores has been set");
      setScore1('');
      setScore2('');
    } else {
      NotificationManager.error("Scores could not be set");
    }
  }

  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading....</h1>

  

  return (
      <div className={classes.container}>
        { event && evtTime && 
          <div>
            <Link to={`/details/${event.group}`} className={classes.back}><ChevronLeftIcon/></Link>
            <h3>{event.team1} <span className={classes.accent}>VS</span> {event.team2}</h3>
            { event.score1 >= 0 && event.score2 >= 0 && <h2>{event.score1} : {event.score2}</h2>}
            
            <h2>
              <CalendarTodayIcon className={classes.dateTime}/>{evtTime.toSQLDate()} 
              <AlarmIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
            </h2>
            <h2>{timeDiff}</h2>
            <hr/>
            <br/>
            { event && event.bets && event.bets.map(bet => {
              return <div key={bet.id} className={classes.bets}>
                <User user={bet.user}/>
                <h4>{bet.score1} : {bet.score2}</h4>
                <h4>{bet.points}pts</h4>
                </div>
            })}
            <hr/>
            <br/>
            
            { isFuture ?
              <div>
                <CssTextField label="Score 1" type="number" className={classes.numberField}
                onChange={ e => setScore1(e.target.value)}
                />
                <span className={classes.accent}>&nbsp; : &nbsp;</span> 
              <CssTextField label="Score 2" type="number"  className={classes.numberField}
                  onChange={ e => setScore2(e.target.value)}
                />
                <br/><br/>
                <Button variant="contained" color="primary"
                    onClick={()=> sendBet()} disabled={!score1 || !score2}>
                  Place bet
                  </Button>
              </div>
              
              :
              event.is_admin ? 
              <div>
                <CssTextField label="Score 1" type="number"  className={classes.numberField}
                onChange={ e => setScore1(e.target.value)}
                />
                <span className={classes.accent}>&nbsp; : &nbsp;</span> 
              <CssTextField label="Score 2" type="number"  className={classes.numberField}
                  onChange={ e => setScore2(e.target.value)}
                />
                <br/><br/>
              <Button variant="contained" color="primary"
              onClick={()=> setScores()} disabled={!score1 || !score2}>
                Set Scores
                </Button>
                </div> : null
              }
          </div>
        }
      </div>
    
    
  )
}