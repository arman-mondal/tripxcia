import makeRequest from '@/data/api';
import { GetFlightQueries } from '@/data/apis';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Create a new context for the global data
const GlobalDataContext = createContext();

// Custom hook to access the global data
export const useGlobalData = () => useContext(GlobalDataContext);

// Global data provider component
export const GlobalDataProvider = ({ children }) => {
    // Define your global data state here
    const [FlightQuery, setFlightQuery] = useState([]);
    useEffect(()=>{
        fetchFlightQuery();

    },[])

    const fetchFlightQuery=async()=>{
        try {
            await makeRequest({
                url:GetFlightQueries,
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }

            })
            .then((response)=>{
                console.log(response)
                setFlightQuery(response.result)
            }
            )
            .catch((error)=>{
                toast.error('Error fetching flight query')
            })

            
        } catch (error) {
            toast.error('Error fetching flight query')
        }

    };

    // Define any functions or methods to update the global data here


    // Provide the global data and update function to the children components
    return (
        <GlobalDataContext.Provider value={{ FlightQuery }}>
            {children}
        </GlobalDataContext.Provider>
    );
};