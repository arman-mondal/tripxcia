import { useGlobalData } from '@/hooks/GlobalData'
import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";
import makeRequest from '@/data/api';
import { DeleteClient } from '@/data/apis';
import { Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import { FormControl, FormLabel, Grid } from '@chakra-ui/react';
export default function ClientList() {
  const {clients,token}=useGlobalData();
  const [editOn,setEditOn]=React.useState(false);
  const [selectedClient,setSelectedClient]=React.useState(null);
  const form=[
    {
      label:"Name",
      id:"name",
      type:"text",
      required:true
    },
    {
      label:'Address',
      id:'address',
      type:'text',
      required:true

    },
    {
      label:"Email",
      id:"email",
      type:'email',
      required:true
    },
    {
      label:"Phone",
      id:"phone",
      type:'text',
      required:true
    },
    {
      label:'Website',
      id:'website',
      type:'url'
    },
    {
      label:'Contact Person Email',
      id:'contactPersonEmail',
      type:'email',
      required:true

    },
    {
      label:'Contact Person Phone',
      id:'contactPersonPhone',
      type:'text',
      required:true
    },
    {
      label:'Birthday',
      id:'birthday',
      type:'date'
    },
    {
      label:'PAN Number',
      id:'panNumber',
      type:'text',
      required:true
    },
    {
      label:'TAN Number',
      id:'tanNumber',
      type:'text'

    },
    {
      label:'CIN Number',
      id:'cinNumber',
      type:'text'

    },
    {
      label:'GSTIN Number',
      id:'gstinNumber',
      type:'text'

    },
    {
      label:'Password',
      id:'password',
      type:'password'

    }


  ]
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
     {selectedClient!==null && (
        <Dialog open={editOn} handler={() => setEditOn(!open)}>
        <DialogHeader>Edit {selectedClient?.name}</DialogHeader>
        <DialogBody>
           <form id='submitUpdateClient' onSubmit={(e)=>{
            e.preventDefault();
            
           }}>
           <Grid templateColumns="repeat(2, 1fr)" gap={6}>

           {form.map((field) => (
              <FormControl key={field.id} id={field.id}>
                <FormLabel>{field.label}</FormLabel>
                <Input defaultValue={selectedClient?.[field.id]} type={field.type} required={field.required} />
              </FormControl>
            ))}
            
                      </Grid>

           </form>

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setEditOn(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() =>{
              
              const formElement=document.getElementById('submitUpdateClient') ;
              formElement.submit();

            }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
     )}
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Client List
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll p-4 ">
        <table className="min-w-full divide-y divide-gray-200">
          {["Name", "Email", "Phone", "Address", "GSTIN", "PAN", "TAN", "CIN", "Actions"].map((heading) => (
            <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading}
            </th>
          ))}
          {
            clients.map((client) => (
              <tr key={client._id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.gstinNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.panNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.tanNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.cinNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{
                      setSelectedClient(client)
                      setEditOn(!editOn)

                    }} className="text-indigo-600 hover:text-indigo-900">
                      <Edit/>
                    </button>
                    <button onClick={async()=>{
                     Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then(async(result) => {
                      if (result.isConfirmed) {
                        await makeRequest({
                          method:'DELETE',
                          url:DeleteClient+client._id,
                          headers:{
                            'Content-Type':'application/json',
                            'Authorization':token
                          }
                        }).then((response)=>{
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )                        
                        }
                        )
                        .catch((error)=>{
                          Swal.fire(
                            'Error!',
                            'Error deleting client',
                            'error'
                          )
                      })
                       
                      }
                    }
                    )
                    }} className="text-red-600 hover:text-red-900 ">
                      <Trash/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
          </table>
        </CardBody>
        </Card>
        </div>
  )
}
