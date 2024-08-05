import makeRequest from '@/data/api';
import { GetClients, GetFlightQueries, GetVendors } from '@/data/apis';
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
    const [clients, setclients] = useState([]);
    const [vendors, setvendors] = useState([]);
    useEffect(()=>{
        fetchFlightQuery();
        fetchClients();
        fetchVendors();

    },[])
    const fetchFlightQueryById=(id)=>{
        try {
          const Query=FlightQuery.find((query)=>query._id===id);
            return Query;


            
        } catch (error) {
            toast.error('Error fetching flight query')
        }
    }


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
    const fetchClients=async()=>{
        try {
            await makeRequest({
                url:GetClients,
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }

            })
            .then((response)=>{
                console.log(response)
                setclients(response.result)
            }
            )
            .catch((error)=>{
                toast.error('Error fetching flight query')
            })

            
        } catch (error) {
            toast.error('Error fetching flight query')
        }

    };
    const fetchVendors=async()=>{
        try {
            await makeRequest({
                url:GetVendors,
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }

            })
            .then((response)=>{
                console.log(response)
                setvendors(response)
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
        <GlobalDataContext.Provider value={{ FlightQuery,fetchFlightQueryById ,clients,vendors}}>
            {children}
        </GlobalDataContext.Provider>
    );
};