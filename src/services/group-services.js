import { status } from '../utils';

export function getGroups(){
  return fetch(`http://127.0.0.1:8000/api/groups/`)
  .then(status).catch( e => {console.log(e)})
}

export function getGroup(id){
  return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
  .then(status).catch( e => {console.log(e)})
}

export function joinGroup(data){
  return fetch(`http://127.0.0.1:8000/api/members/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch( e => {console.log(e)})
}

export function leaveGroup(data){
  return fetch(`http://127.0.0.1:8000/api/members/leave/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(status).catch( e => {console.log(e)})
}


export function postComment(token, description, group, user){
  return fetch(`http://127.0.0.1:8000/api/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({description, group, user})
  })
  .then(status).catch( e => {console.log(e)})
}