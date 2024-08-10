import { useGlobalData } from '@/hooks/GlobalData';
import { Box, Button, Grid, Stack, Text, Wrap } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from 'react-to-print';

export default function Ticket() {
    const queryID=useParams().id;
    const {fetchFlightQueryById}=useGlobalData();
    const data=fetchFlightQueryById(queryID);
    console.log(data);
    const targetRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>targetRef.current
    })
    
    
  return (
    <div className='bg-gray-500 h-[160vh] px-[30%]  w-full flex justify-center items-center flex-col'>
       {
        data &&  <Wrap ref={targetRef} sx={{
            height:'auto',
            width:'auto',
            backgroundColor:'white',
            backdropBlur:'10px',
           display:'flex',
           flexDirection:'column',
        //    margin:5,
           padding:5,
           gap:5,
           borderColor:'black',
           borderWidth:2,

        }}><Box minW={'100%'}>
            <Text fontSize={40}>E-Ticket</Text>
            <Text fontSize={20}>Trip Booking ID -: {data._id}</Text>
            <Text fontSize={20}>Booking Date -: {data.bookingDate}</Text>

        </Box>
        <Box mt={10}>
            <Text fontSize={30}>Itinerary and Reservation Details</Text>
        </Box>
        <Box minW={'100%'} minH={'300px'}display={'flex'} borderColor={'lightskyblue'} gap={10} borderRadius={1} borderWidth={2} flexDir={'column'} >
        <Grid templateColumns='repeat(4, 1fr)'   maxH={'50%'} minH={'50%'}  minW={'100%'}>
            <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>{data.airlineName}</Text>
                <Text fontSize={15} fontWeight={'bold'}>{data.flightNumber}</Text>
                </Box>
                <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>Departure</Text>
                <Text fontSize={15} fontWeight={'bold'}>{data.departureFrom} </Text>
                <Text fontSize={15} >{data.DepartureDate}  {data.departureTime} Hrs </Text>

                </Box>
                <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>Arrival</Text>
                <Text fontSize={15} fontWeight={'bold'}>{data.arrivalTo} </Text>
                <Text fontSize={15} >{data.DepartureDate}  {data.arrivalTime} Hrs </Text>

                </Box>
                <Box display={'flex'} flexDir={'column'}  justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>{data?.flightType ==='Direct' ? 'Direct' : '1-Stop Flight'}</Text>
                <Text fontSize={15}>1h 0m</Text>
                <Text fontSize={15}>{data?.refundable ? 'Fare Refundable' : 'Fare Non-Refundable'}</Text>
                </Box>
            
           </Grid>
           <Grid templateColumns='repeat(3, 1fr)'   maxH={'50%'}  minW={'100%'} >
            <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>Passenger Name</Text>
                <Text fontSize={15} fontWeight={'bold'}>{data.passengerName}</Text>
                </Box>
                <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>Departure</Text>
                <Text fontSize={15} fontWeight={'bold'}>Type </Text>
                <Text fontSize={15} >Adult </Text>

                </Box>
                <Box display={'flex'} flexDir={'column'}   justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={15}>Airline PNR</Text>
                <Text fontSize={15} fontWeight={'bold'}>{data.pnrNumber} </Text>
                {/* <Text fontSize={20} >{data.DepartureDate}  {data.arrivalTime} Hrs </Text> */}

                </Box>
               
           </Grid>
        </Box>
        <Box mt={10}>
            <Text fontSize={20} textColor={'lightskyblue'} fontWeight={'bold'}>Important Information</Text>
            <Text fontSize={15} px={10}>Delhi and Mumbai airports have multiple terminals catering to domestic flights. Please check the departure/arrival terminal of your flight with the airlines (contact number given below) before the start of your trip.</Text>
            <Text fontSize={15} px={10}  mt={5}>A printed copy of this e-ticket must be presented at the time of check in</Text>
            <Text fontSize={15} px={10}  >Check-in starts 2 hours before scheduled departure, and closes 45 minutes prior to the departure time. We recommend you report at the check-in counter at least 2 hours prior to departure time.
            It is mandatory to carry Government recognised photo identification (ID) along with your E-Ticket. This can include: Driving License, Passport, PAN Card, Voter ID Card or any other ID issued by the Government of India. For infant passengers, it is mandatory to carry the Date of Birth certificate.</Text>

        </Box>
        <Box mt={10}>
            <Text fontSize={20} textColor={'lightskyblue'} fontWeight={'bold'}>Cancellation & Date Change Rules</Text>
            <Text textColor={'black'} fontSize={15} px={10}>Q. How can I cancel my booking?</Text>
            <Text fontSize={15} px={10}  >A. You can cancel your booking by logging on the Customer Support section of our website. If you are cancelling or rescheduling your flight within 3 hours of its departure time, kindly contact the airline directly.
            * If you have cancelled your booking with the airline directly, kindly inform us by calling our Customer Support</Text>

        </Box>
           
                
        </Wrap>
       }
       <Stack direction={'row'} mt={10} pos={'fixed'} bottom={0} spacing={10}>
              <Button onClick={()=>{
                targetRef.current.style.borderWidth=0;
                handlePrint();
              }}>Print</Button>
            </Stack>
    </div>
  )
}
