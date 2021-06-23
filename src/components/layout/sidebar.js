import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { auth } from '../../services/user-services';
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import User from '../user/user';


function Sidebar() {

  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const { authData, setAuth } = useAuth();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await auth({username, password});
    setAuth(data);
  }
  const logout = () => {
    setAuth(null);
  }
  const account = () => {
    history.push('/account')
  }

  return (
    <div className="sidebar">
        {!authData ?
        <div>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Username"
                onChange={ e => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Password" type="password" 
                onChange={ e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" type='submit'>
            Login
          </Button>
          <br/>
          
        </form>
        <Link to={'/register'}>Register here if you don't have an account yet</Link>
        </div>
      :
          <div>
            <User user={authData.user}/>
            <br/>
            <br/>
            <Button color="primary" variant="contained" onClick={()=> logout()}>
              Logout
            </Button>
            <Button color="primary" variant="contained" onClick={()=> account()}>
              My Account
            </Button>
          </div>
        
      }
    </div>
  );
}

export default Sidebar;