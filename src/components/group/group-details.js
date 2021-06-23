import React, {useState, useEffect} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useFetchGroup } from '../../hooks/fetch-group';
import { makeStyles } from '@material-ui/core/styles';
import User from '../user/user';
import { Button } from '@material-ui/core';
import { joinGroup, leaveGroup } from '../../services/group-services';
import { useAuth } from '../../hooks/useAuth';
import Comments from '../comments/comments';
import EventList from '../events/event-list';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';


const useStyles = makeStyles( theme => ({
    dateTime: {
        fontSize: '18px',
        marginRight: '3px',
        marginTop: '10px',
        color: theme.colors.mainAccentColor
    },
    memberContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto 5fr 1fr',
        alignItems: 'center'
    },
    gold: {
        color: 'gold'
    },
    silver: {
        color: 'silver'
    },
    bronze: {
        color: 'bronze'
    }
}));

function GroupDetails() {

    const classes = useStyles();
    const { authData } = useAuth();
    const { id } = useParams();
    const [ data, loading, error ] = useFetchGroup(id);
    const [ group, setGroup] = useState(null);
    const [ isGroup, setInGroup ] = useState(false);
    const [ isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        if(data?.members){
            
            data.members.sort((a,b) => b.points - a.points);

            const availableTrophies = ['gold', 'silver', 'bronze'];
            let currentTrophy = 0;
            data.members.map( (m, indx) => {
                if(indx === 0){
                    m.trophy = availableTrophies[currentTrophy];
                } else {
                    if(m.points !== data.members[indx -1].points){
                        currentTrophy++;
                    }
                    if(currentTrophy < availableTrophies.length){
                        m.trophy = availableTrophies[currentTrophy];
                    }
                }
            })

            if(authData?.user) {
                setInGroup(!!data.members.find( member => member.user.id === authData.user.id));
                setIsAdmin(data.members.find( member => member.user.id === authData.user.id)?.admin);
            }
        }
        setGroup(data);
    }, [data])

    const joinHere = () => {
        joinGroup({user: authData.user.id, group: group.id}).then(
            res => { console.log(res)}
        )
    }

    const leaveHere = () => {
        leaveGroup({user: authData.user.id, group: group.id}).then(
            res => { console.log(res)}
        )
    }

    const addEvent = () => {
        history.push('/event-form', {group})
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading....</h1>


    return (
        <div>
            <Link to={`/`}><ChevronLeftIcon/></Link>
            { group &&
            <React.Fragment>
                <h1>{group.name} {group.location}</h1>
                <h2>{group.description}</h2>
                { isGroup ?
                    <Button onClick={()=> leaveHere()} variant="contained"
                            color="primary">Leave Group</Button>
                    :
                    <Button onClick={()=> joinHere()} variant="contained"
                            color="primary">Join Group</Button>
                }
                {isAdmin && <Button onClick={()=> addEvent()} variant="contained"
                                    color="primary">Add new Event</Button>}


                <EventList events={group.events}/>

                <br/>
                <h3>Members:</h3>
                { group.members.map ( member => {

                    return <div key={member.id} className={classes.memberContainer}>
                        <User user={member.user}/>
                        <p><EmojiEventsIcon className={`${classes[member.trophy]}`}/></p>
                        <p>{member.points}pts</p>
                    </div>
                })}

                <Comments group={group}/>
            </React.Fragment>
            }

        </div>
    );
}

export default GroupDetails;
