import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
    Button,
    Input,
    Stepper,
    Step,
  
  } from "@material-tailwind/react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
  import { useSelector } from "react-redux";

  import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Select as NormalSelect,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps,
  } from '@chakra-ui/react'
  import { useEffect, useState } from "react";
  import Select from "react-tailwindcss-select";
  import { Form, useNavigate, useParams } from "react-router-dom";
  import FlightExtraForm from "@/components/FlightExtraForm";
  import Swal from "sweetalert2";
  import toast from "react-hot-toast";
  import { airlines } from "@/data/airlines";
  import { airports } from "@/data/airports";
  import TableFlightQuery from "@/components/TableFlightQuery";
  import makeRequest from "@/data/api";
  import { useGlobalData } from "@/hooks/GlobalData";
  import { ConfirmFlightQuery, ConfirmHotelQuery, FindQuerybYid, getAllQueries, HotelDup, SaveFlight } from "@/data/apis";
import { hotelForm } from "../GenarateQuery";
import HotelDuplicate from "@/components/HotelDuplicate";
import axios from "axios";
import HotelTable from "@/components/HotelTable";

  const steps = [
    { title: 'Step 1', description: 'Contact Info' },
    { title: 'Step 2', description: 'Date & Time' },
    { title: 'Step 3', description: 'Select Rooms' },
    { title: 'Step 4', description: 'Select Rooms' },
  
  ]
  export const hotel2NDStepForm=[
    {
      label:"Hotel Name",
      id:'hotelName',
      type:'text',
    },
    {
      label:'Address',
      id:'address',
      type:'text',


    },
    
    {
      label:'Contact',
      id:'contact',
      type:'text',
    },
    {
      label:'Email',
      id:'email',
      type:'email',
    },
    
    {
      label:'Our Cost',
      id:'ourCost',
      type:'number',

    },
    {
      label:'PRF',
      id:'prf',
      type:'number',

    },
    {
      label:'Total Cost',
      id:'totalCost',
      type:'number',

    },

  ]

  const thirdHotelForm=[
    {
      label:'Guest Name',
      id:'guestName',
      type:'text',

    },
    {
      label:'Booking No' ,
      id:'bookconfirmNo',
      type:'text',
    }
  ]


  const clients = [
  
    { value: "Arman Mondal", label: "Arman Mondal" },
    { value: "Test", label: "Test" },
  ];
  const services=[
  
    { value: "Flight", label: "Flight" },
    { value: "Cab", label: "Cab" },
    { value: "Hotel", label: "Hotel" },
  
  ]
  export default function GenarateQueryConfirm() {


    const [data,setdata]=useState({
      client:'Select',
      service:'Select',
      passengerNumber:0,
      domesticOrInternational:'',
      oneWayOrRoundway:'',
      from:'',
      to:'',
      departureDate:'',
      cabType:'',
      timeSlot:'',
      city:'',
      tripStartDateTime:'',
      tripEndDateTime:'',
      cab:'',
      totalPassenger:0,
      returnDate:'',
      flightType:'',
      airlineNames:'Select',
      FlightNumber:'',
      fareType:'',
      departureFrom:'Select Airport',
      departureTime:'',
      arrivalTo:'Select Airport',
      arrivalTime:'',
      OurCost:0,
      Prf:0,
      refundable:false,
  
  
      
  
  
    })
    const [currentStep, setCurrentStep] = useState(data.service==='Flight'? 2:2)
    const { activeStep } = useSteps({
      index: currentStep,
      count: steps.length,
    })
   const QueryID=useParams().id ;
   const state = useSelector((state) => state);

    const [handleTable,settable]=useState(false)
    const [totalFlightTicket,setTotalFlightTicket]=useState(1)
 const [hotelData,sethotelData]=useState({
  hotelName:'',
  address:'',
  ourCost:0,
  prf:0,
  totalCost:0,
  contact:'',
  email:'',
  guestName:'',
  bookconfirmNo:'',
  invoiceNumber:'',
  vendorName:'',
  confirmedQuery:state.query.query


})
console.log(state)
    const [thirdStepData,setThirdStepData]=useState({
      passengerName:'',
      gender:'',
      pnrNumber:'',
      seatNumber:'',
      class:'',
      meal:false,
      invoiceNumber:'',
      vendorName:'',
      confirmedQuery:state.query.query

    })

    const {token,vendors}=useGlobalData()
useEffect(()=>{
  makeRequest({
    method:'GET',
    url:FindQuerybYid+QueryID,
    headers:{
      Authorization:token
    }
  })
  .then((response)=>{
  
      console.log('DATA',response.result)
      setdata({...data,client:response.result.client,service:response.result.serviceType})
      hotelForm.map((form)=>{
        const element = document.getElementById(form.id);
        if (element && response.result[form.id]) {
          element.value = response.result[form.id];
        }
      })

  
  })
  .catch((error)=>{
    console.log(error)
    toast.error('Failed to fetch data')
  })
},[hotel2NDStepForm])
const navigate=useNavigate()
    const handleFlightSubmit=async()=>{
      const body={
     
  
      }
      console.log(body)
     await makeRequest({
      method:'PUT',
      url:`${ConfirmFlightQuery}${QueryID}`,
      data:thirdStepData
 ,
headers:{
  Authorization:token
} 
     })
      .then((response)=>{
        if(response){
          toast.success('Query Genarated Successfully')
          console.log('RESPONSE',response)
        }
        else{
          toast.error('Failed to genarate query')
        }
      })
      .catch((error)=>{
        toast.error('Failed to genarate query')
      }
      )
  
    }
  
  
  const firstStepHandle=()=>{
    if(data.client==='Select'){
      toast.error('Please select client')
      return
    }
    else if(data.service==='Select'){
      toast.error('Please select service')
      return
    }
    else{
     Swal.fire({
      title: 'Are you sure?',
      text: "You want to genarate query for this service",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, genarate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentStep(currentStep+1)
      }
      else{
        toast.error('Query not genarated')
      }
    })
  
  
    }
  }
  
  const [totalHotelQuota,settotalHotelQuota]=useState(0)
  const [formsData, setFormsData] = useState(Array.from({ length: totalHotelQuota }, () => ({})));
const [hotelTable,sethotelTable]=useState(false)
  const handleFormChange = (index, data) => {
    setFormsData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };
  const [selectedHotelDuplicate,setSelectedHotelDuplicate]=useState([])
  
  
  
  
  
  
  
  
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <TableFlightQuery isOpen={handleTable} handleSave={handleFlightSubmit} onClose={()=>{settable(false)}}   data={data}/>
          <HotelTable duplicate={selectedHotelDuplicate} isOpen={hotelTable} data={
            {
              hotelName:hotelData.hotelName,
              address:hotelData.address,
              contact:hotelData.contact,
              email:hotelData.email,
              OurCost:hotelData.ourCost,
              Prf:hotelData.prf,
              totalCost:Number(hotelData.ourCost)+Number(hotelData.prf),

            }
          }
           onClose={()=>{sethotelTable(false)}} />

        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
           Genarate Query
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
      <Box  px={'20%'}>
      <Stepper
      onClick={()=>{}}
          activeStep={currentStep}
         
        >
     {steps.map((step, index) => (
         <Step style={{cursor:'pointer'}} onClick={()=>{
          if(currentStep>=index){
            setCurrentStep(index)
          }
          else{
            alert('Please fill the previous step')
          }
         }} >{index+1}</Step>
        ))}
        </Stepper>
      </Box>
     {
      currentStep===0?
      (
        <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
        <FormControl>
         <FormLabel>Select Client</FormLabel>
         <Select
                     value={{value:data.client,label:data.client}}
                     onChange={(e)=>setdata({...data,client:e.value})}
     
                     isSearchable={true}
                     options={clients}
                 />
        </FormControl>
        <FormControl>
         <FormLabel>Service Type</FormLabel>
         <Select
     
     value={{value:data.service,label:data.service}}
     onChange={(e)=>setdata({...data,service:e.value})}
     
                     isSearchable={true}
                     options={services}
                 />
        </FormControl>
     {data.service==='Flight'? (
      <>
             <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Passenger Number</FormLabel>
           <Input type="number" placeholder="Passenger Number" value={data.passengerNumber} onChange={(e)=>{
              setdata({...data,passengerNumber:e.target.value})
           }} />
          </FormControl>
          <FormControl>
           <FormLabel>Domestic/International</FormLabel>
           <NormalSelect value={data.domesticOrInternational} onChange={(e)=>{
              setdata({...data,domesticOrInternational:e.target.value})
           }}>
           <option value="Domestic">Domestic</option>
           <option value="International">International</option>
           </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>One Way/Roundway</FormLabel>
          <NormalSelect value={data.oneWayOrRoundway} onChange={(e)=>{
              setdata({...data,oneWayOrRoundway:e.target.value})
           }}>
           <option value="One Way">One Way</option>
           <option value="Round Way">Round Way</option>
          </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>From (Location)</FormLabel>
           <Input type="text" placeholder="From (Location)"  value={data.from} onChange={(e)=>{
              setdata({...data,from:e.target.value})
           }}/>
          </FormControl>
          <FormControl>
           <FormLabel>To (Location)</FormLabel>
           <Input type="text" placeholder="To (Location)" value={data.to} onChange={(e)=>{
              setdata({...data,to:e.target.value})
           }} />
     
          </FormControl>
          <FormControl>
           <FormLabel>Departure Date</FormLabel>
          <Input value={data.departureDate} onChange={(e)=>{
              setdata({...data,departureDate:e.target.value})
           }} type="date" placeholder="Departure Date" />
          </FormControl>
           </Grid>
           {
              data.oneWayOrRoundway==='Round Way' &&
              (
                <>
                  <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
            <FormLabel>Return Date</FormLabel>
            <Input value={data.returnDate} onChange={(e)=>{
              setdata({...data,returnDate:e.target.value})
            }} type="date" placeholder="Return Date" />
              </FormControl>
              </Grid>
                </>
              )
           }
      </>
     )
     :
      data.service==='Cab'?
      (
        <>
         <Grid templateColumns='repeat(1, 1fr)' gap={5}  >
          <FormControl>
            <FormLabel>Cab Type</FormLabel>
            <NormalSelect value={data.cabType} onChange={(e)=>{setdata({...data,cabType:e.target.value})}}>
              <option selected disabled value={''}>Select</option>
              <option value={'Local Use'} >Local Use</option>
              <option value={'Outstation'} >Outstation</option>
              <option value={'Package'}>Package</option>
            </NormalSelect>
            </FormControl>
          </Grid>
          {
            data.cabType==='Local Use'?
            (
              <>
               <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Time Slot</FormLabel>
           <NormalSelect value={data.timeSlot} onChange={(e)=>{
              setdata({...data,timeSlot:e.target.value})
           }}>
           <option value="8h 80km">8h 80km</option>
           <option value="12h 120km">12h 120km</option>
           </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>City</FormLabel>
           <Input type="text" placeholder="City" value={data.city} onChange={(e)=>{
              setdata({...data,city:e.target.value})
            }
            } />
  
          </FormControl>
          <FormControl>
           <FormLabel>Trip Start Date Time</FormLabel>
          <Input value={data.tripStartDateTime} onChange={(e)=>{
              setdata({...data,tripStartDateTime:e.target.value})
           }
            } type='datetime-local' placeholder="Trip Start Date" />
  
          </FormControl>
          <FormControl>
           <FormLabel>Trip End Date Time</FormLabel>
           <Input value={data.tripStartDateTime} onChange={(e)=>{
              setdata({...data,tripStartDateTime:e.target.value})
           }
            } type='datetime-local' placeholder="Trip Start Date" />
          </FormControl>
         
          <FormControl>
           <FormLabel>Cab Type</FormLabel>
          <NormalSelect value={data.cab} onChange={(e)=>{
              setdata({...data,cab:e.target.value})
           }
            }>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>Total Passengers</FormLabel>
           <Input type="number" placeholder="Total Passengers" value={data.totalPassenger} onChange={(e)=>{
              setdata({...data,totalPassenger:e.target.value})
           }} />
     
          </FormControl>
           </Grid>
              </>
            )
            :
            data.cabType==='Outstation'?
            (
              <>
              </>
            )
            :
          (
            <>
            </>
          )
  
  
          }
  
        </>
      )
      :(
        <>
        </>
      
     )}
  
        <FormControl>
         <Button onClick={firstStepHandle}>Next</Button>
         </FormControl>
         </Box>
      ):
      currentStep===1?
      (
        <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
       {
        data.service==='Flight'?
        (
          <>
          {Array.from({length:totalFlightTicket}).map((_,index)=>(
            <>
  
  <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Flight Type</FormLabel>
           <NormalSelect value={data.flightType} onChange={(e)=>{
              setdata({...data,flightType:e.target.value})
           }}>
            <option selected disabled value={''}>Select</option>
           <option value="Direct">Direct</option>
           <option value="Via">Via</option>
           </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>Airline Names</FormLabel>
          <Select 
          options={airlines.map((airline)=>({value:airline.name,label:airline.name}))}
          value={{value:data.airlineNames,label:data.airlineNames}}
          onChange={(e)=>{
            setdata({...data,airlineNames:e.value})
          }}
          isSearchable={true}
          />
          </FormControl>
          <FormControl>
           <FormLabel>Flight Number</FormLabel>
           <Input type="text" placeholder="Flight Number" value={data.FlightNumber} onChange={(e)=>{
              setdata({...data,FlightNumber:e.target.value})
           }} />
          </FormControl>
          <FormControl>
           <FormLabel>Fare Type</FormLabel>
           <NormalSelect value={data.fareType} onChange={(e)=>{
              setdata({...data,fareType:e.target.value})
           }}>
                      <option selected disabled value={''}>Select</option>
  
           <option value="Normal">Normal</option>
         <option value={'SME Fare'} >SME Fare</option>
          <option value={'Corporate Fare'} >Corporate Fare</option>
          <option value={'Special Fare'} >Special Fare</option>
          <option value={'Other'} >Other</option>
  
           </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>Departure From</FormLabel>
           <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.departureFrom,label:data.departureFrom}} onChange={(e)=>{
            setdata({...data,departureFrom:e.value})
          }
          } isSearchable={true} />
          </FormControl>
          <FormControl>
           <FormLabel>Departure Time</FormLabel>
           <Input type="time" placeholder="Departure Time" value={data.departureTime} onChange={(e)=>{
              setdata({...data,departureTime:e.target.value})
           }} />
          </FormControl>
          <FormControl>
           <FormLabel>Arrival To</FormLabel>
          <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.arrivalTo,label:data.arrivalTo}} onChange={(e)=>{
            setdata({...data,arrivalTo:e.value})
          }
          } isSearchable={true} />
  
          </FormControl>
          <FormControl>
           <FormLabel>Arrival Time</FormLabel>
           <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} onChange={(e)=>{
              setdata({...data,arrivalTime:e.target.value})
           }} />
          </FormControl>
          </Grid>
          <Divider/>
  
          <Grid>
          {
            data.flightType==='Via'&&
  
            (
              <>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
            <FormControl >
               <FormLabel>Flight Number</FormLabel>
               <Input type="text" placeholder="Flight Number" value={data.FlightNumber} onChange={(e)=>{
                  setdata({...data,FlightNumber:e.target.value})
               }} />
              </FormControl>
              <FormControl>
               <FormLabel>Departure From</FormLabel>
               <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.departureFrom,label:data.departureFrom}} onChange={(e)=>{
                setdata({...data,departureFrom:e.value})
              }
              } isSearchable={true} />
              </FormControl>
              <FormControl>
               <FormLabel>Departure Time</FormLabel>
               <Input type="time" placeholder="Departure Time" value={data.departureTime} onChange={(e)=>{
                  setdata({...data,departureTime:e.target.value})
               }} />
              </FormControl>
              <FormControl>
               <FormLabel>Arrival To</FormLabel>
              <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.arrivalTo,label:data.arrivalTo}} onChange={(e)=>{
                setdata({...data,arrivalTo:e.value})
              }
              } isSearchable={true} />
      
              </FormControl>
              <FormControl>
               <FormLabel>Arrival Time</FormLabel>
               <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} onChange={(e)=>{
                  setdata({...data,arrivalTime:e.target.value})
               }} />
              </FormControl>
              </Grid>
          </>
            )
              
          }
         <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
         <FormControl>
           <FormLabel>Our Cost</FormLabel>
           <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e)=>{
              setdata({...data,OurCost:e.target.value})
           }} />
          </FormControl>
          <FormControl>
           <FormLabel>PRF</FormLabel>
           <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e)=>{
              setdata({...data,Prf:e.target.value})
           }} />
          </FormControl>
          <FormControl>
           <FormLabel>Total Cost</FormLabel>
           <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost)+Number(data.Prf)} />
          </FormControl>
          </Grid>
          </Grid>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Refundable</FormLabel>
          <Checkbox isChecked={data.refundable} onChange={(e)=>{
              setdata({...data,refundable:e.target.checked})
           }
            } />
            
          </FormControl>
          </Grid>
   
  
            </>
  
          ))}
         
       
         <FormControl>
          <Button style={{backgroundColor:'blue'}} onClick={()=>{setTotalFlightTicket(totalFlightTicket+1)}}>Duplicate</Button>
  
          </FormControl>
  
          </>
        )
        :
        data.service==='Cab'?
        (
          <>
          </>
        )
        :data.service==='Hotel'?
        (
          <>
             <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
          <form >
          <Grid templateColumns='repeat(4, 1fr)' gap={5}  >
          
            {
              hotel2NDStepForm.map((form,index)=>(
                <>
                <FormControl>
                <FormLabel>{form.label}</FormLabel>
              {
                form.type==='select'?
                (
                  <NormalSelect >
                    <option value={hotelData[form.id]} onChange={(e)=>{
                      sethotelData({...hotelData,[form.id]:e.target.value})
                    }} disabled selected>Select</option>
                    {
                      form.options.map((option)=>(
                        <option value={option.value}>{option.label}</option>
                      ))
                    }
                  </NormalSelect>
                )
                :(
                  <Input type={form.type} value={form.id==='totalCost'? Number(hotelData.ourCost)+Number(hotelData.prf) : hotelData[form.id]} onChange={(e)=>{
                
                    sethotelData({...hotelData,[form.id]:e.target.value})
                    
  
                  }} id={form.id} placeholder={form.placeholder} />
                )
              }
              </FormControl>
                </>
            ))}
          
            </Grid>
{Array.from({length:totalHotelQuota}).map((_,index)=>(
  <>
  <HotelDuplicate remove={()=>{settotalHotelQuota(totalHotelQuota-1)}} onChange={handleFormChange} index={index} />
  </>
))}

            <FormControl
            py={10}
            >
              <Button onClick={async()=>{
                settotalHotelQuota(totalHotelQuota+1)
         
            

              }}>Duplicate</Button>
            </FormControl>
            <FormControl
            py={10}
            >
              <Button onClick={async()=>{
         const body={
          hotelName:hotelData.hotelName,
          address:hotelData.address,
          contact:hotelData.contact,
          email:hotelData.email,
          ourCost:hotelData.ourCost,
          prf:hotelData.prf,
          duplicate:formsData
          
          }
     const res=  await axios.put(HotelDup+'?id='+QueryID,
       body,
       {
        headers:{
          Authorization:token
        }
       }
       );
       if(res.status===200){
        toast('Query Genarated Successfully')
        setSelectedHotelDuplicate(body.duplicate)
        sethotelTable(true)
       }
       else{
          toast.error('Failed to genarate query')
       }
            

              }}>Next</Button>
            </FormControl>
          </form>
        </Box>
          </>
        )
        :(
          <>
          </>
        )
       }
  
  
   {data.service==='Flight'? (     <FormControl>
         <Button onClick={()=>{settable(true)}}>Next</Button>
         </FormControl>):(
          <></>)}
         </Box>
     
      )
      :currentStep===2?
      data.service==='Flight'?
      (
        <>
        <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Passenger Name</FormLabel>
           <Input value={thirdStepData.passengerName} onChange={(e)=>{
            setThirdStepData({...thirdStepData,passengerName:e.target.value})
           }} type="text" placeholder="Passenger Name" />
          </FormControl>
          <FormControl>
           <FormLabel>Gender</FormLabel>
            <NormalSelect  value={thirdStepData.gender} onChange={(e)=>{
            setThirdStepData({...thirdStepData,gender:e.target.value})
           }}>
              <option value={''} disabled selected>Select</option>
              <option value="Male" >Male</option>
              <option value="Female">Female</option>
            </NormalSelect>
          </FormControl>
          <FormControl>
           <FormLabel>PNR Number</FormLabel>
           <Input  value={thirdStepData.pnrNumber} onChange={(e)=>{
            setThirdStepData({...thirdStepData,pnrNumber:e.target.value})
           }} type="text" placeholder="PNR Number" />
          </FormControl>
          <FormControl>
           <FormLabel>Seat Number</FormLabel>
           <Input  value={thirdStepData.seatNumber} onChange={(e)=>{
            setThirdStepData({...thirdStepData,seatNumber:e.target.value})
           }} type="text" placeholder="Seat Number" />
          </FormControl>
          <FormControl>
           <FormLabel>Class</FormLabel>
           <NormalSelect  value={thirdStepData.class} onChange={(e)=>{
            setThirdStepData({...thirdStepData,class:e.target.value})
           }}>
              <option value={''} disabled selected>Select</option>
              <option value="Economy" >Economy</option>
              <option value="Business">Business</option>
            </NormalSelect>
          </FormControl>
          </Grid>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl>
           <FormLabel>Meal Include</FormLabel>
           <Checkbox isChecked={thirdStepData.meal} onChange={(e)=>{
            setThirdStepData({...thirdStepData,meal:e.target.checked})
           }} />
          </FormControl>
          
          </Grid>
<FormControl>
<Button onClick={()=>{
  setCurrentStep(3)
}} >Next</Button>
</FormControl>
        </Box>
       
        </>
      ):
      data.service==='Hotel' ? 
      (
        <>
        <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
          <form>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
            {thirdHotelForm.map((form,index)=>(
              <FormControl>
              <FormLabel>{form.label}</FormLabel>
              <Input type={form.type} value={hotelData[form.id]} onChange={(e)=>{
                    sethotelData({...hotelData,[form.id]:e.target.value})
              }} placeholder={form.placeholder} />



              </FormControl>
            
            ))}
            </Grid>
            < FormControl py={5}>
            <Button onClick={async()=>{
              setCurrentStep(3)
            }}>Next</Button>
            </FormControl>
          </form>
          </Box>
     
        </>
      )
      :(
        <>
        
        </>
      )

      
      
      :
      
        data.service==='Flight'?
        <>
       <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Invoice Number</FormLabel>
         <Input value={thirdStepData.invoiceNumber} onChange={(e)=>{
          setThirdStepData({...thirdStepData,invoiceNumber:e.target.value})
         }} type="text" placeholder="Passenger Name" />
        </FormControl>
        <FormControl>
         <FormLabel>Vendor Name</FormLabel>
         <NormalSelect value={thirdStepData.vendorName} onChange={(e)=>{
          setThirdStepData({...thirdStepData,vendorName:e.target.value})

         }}>
         {vendors.map((vendor)=>(
          <option value={vendor.name}>{vendor.name}</option>
         ))}


         </NormalSelect>
        </FormControl>
        </Grid>
        <FormControl>
        <Button onClick={handleFlightSubmit}>Submit</Button>
        </FormControl>
        
        </Box>
        </>
      
      
      : 
      data.service==='Hotel'?
      (
        <>
          <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Invoice Number</FormLabel>
         <Input value={hotelData.invoiceNumber} onChange={(e)=>{
sethotelData({...hotelData,invoiceNumber:e.target.value})         }} type="text" placeholder="Passenger Name" />
        </FormControl>
        <FormControl>
         <FormLabel>Vendor Name</FormLabel>
         <NormalSelect value={hotelData.vendorName} onChange={(e)=>{
          sethotelData({...hotelData,vendorName:e.target.value})
          
         }}>
         {vendors.map((vendor)=>(
          <option value={vendor.name}>{vendor.name}</option>
         ))}


         </NormalSelect>
        </FormControl>
        </Grid>
        <FormControl>
        <Button onClick={async()=>{
     
                await makeRequest({
                  method:'PUT',
                  url:`${ConfirmHotelQuery}${QueryID}`,
                  data:hotelData
            ,
          headers:{
            Authorization:token
          }
                })
                .then((response)=>{
                  toast.success('Query Genarated Successfully')
                  window.location.href='/'
                })
                .catch((error)=>{
                  toast.error('Failed to genarate query')
                }
                )
        }}>Submit</Button>
        </FormControl>
        
        </Box>
        </>
      )
      :
      (
        <>
        </>
      )
      
     }
  
           
          </CardBody>
        </Card>
     
      </div>
    );
  }
  
  