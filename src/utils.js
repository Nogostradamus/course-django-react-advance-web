export function status(res) {
  // res.ok
  if( res.status >= 200 && res.status < 300){
    return res.json();
  }
  throw new Error(res.statusText);
}