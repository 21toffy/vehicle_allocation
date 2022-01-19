
import {useState, useEffect} from 'react';
import axios from "axios";
import { baseURL } from "../utils/baseUrl";


export function useBusses(busType, refreshPage) {

    const [busses, setBusses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
         setLoading(true)
        const fetchData = () => {
    
            axios({
              method: "get",
              url: `${baseURL}/${busType}/`,
        //       headers: {
        //         "Content-Type": "application/json",
        //   'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        //       },
             
            })
              .then(function (result) {
    
                if ((result.status = 200)) {
                    setBusses(result.data)
                    console.log(result)
                    setLoading(false)
                    
                }
              })
              .catch((error) => {
                setLoading(false)
                setError(error.response.data.message)
                
              });
          };
    fetchData() 
          
        return () => {
            return [busses, loading, error, refreshPage];
        }
    }, [refreshPage])
    return {busses, loading, error}
}

