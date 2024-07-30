import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    Step,
    Select as NormalSelect,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
  } from '@chakra-ui/react';
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
  } from "@material-tailwind/react";
export default function FlightExtraForm() {
    return(
        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Passenger Number</FormLabel>
         <Input type="number" placeholder="Passenger Number" />
        </FormControl>
        <FormControl>
         <FormLabel>Domestic/International</FormLabel>
         <NormalSelect>
         <option value="Domestic">Domestic</option>
         <option value="International">International</option>
         </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>One Way/Roundway</FormLabel>
        <NormalSelect>
         <option value="One Way">One Way</option>
         <option value="Round Way">Round Way</option>
        </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>From (Location)</FormLabel>
         <Input type="text" placeholder="From (Location)" />
        </FormControl>
        <FormControl>
         <FormLabel>To (Location)</FormLabel>
         <Input type="text" placeholder="To (Location)" />
   
        </FormControl>
        <FormControl>
         <FormLabel>Departure Date</FormLabel>
        <Input type="date" placeholder="Departure Date" />
        </FormControl>
         </Grid>
    )
}