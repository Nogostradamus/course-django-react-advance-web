import { status } from '../utils';

export function auth(credentials){
  return fetch('http://127.0.0.1:8000/api/authenticate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(status).catch( e => {console.log(e)})
}

export function register(userData){
  return fetch('http://127.0.0.1:8000/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(status).catch( e => {console.log(e)})
}

export function changePass(userData, userId, token){
  return fetch(`http://127.0.0.1:8000/api/users/${userId}/change_pass/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(userData)
  }).then(status).catch( e => {console.log(e)})
}

export function uploadAvatar(profileId, data){
  return fetch(`http://127.0.0.1:8000/api/profile/${profileId}/`, {
    method: 'PUT',
    body: data
  }).then(status).catch( e => {console.log(e)})
}