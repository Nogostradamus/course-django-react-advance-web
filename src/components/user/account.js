import React, {useState} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { uploadAvatar } from '../../services/user-services';
import { changePass } from '../../services/user-services';
import { NotificationManager} from 'react-notifications';
import { CssTextField } from '../layout/elements';


function Account() {

  const { authData } = useAuth();
  const [ image, setImage ] = useState();
  const [ oldPassword, setOldPassword] = useState('');
  const [ password, setPassword] = useState('');
  const [ password2, setPassword2] = useState('');

  const passMatch = () => {
    return password === password2;
  }

  const uploadFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('image', image, image.name);

    const uploaded = await uploadAvatar(authData.user.profile.id, uploadData);
    if(uploaded){
      NotificationManager.success("Image uplaoded");
    } else {
      NotificationManager.error("Error. Image was no uploaded");
    }
  }
  const submitChangePass = async e => {
    e.preventDefault();
    if(passMatch()){
      const passData = await changePass(
        {old_password: oldPassword, new_password: password},
        authData.user.id,
        authData.token
        );
      if(passData){
        NotificationManager.success("Password have been changed");
      }
    } else {
      NotificationManager.error("Password don't match");
    }
  }

  return (
    <div>
       <Link to={'/'}>Back</Link>
      <h1>Change your picture</h1>
      <form onSubmit={uploadFile}>
        <label>
          <p>Upload your avatar</p>
          <TextField type="file" onChange={ e => setImage(e.target.files[0])}/>
        </label>
        <Button type="sumbit" variant="contained" color="primary">Upload file</Button>
      </form>
      <br/>
      <h1>Change your password</h1>
      <form onSubmit={submitChangePass}>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="Old Password" type="password" 
                onChange={ e => setOldPassword(e.target.value)}
              />
            </Grid>
          </Grid>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="New Password" type="password" 
                onChange={ e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="Repeat password" type="password" 
                onChange={ e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
        <Button type="sumbit" variant="contained" color="primary">Change password</Button>
      </form>
    </div>
  );
}

export default Account;