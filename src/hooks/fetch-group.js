import {useState, useEffect} from 'react';
import { getGroup } from '../services/group-services';

export function useFetchGroup(groupId){

  const [ group, setGroup] = useState(null);
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState(false);

  useEffect(()=>{
    const getData = async () => {
      setLoading(true);
      const data = await getGroup(groupId);
      setGroup(data);
      setLoading(false);
      setError(null);
    }
    getData();
  },[groupId]);

  return [group, loading, error]
}