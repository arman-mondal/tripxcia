import {
    Table,
    Button,
    Tr,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Tbody
  
  }
  from '@chakra-ui/react'
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
  export default function HotelTable({ isOpen, onClose,data,handleSave ,duplicate,isT}) {
    const [isTable,setIsTable]=useState(isT? isT:false)

    const navigate=useNavigate();
      const copyToClipBoard = () => {
          const copyData=`<div style=\"font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; background-color: #FFA500; padding: 15px; border-radius: 8px;\"><p><strong>Airline Name:</strong> ${data?.airlineNames}</p><p><strong>Fare Type:</strong> ${data?.fareType}</p><p><strong>Departure Time:</strong> ${data?.departureFrom}</p><p><strong>Arrival Time:</strong> ${data?.arrivalTo}</p><p><strong>Total Cost:</strong> ₹ ${(Number(data?.OurCost)+Number(data?.Prf)).toFixed(2)}</p><p><strong>Fare Refundable/Non-refundable:</strong> ${data?.refundable ? 'Refundable' : 'Non-Refundable'}</p></div>`;
                   
          window.navigator.clipboard.writeText(copyData)
          onClose()
      }
  console.log(duplicate)
  const dispatch=useDispatch();

      return (
        <>
    
          <Modal isOpen={isOpen} onClose={()=>{
navigate('/dashboard/quota-hotel')
          }} size={'5xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Form Submitted Successfully</ModalHeader>
              
              <ModalCloseButton />
              <ModalBody >
                  <Table variant='simple' >
                     <Tbody>
                     <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Hotel Name</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Address</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Contact</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Email</Td>
               
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                          {isTable && <Td>Status</Td>}

                      </Tr>
                      <Tr>
                          <Td>{data?.hotelName}</Td>
                          <Td>{data?.address}</Td>
                          <Td>{data?.contact}</Td>
                          <Td>{data?.email}</Td>
                          
                          <Td>₹ {(Number(data?.OurCost)+Number(data?.Prf)).toFixed(2)}</Td>
                          {isTable && <Td><Button colorScheme='blue' 
                          onClick={()=>{
                            dispatch({type:'QUERY',payload:{
                              type:'Hotel',
                              query:data.hotelName,
                            }})
                            navigate('/dashboard/query-confirm/'+data?._id)

                          }}
                          >Confirm</Button></Td>}
                      </Tr>
                      {duplicate && <>
                        {duplicate.length>0 && duplicate.map((item,index)=>(
                      <Tr key={index} gap={0}>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.hotelName}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.address}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.contact}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.email}</Td>
                    
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(data.OurCost)+Number(data.Prf)).toFixed(2)}</Td>
                          {isTable && <Td><Button onClick={()=>{
                            dispatch({type:'QUERY',payload:{
                              type:'Hotel',
                              query:item.hotelName,
                            }})
                            navigate('/dashboard/query-confirm/'+data?._id)

                          }} colorScheme='blue' >Confirm</Button></Td>}
                      </Tr>
                    ))}
                      </>}
                     </Tbody>
                      </Table>
  
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={copyToClipBoard}>
                  Copy to Clipboard
                </Button>
             
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }