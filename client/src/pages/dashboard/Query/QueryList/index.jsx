import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useGlobalData } from '@/hooks/GlobalData';
import { Select, Stack } from '@chakra-ui/react';
import { Edit, Eye, Receipt, Ticket } from 'lucide-react';
import TableFlightQuery from '@/components/TableFlightQuery';
import Swal from 'sweetalert2';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
export default function QueryList() {
  const {queries}=useGlobalData();
  const [selectedRow,setSelectedRow]=useState(null);
  const [isOpen,setIsOpen]=useState(false);
const navigate=useNavigate();
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <TableFlightQuery isOpen={isOpen} data={selectedRow} onClose={()=>{
        setIsOpen(false)
      }} handleSave={()=>{}} />
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Query List
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["SL","ID", "Client Name", "Staff", "Service","Action"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        {queries.length>0 ?   <tbody>
            {queries
            .filter(a=>a.status===0)
            .map((row,index)=> {
                const className = `py-3 px-5 ${
                  index === queries.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                const type=row.serviceType;
            
           return(
                  <tr key={1} >
                    <td className={className}>
                      <div className="flex items-center gap-4">
                     
                      
                            {index+1}
                            </div>
                         
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                     
                      
                            {row._id}
                            </div>
                         
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.client}
                      </Typography>
                    
                    </td>
                    <td className={className}>
                   
                    </td>
                    <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.serviceType}
                      </Typography>
                    </td>
                  
                   
                    <td className={className}>
                      <Edit  onClick={()=>{
                        navigate(`/dashboard/query-edit/${row._id}`)
                      }} className='cursor-pointer hover:scale-105 transition-all' />
                                  </td>
                  </tr>
                );
              }
              

                
              
            )}
          </tbody> : <tbody>
            <tr>
              <td colSpan="8">
                <Typography color="blue-gray" className="text-center">
                  No data found
                </Typography>
              </td>
            </tr>
            </tbody>}
            
        </table>
      </CardBody>
    </Card>
  
  </div>
  )
}
