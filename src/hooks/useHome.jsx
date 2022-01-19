
import {useState, useEffect} from 'react';
import axios from "axios";
import { baseURL } from "../utils/baseUrl";


export function useHome() {

    const [home, setHome] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
         setLoading(true)
        const fetchData = () => {
    
            axios({
              method: "get",
              url: `${baseURL}/home/`,
        //       headers: {
        //         "Content-Type": "application/json",
        //   'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        //       },
             
            })
              .then(function (result) {
    
                if ((result.status = 200)) {
                    setHome(result.data.data)
                    console.log(result)
                    setLoading(false)
                    
                }
              })
              .catch((error) => {
                setLoading(false)
                // setError(error.response.data.message)
                
              });
          };
    fetchData() 
          
        return () => {
            return [home, loading, error, ];
        }
    }, [])
    return {home, loading, error}
}

